import React, { useState } from 'react';
import { Shield, X, CheckCircle } from 'lucide-react';

interface AccreditationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Should handle redirection outside
}

const AccreditationModal: React.FC<AccreditationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Accept.js dynamic loader
  const ensureAcceptJs = async () => {
    if ((window as any).Accept) return;
    const isSandbox = (import.meta.env.VITE_AUTHORIZE_ENV || 'sandbox') === 'sandbox';
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

  // Minimal card fields (collected on landing page)
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [zip, setZip] = useState('');

  const handleCharge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agreed) return;
    setLoading(true);
    setStatus('Processing...');
    try {
      await ensureAcceptJs();
      const clientKey = import.meta.env.VITE_AUTHORIZE_CLIENT_KEY as string;
      const apiLoginID = import.meta.env.VITE_AUTHORIZE_API_LOGIN_ID as string;
      if (!clientKey || !apiLoginID) {
        setStatus('Missing Client Key or API Login ID in frontend env');
        setLoading(false);
        return;
      }

      const Accept = (window as any).Accept;
      const authData = { clientKey, apiLoginID };
      const cardData = { cardNumber, month: expMonth, year: expYear, cardCode, zip }; // zip optional

      await new Promise<void>((resolve, reject) => {
        Accept.dispatchData({ authData, cardData }, async (response: any) => {
          const result = response?.messages?.resultCode;
          if (result === 'Error') {
            const errs = response?.messages?.message || [];
            const text = errs.map((m: any) => `${m.code}: ${m.text}`).join(', ');
            setStatus(text || 'Card tokenization error');
            setLoading(false);
            reject(new Error(text || 'Tokenization error'));
            return;
          }
          const opaqueData = response?.opaqueData;
          if (!opaqueData?.dataDescriptor || !opaqueData?.dataValue) {
            setStatus('No opaqueData received');
            setLoading(false);
            reject(new Error('No opaqueData'));
            return;
          }
          try {
            const payRes = await fetch('/api/charge-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                amount: amount ? Number(amount) : undefined,
                opaqueData: { dataDescriptor: opaqueData.dataDescriptor, dataValue: opaqueData.dataValue },
                billing: { firstName: name.split(' ')[0] || name, lastName: name.split(' ').slice(1).join(' ') || undefined, zip }
              })
            });
            const data = await payRes.json();
            if (payRes.ok && data.ok) {
              setStatus('Payment successful');
              onConfirm();
              resolve();
            } else {
              setStatus(data.message || 'Payment failed');
              reject(new Error(data.message || 'Payment failed'));
            }
          } catch (err) {
            setStatus('Network error charging payment');
            reject(err as any);
          } finally {
            setLoading(false);
          }
        });
      });
    } catch (e) {
      // status already set in flows above
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    // Optionally, you could validate fields here again
    if (!name || !email || !agreed) return;
    // Call the onConfirm prop to proceed (e.g., redirect to portal)
    onConfirm();
    // Optionally, you could reset the form or close the modal here
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-red-500 rounded-2xl p-4 max-w-3xl w-full mx-2 relative overflow-y-auto max-h-[90vh] text-sm text-gray-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Investor Term Sheet Agreement</h2>
          <p className="text-xs text-gray-400">
            Please carefully review the full investor agreement and complete the form below to proceed.
          </p>
        </div>

        {/* SCROLLABLE TERM SHEET */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 max-h-60 overflow-y-scroll space-y-2 text-xs md:text-sm leading-relaxed">
          <p>This letter sets forth terms of understanding between [INVESTOR], an [individual or company], and No Right Way Productions LLC (the “Company”) for investing in the film “No Right Way”.</p>
          <p><strong>1. Scope:</strong> The Company is formed for financing and producing the film. It is managed by Terrence Gallman, who holds all creative and business rights.</p>
          <p><strong>2. Investment:</strong> Minimum $50,000, non-secured, non-recourse, applied toward the $21.6M budget for development, production, and marketing.</p>
          <p><strong>3. Funding:</strong> Funds are to be wired after signing the Long Form Agreement. If not funded within 5 business days, the Term Sheet becomes void.</p>
          <p><strong>4. Returns:</strong> 120% return from Company Gross Revenues + pro rata 50% share of Net Profits with other investors.</p>
          <p><strong>5. Credits:</strong> Any on-screen credits are at Company’s sole discretion and require a credit agreement.</p>
          <p><strong>6. Debt:</strong> The Company may borrow money for the project. Debt will be recouped from Gross Revenues.</p>
          <p><strong>7. Ownership:</strong> The Company solely owns the film and all associated rights.</p>
          <p><strong>8. Legal Authority:</strong> Each party affirms it has authority to enter this agreement. This Term Sheet is binding and enforceable.</p>
          <p><strong>9. No Guarantee:</strong> There is no guarantee of returns or success. Investor may lose all of their investment.</p>
          <p><strong>10. Risk Acknowledgment:</strong> Investor understands the inherent risk in investing in motion pictures and acknowledges no agency has approved this investment.</p>
          <p><strong>11. Confidentiality:</strong> The terms of this Term Sheet are strictly confidential.</p>
          <p><strong>12. Governing Law:</strong> This agreement is governed by New York law. All disputes will be settled in New York courts.</p>
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
          />
          {/* Amount */}
          <input
            type="number"
            placeholder="Amount (optional; defaults server-side)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
          />
          {/* Card fields (Accept.js will tokenize these) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cardCode}
              onChange={(e) => setCardCode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Exp Month (MM)"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Exp Year (YYYY)"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="ZIP (optional)"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          {status && <div className="text-xs text-yellow-400 mt-1">{status}</div>}
        </div>

        {/* CONFIRMATION CHECKBOX */}
  <label className="flex items-start gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
          />
          <span className="text-gray-300 text-xs md:text-sm">
            I have read the full Term Sheet, understand the risks involved, and agree to the investment terms.
          </span>
        </label>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-semibold transition-colors text-xs md:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleCharge}
            disabled={!name || !email || !agreed || loading}
            className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
              name && email && agreed && !loading
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {loading ? 'Processing...' : 'Submit & Pay'}
            </span>
          </button>
        </div>

        <p className="text-[10px] text-gray-500 text-center mt-2">
          This is not an offer to sell or solicitation to buy securities. Please consult legal or financial advisors.
        </p>
      </div>
    </div>
  );
};

export default AccreditationModal;
