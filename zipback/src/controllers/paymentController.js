import authorizenet from 'authorizenet';
// Note: the authorizenet SDK exports `Constants`, not `SDKConstants`.
const { APIContracts, APIControllers, Constants } = authorizenet;
import crypto from 'crypto';
import { User } from '../models/User.js';
import { Transaction } from '../models/Transaction.js';
import { sendMail } from '../config/mailer.js';

const isSandbox = (process.env.AUTHORIZE_ENVIRONMENT || 'sandbox') === 'sandbox';

const merchantAuthenticationType = () => {
  const auth = new APIContracts.MerchantAuthenticationType();
  auth.setName(process.env.AUTHORIZE_API_LOGIN_ID || '');
  auth.setTransactionKey(process.env.AUTHORIZE_TRANSACTION_KEY || '');
  return auth;
};

export const createPayment = async (req, res) => {
  const { email, amount } = req.body;
  if (!email) return res.status(400).json({ message: 'email required' });
  try {
    // Upsert user
    await User.findOneAndUpdate({ email }, { email }, { upsert: true, new: true, setDefaultsOnInsert: true });

    const fallback = parseFloat(process.env.DEFAULT_AMOUNT || '50000');
    const resolvedAmount = Number.isFinite(Number(amount)) && Number(amount) > 0 ? Number(amount) : fallback;
    if (!resolvedAmount || isNaN(resolvedAmount) || resolvedAmount <= 0) {
      return res.status(400).json({ message: 'amount invalid or missing' });
    }

    const txnRequest = new APIContracts.TransactionRequestType();
    txnRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
  txnRequest.setAmount(resolvedAmount);

    const customer = new APIContracts.CustomerDataType();
    customer.setEmail(email);
    txnRequest.setCustomer(customer);

  const order = new APIContracts.OrderType();
  const invoiceNumber = ('INV-' + Date.now()).substring(0,20);
  order.setInvoiceNumber(invoiceNumber);
    txnRequest.setOrder(order);

    const settingReturn = new APIContracts.SettingType();
    settingReturn.setSettingName('hostedPaymentReturnOptions');
    settingReturn.setSettingValue('{"showReceipt": false, "url": "'+process.env.CLIENT_URL+'/success", "urlText": "Return", "cancelUrl": "'+process.env.CLIENT_URL+'" }');

    const settingPayment = new APIContracts.SettingType();
    settingPayment.setSettingName('hostedPaymentPaymentOptions');
    settingPayment.setSettingValue('{"cardCodeRequired": true}');

    const settingStyle = new APIContracts.SettingType();
    settingStyle.setSettingName('hostedPaymentStyleOptions');
    settingStyle.setSettingValue('{"bgColor": "white"}');

    const request = new APIContracts.GetHostedPaymentPageRequest();
    request.setMerchantAuthentication(merchantAuthenticationType());
    request.setTransactionRequest(txnRequest);
    request.setHostedPaymentSettings(new APIContracts.ArrayOfSetting().setSetting([
      settingReturn, settingPayment, settingStyle
    ]));

  const controller = new APIControllers.GetHostedPaymentPageController(request.getJSON());
  controller.setEnvironment(isSandbox ? Constants.endpoint.sandbox : Constants.endpoint.production);
    controller.execute(async () => {
      const apiResponse = controller.getResponse();
      const response = new APIContracts.GetHostedPaymentPageResponse(apiResponse);
  if (response && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
        // Create placeholder transaction record (no transactionId yet)
        const token = response.getToken();
        await Transaction.create({
          invoiceNumber,
          email,
          amount: resolvedAmount,
          status: 'initiated',
          rawData: { hostedPaymentToken: token }
        });
        if (/true/i.test(process.env.SEND_PAYMENT_EMAIL || '')) {
          sendMail({
            to: email,
            subject: 'Payment Initiated',
            text: `Your payment has been initiated. Invoice: ${invoiceNumber}. Return to ${process.env.CLIENT_URL} to complete it.`,
            html: `<p>Your payment has been initiated.</p><p>Invoice: <strong>${invoiceNumber}</strong></p><p><a href="${process.env.CLIENT_URL}">Return to complete payment</a></p>`
          }).catch(e => console.warn('Email send failed:', e.message));
        }
  const env = isSandbox ? 'sandbox' : 'production';
  const acceptBaseUrl = isSandbox ? 'https://acceptsandbox.authorize.net' : 'https://accept.authorize.net';
  res.json({ token, invoiceNumber, environment: env, acceptBaseUrl });
      } else {
        const error = response.getMessages().getMessage()[0];
        res.status(500).json({ message: error.getText() });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Quick diagnostics to validate Authorize.Net credentials/environment
export const authTest = (_req, res) => {
  try {
    const request = new APIContracts.AuthenticateTestRequest();
    request.setMerchantAuthentication(merchantAuthenticationType());
    const controller = new APIControllers.AuthenticateTestController(request.getJSON());
    controller.setEnvironment(isSandbox ? Constants.endpoint.sandbox : Constants.endpoint.production);
    controller.execute(() => {
      const apiResponse = controller.getResponse();
      const response = new APIContracts.AuthenticateTestResponse(apiResponse);
      if (response && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
        return res.json({ ok: true, environment: isSandbox ? 'sandbox' : 'production' });
      }
      const msg = response?.getMessages?.()?.getMessage?.()?.[0];
      return res.status(400).json({
        ok: false,
        code: msg?.getCode?.(),
        message: msg?.getText?.() || 'Authentication failed',
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Server error' });
  }
};

export const envHealth = (_req, res) => {
  const env = (process.env.AUTHORIZE_ENVIRONMENT || 'sandbox').toLowerCase();
  const login = process.env.AUTHORIZE_API_LOGIN_ID || '';
  const key = process.env.AUTHORIZE_TRANSACTION_KEY || '';
  const mask = (val) => {
    if (!val) return '';
    if (val.length <= 4) return '*'.repeat(val.length);
    return val.slice(0, 2) + '*'.repeat(Math.max(val.length - 4, 0)) + val.slice(-2);
  };
  res.json({
    environment: env,
    hasLoginId: Boolean(login),
    hasTransactionKey: Boolean(key),
    loginIdMasked: mask(login),
  });
};

export const handleWebhook = async (req, res) => {
  const signature = req.headers['x-anet-signature'];
  if (process.env.WEBHOOK_SIGNATURE_KEY && signature) {
    const computed = 'SHA512=' + crypto.createHmac('sha512', process.env.WEBHOOK_SIGNATURE_KEY).update(JSON.stringify(req.body)).digest('hex');
    if (computed !== signature) return res.status(401).send('Invalid signature');
  }
  try {
    const { payload } = req.body || {};
    const transId = payload?.id;
    const invoiceNumber = payload?.order?.invoiceNumber;
    const email = payload?.customer?.email;
    const amount = payload?.authAmount;
    const status = payload?.transactionStatus || 'unknown';
    const filter = invoiceNumber ? { invoiceNumber } : { transactionId: transId };
    let txn = await Transaction.findOne(filter);
    if (!txn) {
      txn = new Transaction({ invoiceNumber, transactionId: transId, email, amount, status: status || 'unknown', rawData: req.body });
    } else {
      txn.transactionId = transId || txn.transactionId;
      txn.invoiceNumber = invoiceNumber || txn.invoiceNumber;
      txn.email = email || txn.email;
      if (amount) txn.amount = amount;
      txn.status = status;
      txn.rawData = req.body;
    }

    const successStatuses = ['settledSuccessfully','capturedPendingSettlement','authorizedPendingCapture','approvedReview'];
    const shouldNotify = /true/i.test(process.env.SEND_WEBHOOK_EMAIL || '') && !txn.notified && transId && successStatuses.some(s => status?.includes(s) || status === s);
    if (shouldNotify) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const subject = `Payment ${status} - ${invoiceNumber || transId}`;
      const summaryHtml = `<p>Payment status: <strong>${status}</strong></p><ul><li>Invoice: ${invoiceNumber || 'N/A'}</li><li>Transaction ID: ${transId}</li><li>Email: ${email || 'N/A'}</li><li>Amount: ${amount}</li></ul>`;
      const summaryText = `Payment status: ${status}\nInvoice: ${invoiceNumber}\nTransaction ID: ${transId}\nEmail: ${email}\nAmount: ${amount}`;
      // Fire and forget emails (user & admin)
      if (email) {
        sendMail({ to: email, subject, text: summaryText, html: summaryHtml }).catch(e => console.warn('User email failed', e.message));
      }
      if (adminEmail) {
        sendMail({ to: adminEmail, subject: '[ADMIN] ' + subject, text: summaryText, html: summaryHtml }).catch(e => console.warn('Admin email failed', e.message));
      }
      txn.notified = true;
    }
    await txn.save();
    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
