import React, { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';

const ensureAcceptJs = async (env: string) => {
  if ((window as any).Accept) return;
  const isSandbox = (env || 'sandbox') === 'sandbox';
  const src = isSandbox ? 'https://jstest.authorize.net/v1/Accept.js' : 'https://js.authorize.net/v1/Accept.js';
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Accept.js'));
    document.body.appendChild(s);
  });
};

const waitForAccept = async (tries = 20, delayMs = 50) => {
  for (let i = 0; i < tries; i++) {
    if ((window as any).Accept?.dispatchData) return true;
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
};

const digitsOnly = (v: string) => v.replace(/\D+/g, '');
const formatCardNumber = (v: string) => digitsOnly(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ').trim();
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

type Toast = { id: number; message: string; type: 'success' | 'error' | 'info' };

const CheckoutPage: React.FC = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [email, setEmail] = useState(params.get('email') || '');
  const initialName = params.get('name') || '';
  const [token] = useState(params.get('token') || '');
  const [firstName, setFirstName] = useState(initialName.split(' ')[0] || '');
  const [lastName, setLastName] = useState(initialName.split(' ').slice(1).join(' ') || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('USA');
  const [amount, setAmount] = useState('50000');
  const amountOptions = useMemo(() => {
    const opts: number[] = [];
    for (let v = 50000; v <= 2000000; v += 50000) opts.push(v);
    return opts;
  }, []);

  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardCode, setCardCode] = useState('');

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptReady, setAcceptReady] = useState(false);

  const env = import.meta.env.VITE_AUTHORIZE_ENV || 'sandbox';

  useEffect(() => {
    if (location.protocol !== 'https:') {
      setStatus('Checkout requires HTTPS to load payment library.');
    }
    // Require verified email to access
    const doCheck = async () => {
      const e = (email || '').trim();
      if (!e || !token) {
        addToast('Access missing. Redirecting...', 'error');
        setTimeout(() => { window.location.href = '/'; }, 1000);
        return;
      }
      try {
        const res = await apiFetch(`/api/verify-checkout-token?token=${encodeURIComponent(token)}`);
        if (!res.ok) throw new Error('check failed');
        const data = await res.json();
        if (!data.valid || data.email !== e) {
          addToast('Please verify your email first.', 'error');
          setTimeout(() => { window.location.href = '/'; }, 1200);
        }
      } catch {
        addToast('Unable to verify access. Redirecting...', 'error');
        setTimeout(() => { window.location.href = '/'; }, 1200);
      }
    };
    doCheck();
    // Preload Accept.js so it's ready on first click
    const preload = async () => {
      if (location.protocol !== 'https:') { setAcceptReady(false); return; }
      try {
        await ensureAcceptJs(env);
        const ok = await waitForAccept();
        setAcceptReady(ok);
        if (!ok) setStatus('Payment library is initializing. Please wait...');
      } catch (e) {
        setAcceptReady(false);
        setStatus('Failed to load payment library. Please refresh and try again.');
      }
    };
    preload();
  }, []);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  const validate = () => {
    const newErr: Record<string, string> = {};
    if (!firstName.trim()) newErr.firstName = 'First name is required';
    if (!lastName.trim()) newErr.lastName = 'Last name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErr.email = 'Valid email required';
    if (!address.trim()) newErr.address = 'Address required';
    if (!city.trim()) newErr.city = 'City required';
    if (!state.trim()) newErr.state = 'State required';
    if (country === 'US') {
      const z = digitsOnly(zip);
      if (!(z.length === 5 || z.length === 9)) newErr.zip = 'ZIP must be 5 or 9 digits';
    } else if (!zip.trim()) newErr.zip = 'Postal code required';
    if (amount && isNaN(Number(amount))) newErr.amount = 'Amount must be a number';

    const cn = digitsOnly(cardNumber);
    if (cn.length < 12 || cn.length > 19) newErr.cardNumber = 'Card number looks invalid';
    const m = digitsOnly(expMonth);
    if (m.length !== 2 || Number(m) < 1 || Number(m) > 12) newErr.expMonth = 'Use MM (01-12)';
    const y = digitsOnly(expYear);
    const now = new Date();
    const curYear = now.getFullYear();
    const yy = Number(y);
    if (y.length !== 4 || yy < curYear || yy > curYear + 20) newErr.expYear = 'Use YYYY (valid)';
    const cvv = digitsOnly(cardCode);
    if (!(cvv.length === 3 || cvv.length === 4)) newErr.cardCode = 'CVV must be 3-4 digits';

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstErr = Object.values(errors)[0] || 'Please fix the highlighted fields';
      addToast(firstErr, 'error');
      return;
    }
    setStatus('Processing...');
    setLoading(true);
    try {
      // Ensure payment library is loaded and ready
      await ensureAcceptJs(env);
      const ready = await waitForAccept();
      if (!ready) {
        setStatus('Payment library is still loading. Please try again in a moment.');
        addToast('Payment library is still loading. Please try again.', 'error');
        setLoading(false);
        return;
      }
      const clientKey = import.meta.env.VITE_AUTHORIZE_CLIENT_KEY as string;
      const apiLoginID = import.meta.env.VITE_AUTHORIZE_API_LOGIN_ID as string;
      if (!clientKey || !apiLoginID) {
        setStatus('Missing Client Key or API Login ID');
        addToast('Payment config missing. Contact support.', 'error');
        setLoading(false);
        return;
      }
      const Accept = (window as any).Accept;
      const authData = { clientKey, apiLoginID };
      const cardData = {
        cardNumber: digitsOnly(cardNumber),
        month: digitsOnly(expMonth),
        year: digitsOnly(expYear),
        cardCode: digitsOnly(cardCode),
        zip: digitsOnly(zip) || undefined,
      };

      await new Promise<void>((resolve, reject) => {
        Accept.dispatchData({ authData, cardData }, async (response: any) => {
          const result = response?.messages?.resultCode;
          if (result === 'Error') {
            const errs = response?.messages?.message || [];
            const text = errs.map((m: any) => `${m.code}: ${m.text}`).join(', ');
            setStatus(text || 'Card tokenization error');
            addToast(text || 'Card tokenization error', 'error');
            setLoading(false);
            reject(new Error(text || 'Tokenization error'));
            return;
          }
          const opaqueData = response?.opaqueData;
          if (!opaqueData?.dataDescriptor || !opaqueData?.dataValue) {
            setStatus('No opaqueData received');
            addToast('No payment token. Try again.', 'error');
            setLoading(false);
            reject(new Error('No opaqueData'));
            return;
          }
          try {
      const payRes = await apiFetch('/api/charge-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
        token,
                amount: amount ? Number(amount) : undefined,
                opaqueData: { dataDescriptor: opaqueData.dataDescriptor, dataValue: opaqueData.dataValue },
                billing: { firstName, lastName, address, city, state, zip, country },
              })
            });
            const data = await payRes.json();
            if (payRes.ok && data.ok) {
              setStatus('Payment successful');
              addToast('Payment successful', 'success');
              // Redirect to landing page after brief success toast
              setTimeout(() => { window.location.href = '/'; }, 1500);
              resolve();
            } else {
              setStatus(data.message || 'Payment failed');
              addToast(data.message || 'Payment failed', 'error');
              reject(new Error(data.message || 'Payment failed'));
            }
          } catch (err) {
            setStatus('Network error charging payment');
            addToast('Network error charging payment', 'error');
            reject(err as any);
          } finally {
            setLoading(false);
          }
        });
      });
    } catch (e) {
      // already handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl border border-red-500 p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {status && <div className="text-yellow-400 text-sm mb-3">{status}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input className={`bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)} onBlur={validate} />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input className={`bg-gray-800 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)} onBlur={validate} />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <input className={`bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} onBlur={validate} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input className={`bg-gray-800 border ${errors.address ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} onBlur={validate} />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <input className={`bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="City" value={city} onChange={e=>setCity(e.target.value)} onBlur={validate} />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <input className={`bg-gray-800 border ${errors.state ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="State" value={state} onChange={e=>setState(e.target.value)} onBlur={validate} />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div>
              <input className={`bg-gray-800 border ${errors.zip ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="ZIP Code" value={zip} onChange={e=>setZip(digitsOnly(e.target.value))} onBlur={validate} />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
            </div>
          </div>
          <input className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-full" placeholder="Country" value={country} onChange={e=>setCountry(e.target.value)} />
          <div>
            <select
              className={`bg-gray-800 border ${errors.amount ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              onBlur={validate}
            >
              {amountOptions.map(v => (
                <option key={v} value={v}>{v.toLocaleString()}</option>
              ))}
            </select>
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <input className={`bg-gray-800 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="Card Number" value={formatCardNumber(cardNumber)} onChange={e=>setCardNumber(digitsOnly(e.target.value))} onBlur={validate} inputMode="numeric" />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div>
              <input className={`bg-gray-800 border ${errors.cardCode ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="CVV" value={cardCode} onChange={e=>setCardCode(digitsOnly(e.target.value).slice(0,4))} onBlur={validate} inputMode="numeric" />
              {errors.cardCode && <p className="text-red-500 text-xs mt-1">{errors.cardCode}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  className={`bg-gray-800 border ${errors.expMonth ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`}
                  placeholder="Exp Month (MM)"
                  value={expMonth}
                  onChange={e => {
                    const raw = digitsOnly(e.target.value).slice(0, 2);
                    setExpMonth(raw);
                  }}
                  onBlur={() => {
                    const raw = digitsOnly(expMonth);
                    if (!raw) { setExpMonth(''); validate(); return; }
                    const n = Number(raw);
                    if (Number.isFinite(n) && n >= 1 && n <= 12) {
                      setExpMonth(n.toString().padStart(2, '0'));
                    }
                    validate();
                  }}
                  inputMode="numeric"
                />
                {errors.expMonth && <p className="text-red-500 text-xs mt-1">{errors.expMonth}</p>}
              </div>
              <div>
                <input className={`bg-gray-800 border ${errors.expYear ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 w-full`} placeholder="Exp Year (YYYY)" value={expYear} onChange={e=>setExpYear(digitsOnly(e.target.value).slice(0,4))} onBlur={validate} inputMode="numeric" />
                {errors.expYear && <p className="text-red-500 text-xs mt-1">{errors.expYear}</p>}
              </div>
            </div>
          </div>

          <button disabled={loading || !acceptReady} className={`w-full mt-2 py-2 rounded ${loading || !acceptReady ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} font-semibold`}>
            {loading ? 'Processing...' : acceptReady ? 'Pay Now' : 'Loading Payment...'}
          </button>
        </form>
      </div>
      {/* Toasts */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-2 rounded shadow text-sm ${t.type === 'success' ? 'bg-green-600 text-white' : t.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
