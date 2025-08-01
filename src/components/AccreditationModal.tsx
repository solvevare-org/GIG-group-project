import React, { useState } from 'react';
import { Shield, X, AlertTriangle, CheckCircle } from 'lucide-react';

interface AccreditationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AccreditationModal: React.FC<AccreditationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (hasConfirmed && hasAgreed) {
      onConfirm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-red-500 rounded-2xl p-2 md:p-4 max-w-md w-full mx-2 relative overflow-y-auto max-h-[90vh]">
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
          <h2 className="text-2xl font-bold text-white mb-2">SEC Regulation D Compliance</h2>
          <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-semibold">Accredited Investor Verification Required</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-3 mb-4">
          <h3 className="text-base font-bold text-white mb-2">SEC Legal Disclaimer</h3>
          <div className="text-gray-300 text-xs md:text-sm space-y-2 leading-relaxed">
            <p>
              <strong>IMPORTANT LEGAL NOTICE:</strong> This private offering is made available exclusively to 
              "accredited investors" as defined in Rule 501(a) of Regulation D under the Securities Act of 1933, as amended.
            </p>
            <p>
              <strong>ACCREDITATION REQUIREMENTS:</strong> By proceeding, you represent and warrant that you meet 
              one or more of the following SEC-defined criteria:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-xs md:text-sm">
              <li><strong>Income Test:</strong> Individual income exceeding $200,000 (or $300,000 joint with spouse) in each of the two most recent years with reasonable expectation of same income level in current year</li>
              <li><strong>Net Worth Test:</strong> Net worth exceeding $1,000,000 (excluding value of primary residence)</li>
              <li><strong>Institutional Investor:</strong> Entity with assets exceeding $5,000,000 not formed specifically to acquire the securities</li>
              <li><strong>Licensed Professional:</strong> Holder of Series 7, 65, or 82 license in good standing</li>
              <li><strong>Knowledgeable Employee:</strong> Executive officer, director, or general partner of the issuer</li>
            </ul>
            <p className="text-yellow-300 font-semibold text-xs md:text-sm">
              <strong>RISK WARNING:</strong> Private investments involve substantial risk of loss and are suitable only for sophisticated investors who can afford to lose their entire investment.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasConfirmed}
              onChange={(e) => setHasConfirmed(e.target.checked)}
              className="mt-1 w-5 h-5 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
            />
            <span className="text-gray-300 text-xs md:text-sm">
              <strong>ACCREDITATION CONFIRMATION:</strong> I hereby represent and warrant that I am an "accredited investor" 
              as defined by SEC Rule 501(a) and meet one or more of the financial criteria outlined above. I understand 
              that this representation may be subject to verification.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
            />
            <span className="text-gray-300 text-xs md:text-sm">
              <strong>RISK ACKNOWLEDGMENT:</strong> I understand this is a private offering exempt from SEC registration, 
              involves substantial risk of loss, and agree to maintain confidentiality. I acknowledge receipt of all 
              required risk disclosures and have had opportunity to ask questions.
            </span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-semibold transition-colors text-xs md:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!hasConfirmed || !hasAgreed}
            className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
              hasConfirmed && hasAgreed
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {hasConfirmed && hasAgreed ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Proceed to Portal
              </span>
            ) : (
              'Confirm Requirements'
            )}
          </button>
        </div>

        <p className="text-[10px] text-gray-500 text-center mt-2">
          This verification is required by federal securities law (Securities Act of 1933, Rule 506). 
          Studios does not provide investment advice. Consult your financial advisor before investing.
        </p>
      </div>
    </div>
  );
};

export default AccreditationModal;