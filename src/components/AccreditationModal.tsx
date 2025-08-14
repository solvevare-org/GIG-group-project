import React, { useState } from 'react';
import { apiFetch } from '../lib/api';
import { Shield, X, CheckCircle } from 'lucide-react';

interface AccreditationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Should handle redirection outside
}

const AccreditationModal: React.FC<AccreditationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const sendVerificationCode = async () => {
    setStatus('Sending code...');
    try {
      const res = await apiFetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setStatus(data.message || '');
      if (res.ok) setCodeSent(true);
    } catch (e) {
      setStatus('Network error sending code');
    }
  };

  const verifyCodeAction = async () => {
    setVerifying(true);
    setStatus('Verifying...');
    try {
      const res = await apiFetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      setStatus(data.message || '');
      if (res.ok) {
        // If we have a signature file, upload it with the token before redirecting
        const token = data.token || '';
        if (signatureFile && token) {
          setStatus('Uploading signature...');
          const fd = new FormData();
          fd.append('signature', signatureFile);
          const up = await apiFetch('/api/upload-signature', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          });
          if (!up.ok) {
            const err = await up.json().catch(() => ({} as any));
            setStatus(err.message || 'Failed to upload signature');
            setVerifying(false);
            return;
          }
        }
        const qs = new URLSearchParams({ email, name, token }).toString();
        window.location.href = `/checkout?${qs}`;
      }
    } catch (e) {
      setStatus('Network error verifying code');
    } finally {
      setVerifying(false);
    }
  };

  const handleTermsScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    // Consider near-bottom as complete to avoid off-by-one issues
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
      setHasScrolledToEnd(true);
    }
  };

  if (!isOpen) return null;

  const primaryLabel = !codeSent ? (verifying ? 'Sending...' : 'Send Verification Code') : (verifying ? 'Verifying...' : 'Verify');
  const primaryDisabled = !codeSent
    ? (!hasScrolledToEnd || !signatureFile || !name || !email || !agreed || verifying)
    : (!code || verifying);
  const handlePrimaryAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!codeSent) return sendVerificationCode();
    return verifyCodeAction();
  };
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
        <div
          className="bg-gray-800 rounded-xl p-4 mb-4 max-h-60 overflow-y-scroll space-y-2 text-xs md:text-sm leading-relaxed"
          onScroll={handleTermsScroll}
        >
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

        {!hasScrolledToEnd && (
          <div className="text-xs text-yellow-400 mb-3">
            Please scroll to the bottom of the agreement to unlock the form fields.
          </div>
        )}

  {/* FORM FIELDS */}
        {hasScrolledToEnd && (
        <div className="space-y-3 mb-4">
          {/* E-Signature upload */}
          <div className="space-y-1">
            <label className="block text-xs text-gray-400">Upload E-signature (PNG/JPG/PDF)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setSignatureFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-gray-300 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
            />
            {signatureFile && (
              <div className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {signatureFile.name}
              </div>
            )}
          </div>
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
          {/* Verification code input appears after sending code */}
          {codeSent && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="flex-1 px-2 py-2 rounded bg-gray-700 border border-gray-600 text-white text-xs"
              />
            </div>
          )}
          {status && <div className="text-xs text-yellow-400 mt-1">{status}</div>}
        </div>
        )}

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
            onClick={handlePrimaryAction}
            disabled={primaryDisabled}
            className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
              !primaryDisabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {primaryLabel}
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
