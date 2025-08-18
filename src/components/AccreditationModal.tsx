import React, { useRef, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Shield, X } from 'lucide-react';
// html2pdf types are not provided; we'll treat it as any
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface AccreditationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccreditationModal: React.FC<AccreditationModalProps> = ({ isOpen, onClose }) => {
  // 0: term sheet, 1: email, 2: code, 3: amount
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [investorType, setInvestorType] = useState<'individual' | 'company' | ''>('');
  const [entityForm, setEntityForm] = useState(''); // e.g., Corporation, LLC
  const [jurisdiction, setJurisdiction] = useState(''); // e.g., Delaware, New York
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [amount, setAmount] = useState('50000');
  const amountOptions = Array.from({ length: 40 }, (_, i) => 50000 + i * 50000);
  const investorArticle = investorType === 'individual' ? 'an' : 'a';
  const investorDescriptor = investorType === 'individual'
    ? 'individual'
    : (entityForm && jurisdiction ? `${entityForm} under the laws of ${jurisdiction}` : (entityForm || 'company'));
  const termsRef = useRef<HTMLDivElement>(null);

  // Step 0: Term sheet
  const handleTermsScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
      setHasScrolledToEnd(true);
    }
  };
  const handleContinueFromTerms = () => {
    if (!name || !investorType) {
      setStatus('Please enter investor name and select investor type.');
      return;
    }
    if (investorType === 'company' && (!entityForm || !jurisdiction)) {
      setStatus('Please provide the company type and jurisdiction.');
                    // Build a printable container from the term content (remove dark bg & scroll)
                    const container = document.createElement('div');
                    const style = document.createElement('style');
                    style.textContent = `
                      .pdf-reset, .pdf-reset * { color: #000 !important; background: #fff !important; box-shadow: none !important; }
                      .pdf-reset { padding: 16px; font-family: Arial, sans-serif; line-height: 1.4; }
                      .pdf-reset h1, .pdf-reset h2, .pdf-reset h3 { color: #000 !important; }
                      .pdf-reset .border, .pdf-reset [class*="border-"] { border-color: #000 !important; }
                      .pdf-reset .rounded, .pdf-reset [class*="rounded-"] { border-radius: 0 !important; }
                      .pdf-reset .max-h-60, .pdf-reset [style*="max-height"] { max-height: none !important; }
                      .pdf-reset .overflow-y-scroll, .pdf-reset [style*="overflow"] { overflow: visible !important; }
                      .pdf-page { width: 7.5in; max-width: 7.5in; }
                      @media print { .page-break { page-break-before: always; } }
                    `;
                    const wrapper = document.createElement('div');
                    wrapper.className = 'pdf-reset pdf-page';
                    const clone = termsRef.current.cloneNode(true) as HTMLElement;
                    clone.style.maxHeight = 'none';
                    clone.style.overflow = 'visible';
                    wrapper.appendChild(clone);
                    container.appendChild(style);
                    container.appendChild(wrapper);

                    const opt = {
                      margin: [0.5, 0.5, 0.5, 0.5],
                      filename: `No-Right-Way-Term-Sheet-${(name||'Investor').replace(/[^a-z0-9\-_. ]/gi,'_')}.pdf`,
                      pagebreak: { mode: ['css', 'legacy'] },
                      image: { type: 'jpeg', quality: 0.98 },
                      html2canvas: { scale: 2, backgroundColor: '#ffffff' },
                      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                    } as any;
                    await (html2pdf as any)().set(opt).from(container).save();
  };

  // Step 1: Email input
  const handleSendCode = async () => {
    setStatus('Sending code...');
    try {
      const res = await apiFetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setStatus(data.message || '');
      if (res.ok) setStep(2);
    } catch (e) {
      setStatus('Network error sending code');
    }
  };

  // Step 2: Code input
  const handleVerifyCode = async () => {
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
        setToken(data.token || '');
        setStep(3); // Move to amount selection
      }
    } catch (e) {
      setStatus('Network error verifying code');
    } finally {
      setVerifying(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-red-500 rounded-2xl p-4 max-w-3xl w-full mx-2 relative overflow-y-auto max-h-[90vh] text-sm text-gray-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 0 && (
          <>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Investor Term Sheet Agreement</h2>
              <p className="text-xs text-gray-400">
                Please carefully review the full investor agreement and continue to proceed.
              </p>
            </div>
            {/* Required details before showing the term sheet */}
            <div className="bg-gray-800 rounded-xl p-4 mb-4 text-xs md:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1">Investor / Entity Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe or ACME LLC"
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Investor Type</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="investorType"
                        className="accent-red-600"
                        checked={investorType === 'individual'}
                        onChange={() => setInvestorType('individual')}
                      />
                      <span>Individual</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="investorType"
                        className="accent-red-600"
                        checked={investorType === 'company'}
                        onChange={() => setInvestorType('company')}
                      />
                      <span>Company</span>
                    </label>
                  </div>
                </div>
                {investorType === 'company' && (
                  <>
                    <div>
                      <label className="block text-gray-400 mb-1">Company Type</label>
                      <input
                        type="text"
                        value={entityForm}
                        onChange={(e) => setEntityForm(e.target.value)}
                        placeholder="e.g. Corporation, LLC"
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Jurisdiction</label>
                      <input
                        type="text"
                        value={jurisdiction}
                        onChange={(e) => setJurisdiction(e.target.value)}
                        placeholder="e.g. Delaware, New York"
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </>
                )}
                <div className="md:col-span-3">
                  <label className="block text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Enter these details to render the term sheet with your information.</p>
            </div>
            {name && investorType ? (
              <div
                ref={termsRef}
                className="bg-gray-800 rounded-xl p-4 mb-4 max-h-60 overflow-y-scroll space-y-2 text-xs md:text-sm leading-relaxed"
                onScroll={handleTermsScroll}
              >
                <p className="uppercase tracking-wide text-gray-300">SENT VIA EMAIL</p>
                <p><strong>{name || '[INVESTOR]'}</strong></p>
                <p>Email: {email || '[Email]'}</p>
                <p className="mt-2">Re: Term Sheet / "No Right Way"</p>
                <p>Dear {name || '__________'} :</p>
                <p>
                  This letter is intended to set forth the basic terms of understanding between {name || '[INVESTOR]'}, {investorArticle} {investorDescriptor} ("Investor") on the one hand and No Right Way Productions LLC ("Company") on the other hand, in connection with the financing for the motion picture currently entitled "No Right Way" (the "Picture"). Investor has expressed interest in investing funds into Company for the purposes set forth herein.
                </p>
                <p>
                  Please review the terms of this letter (referred to as the "Term Sheet") and if you agree to the principal terms and conditions below please sign and submit your intended investment towards the financing of the Picture in the amount no less than Fifty Thousand United States Dollars (US$50,000.00) (the "Investment"), which shall be a non-secured, non-recourse investment and payable to Company under the following terms:
                </p>
                <p><strong>1. Scope/Purpose:</strong> The Company has been formed with the Secretary of State for the State of South Carolina for the purposes of engaging in the business of financing, producing, marketing, owning, and exploiting the Picture. The Company shall be managed by Terrence Gallman (the Manager). The parties acknowledge that Company through its Manager shall have the right to make all creative and business decisions in connection with the Picture.</p>
                <p><strong>2. Nature of Financing:</strong> The Investment shall be put toward the final budget of the Picture which, subject to a force majeure event (as the term is customarily understood in the entertainment industry), is currently anticipated to be approximately Twenty-One Million Six Hundred Thousand United States Dollars (US$21,600,000.00) (the "Budget") and used for the purposes of financing, development, pre-production, production, post-production, and marketing (to the extent incurred by Company) of the Picture. This Term Sheet in no way constitutes any offer, solicitation, or sale of securities in Company or any other limited liability or other company affiliated therewith or parent thereof.</p>
                <p><strong>3. Investment Cash Flow:</strong> The Investment shall be wired into Company's designated account upon execution of the long form investor agreement (the "Long Form Agreement") to be negotiated in good faith as between Company and Investor which shall incorporate the terms of this Term Sheet. Notwithstanding anything to the contrary, in the event that the Investment is not funded by Investor hereunder within five (5) business days of execution of the Long Form Agreement, then Company shall have the right to terminate this Term Sheet and the Long Form Agreement, with no further obligation to Investor in connection herewith. In the event a Long Form Agreement is not negotiated and executed as between the parties hereto, it is understood and agreed that this Term Sheet shall constitute the Long Form Agreement and shall remain binding as between the parties hereto.</p>
                <p><strong>4. Investor Return:</strong> Investor shall receive one hundred and twenty percent (120%) of the Investment as a return from the "Company Gross Revenues," as defined by the Company in accordance with Company's definition of Company Gross Revenues as set forth in Exhibit "NP" attached hereto and incorporated herein by this reference, or</p>
                <p><strong>5. Back-end Compensation:</strong> Subject to Company's receipt in full of such Investment, Investor shall also be entitled to receive a pro rata portion of Fifty Percent (50%) of One Hundred Percent (100%) of the "Net Profits" (which shall equal the amount of the Investment divided by the total investments provided by the other equity investors, if any, multiplied by Fifty Percent [50%]) arising from the exploitation of the Picture (the "Investor's Share of Net Profits"). "Net Profits" and "Investor's Share of Net Profits" shall be defined in accordance with Company's definition thereof for the Picture. The Investor's Share of Net Profits shall be paid on a pro rata pari passu basis with all other third parties participating in the Net Profits.</p>
                <p><strong>6. Credit:</strong> All aspects of the credit accorded to Investor (e.g., size, type, duration, etc.), if any, shall be determined at Company's sole discretion. It is agreed and understood that such credits, if any, are subject to Investor not being in material breach of this Term Sheet, Company's receipt of the full Investment. It is also agreed and understood that such credits, if any, are conditioned on Investor executing a credit agreement in a form and substance approved by Company. No casual or inadvertent failure by Company to comply with the credit provisions set forth herein shall be deemed a breach hereunder.</p>
                <p><strong>7. Debt Financing:</strong> Investor hereby acknowledges that Company shall have the right to borrow funds and/or take on debt (plus any premium thereon) to conduct its business and/or in connection with the Picture (collectively, "Debt"), which such Debt shall be recoupable from Company Gross Revenues and/or other collateral in connection with the Picture (e.g., tax credits, sales proceeds, etc.).</p>
                <p><strong>8. Tax Credits:</strong> Investor acknowledges that Company shall have the right to apply for tax rebates and/or tax credits applicable to the Picture (collectively "Tax Incentives") and to utilize a tax credit lender in the applicable state (as determined by the Manager) in connection therewith, which such Tax Incentives may, at the Manager's sole direction be (a) used to offset the Budget and/or (b) deemed "Gross Revenues" (as defined by Company).</p>
                <p><strong>9. Ownership of Picture:</strong> Investor and Company hereby acknowledge and agree that the Picture shall be solely and exclusively owned by Company, including without limitation, with respect to the copyright thereof and all rights therein and thereto, including, without limitation, the sole and exclusive distribution, exhibition, performance, and reproduction rights. Except to the extent expressly set forth herein, Investor shall have no rights in and to the Picture or any element thereof, all decisions relating thereto shall be made by Company in its sole discretion. Nothing herein contained shall create or be deemed to create any rights whatsoever of any kind or nature in favor of Investor with respect to any remake(s), sequel(s), and other production(s) based upon the Picture or the underlying property.</p>
                <p><strong>10. Representations and Warranties:</strong> Each party warrants and represents that it has the full right, power, and authority to enter into and to perform its obligations under this Term Sheet. Furthermore, each party warrants, represents, and agrees that this Term Sheet has been (a) duly and validly authorized, executed, and delivered by each party; and (b) this Term Sheet constitutes each party's valid and binding obligation, enforceable in accordance with its terms (except as enforcement may be limited by applicable law).</p>
                <p><strong>11. Legal and Professional Expenses:</strong> Each of the parties (i.e., Investor and Company) is responsible for bearing the cost of their own legal and other professional expenses in connection with this Term Sheet and any other documents and exhibits, which may be necessary to effectuate the Investment.</p>
                <p><strong>12. No Guarantee:</strong> Neither Company (nor any of its agents, principals, or representatives, as applicable) has made any express or implied representation, warranty, guarantee, or agreement as to the amount of proceeds which will be derived from the distribution of the Picture, nor has Company made any express or implied representation, warranty, guarantee, or agreement that there will be any sums payable to Investor hereunder, or that the Picture will be favorably received by exhibitors or by the public, or will be distributed continuously. In no event shall Company incur any liability based upon any claim that Company (or its agents, principals, or representatives) has failed to realize receipts or revenue, which should or could have been realized.</p>
                <p><strong>13. Acknowledgement of Risks:</strong> Investor acknowledges the risks inherent in developing, producing, and marketing the Picture, including, but not limited to, the possibility of cost overruns, lower sales than anticipated, and loss of contributed financing, including, without limitation, the Investment. There is no assurance that Investor will earn a profit from Investor's investment in Company nor is there any assurance that Investor will recoup any of its Investment contributed. Company makes no representation or warranty as to the amount of proceeds, if any, to be received from exploitation of the Picture. Investor acknowledges that no federal or state agency has reviewed or made any findings or determination as to the fairness or merit of this investment and that this Term Sheet shall not constitute a registered security. Investor acknowledges that neither Company nor any person or entity acting on behalf of Company has offered the opportunity to invest herein by means of any form of general solicitation or advertising, including without limitation, (a) any advertisement, article, notice, or other communication published in any newspaper, magazine, or similar media, or broadcast over television or radio, or (b) any seminar or meeting whose attendees have been invited by any general solicitation or general advertising. Investor is a sophisticated investor familiar with the types of risks inherent in an investment of the nature hereof, and has such business or financial experience that Investor is capable of protecting his/her/its own interests in connection with the investment of the Investment. Investor is properly able to evaluate the proposed business of Company and the inherent risks therein. Investor has reviewed with Investor's own tax advisor(s) and/or attorney(s), to the extent Investor considers it prudent or relevant, the consequences of this investment and the transaction contemplated by this Term Sheet and is relying solely on such advisors and not on any statements or representations of Company in connection therewith, other than as provided for herein. Investor understands that Investor, and not Company, shall be solely responsible for Investor's own tax liability that may arise as a result of this investment or the transactions contemplated by this Term Sheet.</p>
                <p><strong>14. Confidentiality:</strong> The terms of this Term Sheet are strictly confidential and Investor agrees not to disclose or permit the disclosure of the terms and conditions contained herein to any third party without the prior written consent of Company except that Investor may disclose such terms to its officers, directors, members, managers, attorneys, other advisors, governmental entities, or parties required by law.</p>
                <p>There is no obligation on the part of any party until this Term Sheet is fully executed. Company shall have the right to provide written notice to Investor to (a) terminate this Term Sheet in the event that Investor fails to deposit the Investment as set forth herein; and (b) reject and return the Investment to Investor.</p>
                <p>This Term Sheet is binding upon the parties and is subject to New York law and the exclusive jurisdiction of the Courts of the State of New York and the Federal Courts located in New York, New York. In the event of any breach by Company of this Term Sheet or any of Company's obligations hereunder, Investor's remedies shall be limited to the right to recover actual monetary damages, if any, in an action at law, and Investor hereby waives any right to seek and/or obtain injunctive or other equitable relief with respect to any breach of Company's obligations hereunder and/or to enjoin or restrain or otherwise impair in any manner the production, distribution, exhibition, or other exploitation of the Picture, or any parts or elements thereof, or the use, publication, or dissemination of any advertising in connection therewith.</p>
                <p>This Term Sheet does not constitute either an offer to sell or an offer to purchase securities. The parties may enter into a long-form financing agreement reflecting the above terms and other customary terms and conditions, to be negotiated in good faith. Unless and until such long-form agreement is executed by the parties, this Term Sheet will constitute the parties' complete understanding and shall supersede and replace any prior understandings, negotiations, and/or agreements, whether oral or written, executed or unexecuted.</p>
                <div className="mt-6 space-y-2 text-xs">
                  <p>[signature page follows]</p>
                  <p className="mt-2">IN WITNESS WHEREOF, the parties hereby execute this Term Sheet as of the date set forth below. The parties agree to execute more formal documents affirming the essential terms herein and developing more detail thereon.</p>
                  <p className="font-semibold mt-2">READ, AGREED, & ACCEPTED:</p>
                  <p className="mt-2">COMPANY:</p>
                  <p>By: _______________________________</p>
                  <p>On behalf of No Right Way Productions, LLC</p>
                  <p>Its: ____________________________</p>
                  <p>Name: _________________________</p>
                  <p>Date: _________________________</p>
                  <p className="mt-3">INVESTOR:</p>
                  <p>By: _______________________________</p>
                  <p>Name: {name || '___________________'}</p>
                  <p>[Its: _______________________]</p>
                  <p>Address: ___________________</p>
                  <p>___________________________</p>
                  <p>Date: ______________________</p>
                </div>

                {/* Exhibit NP */}
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h3 className="text-white font-bold">EXHIBIT NP</h3>
                  <p className="mt-2"><strong>“Company Gross Revenue”</strong> (defined below) shall have the following deductions paid by or charged against Company (or its affiliated or related entities) and deducted on a continuing and cumulative basis:</p>
                  <ol className="list-decimal pl-5 space-y-2 mt-2">
                    <li>
                      <span className="font-semibold">First</span>,
                      <ol className="list-[lower-alpha] pl-5 space-y-1 mt-1">
                        <li>Collection account management costs and fees;</li>
                        <li>Residuals and applicable actual, necessary payments owed to or on behalf of applicable unions and guilds, including without limitation SAG-AFTRA;</li>
                        <li>To the extent applicable, any bonus payments to third parties (to the extent paid by Company or not otherwise assumed by a distributor) (e.g. box office bonuses);</li>
                        <li>To the extent not deducted off the top prior to receipt of Company Gross Revenue, and to the extent applicable, all distribution fees and distribution costs (including, without limitation, ad overhead, if charged), all sales fees if applicable, and any fees and/or costs to third parties who represent the Picture (e.g. producer representatives, sales advisors, etc.);
                        </li>
                        <li>All marketing and distribution costs paid by Company (including, without limitation, residuals, union obligations, delivery items, costs for producers, director, cast, and others related to the Picture to attend premieres, film festivals, and film markets);</li>
                        <li>All actual, verifiable, third party, out-of-pocket payments to agents, accountants, attorneys, and other parties who represent the Picture;</li>
                        <li>Actual interest on the direct costs of production of the Picture;</li>
                        <li>Any actual, verifiable, third-party, out-of-pocket payments paid as advances, royalties, or otherwise in connection with the exploitation of ancillary and subsidiary rights; and,</li>
                        <li>All actual, verifiable, third-party, out-of-pocket costs of auditing any distributor of the Picture of any ancillary or subsidiary rights (including without limitation, legal and auditor fees and costs).</li>
                      </ol>
                    </li>
                    <li>
                      <span className="font-semibold">Second</span>, on a pro rata pari passu basis, repayment of loans, and any and all applicable premium, interest, and/or fees in connection therewith, to the extent not yet paid;
                    </li>
                    <li>
                      <span className="font-semibold">Third</span>, a return to the investors of the investments made by each investor, including Investor, in the amount of one hundred and twenty percent (120%) of the Investment made by Investor, set forth therein, on a pro rata pari passu basis;
                    </li>
                    <li>
                      <span className="font-semibold">Fourth</span>, payment of any and all deferments, if any, as determined in Company’s sole discretion, paid on a pro-rata pari passu basis until all deferments are paid in full;
                    </li>
                    <li>
                      <span className="font-semibold">Fifth</span>, the balance shall be considered “Net Profits”, and shall be calculated on a “rolling” basis that is readjusted as additional receipts and expenses may come in. There will be no double deductions — the same cost or expense will not be deducted twice. Company may take reasonable and customary reserves to cover anticipated expenses not yet charged to the Picture, and Company shall liquidate such reserves in a timely fashion in accordance with industry custom. Following deduction of such reserves, the remaining balance shall constitute “Adjusted Gross Proceeds” and shall be payable, on a pro rata pari passu basis to (1) fifty percent (50%) collectively to all profit participants providing services on the Picture in accordance with their respective service agreements, on a pro rata pari passu basis (the “Producer’s Share of Net Profits”); and, (2) fifty percent (50%) to the investors, including Investor, who provided investments to the Company, on a pro rata pari passu basis (the “Investor’s Share of Net Profits”). For purposes of clarification, the aggregate total of the Producer’s Share of Net Profits and the Investor’s Share of Net Profits shall not exceed one hundred percent (100%).
                    </li>
                  </ol>
                  <p className="mt-3"><strong>“Company Gross Revenue”</strong> will be all monies received by or credited to the Company (and its affiliated and related entities) from the exploitation of the Picture and all customary ancillary and subsidiary rights therein (including from merchandising, but not including any income from the exploitation of sequel, remake, or other subsequent production rights). Revenue will not be considered “Company Gross Revenue” unless it is non-refundable and received or credited in U.S. Dollars in the United States (or in the Company’s foreign bank account and available to be remitted to the United States). “Company Gross Revenue” is determined after all bona fide refunds, credits, allowances, discounts, and adjustments. So-called “soft monies” shall be deemed “Company Gross Revenues” to the extent not used to offset the Budget or lent against.</p>
                  <p className="mt-3"><strong>Creditor-Debtor:</strong> The relationship between the Company and Investor is one of “creditor-debtor” and nothing in the agreement between the Company and Investor or this definition shall make Company a fiduciary or trustee of Investor. Nothing contained in the agreement between Company and Investor or this definition shall be deemed directly or indirectly to give Investor a security interest in the Picture or the revenue stream derived from the exploitation of the Picture. Company makes no representation that the Picture will be released or that the Picture will be successful enough that it will generate any amount of Net Profits and/or Company Gross Revenue. Investors shall not have any security interest, lien, or other interest in the receipts of Company and Company has no obligation to segregate any funds. Company shall have the broadest possible latitude in the distribution of the Picture, and the exercise of Company’s judgment in good faith in all matters pertaining thereto shall be final. In no event shall Company incur any liability based upon a claim that Company has failed to realize receipts or revenue that could have been realized.</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-4 mb-4 text-xs text-gray-400">
                Please enter the Investor/Entity name and select the investor type to preview the term sheet.
              </div>
            )}
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
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-semibold transition-colors text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!termsRef.current) return;
                  try {
                    const opt = {
                      margin: [0.5, 0.5, 0.5, 0.5],
                      filename: `No-Right-Way-Term-Sheet-${(name||'Investor').replace(/[^a-z0-9\-_. ]/gi,'_')}.pdf`,
                      image: { type: 'jpeg', quality: 0.98 },
                      html2canvas: { scale: 2, backgroundColor: '#ffffff' },
                      pagebreak: { mode: ['css', 'legacy'] },
                      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                    } as any;
                    // Build a printable container overriding dark theme and scroll limits
                    const container = document.createElement('div');
                    const style = document.createElement('style');
                    style.textContent = `
                      .pdf-reset, .pdf-reset * { color: #000 !important; background: #fff !important; box-shadow: none !important; }
                      .pdf-reset { padding: 16px; font-family: Arial, sans-serif; overflow: visible !important; max-height: none !important; }
                      .pdf-reset h1, .pdf-reset h2, .pdf-reset h3, .pdf-reset h4 { color: #000 !important; }
                      .pdf-reset a { color: #000 !important; text-decoration: none; }
                      .pdf-reset .border, .pdf-reset [class*="border-"] { border-color: #000 !important; }
                      .pdf-reset [class*="max-h-"], .pdf-reset [style*="max-height"] { max-height: none !important; }
                      .pdf-reset [class*="overflow-"], .pdf-reset [style*="overflow"] { overflow: visible !important; }
                    `;
                    const wrapper = document.createElement('div');
                    wrapper.className = 'pdf-reset';
                    wrapper.innerHTML = termsRef.current.outerHTML;
                    container.appendChild(style);
                    container.appendChild(wrapper);
                    await (html2pdf as any)().set(opt).from(container).save();
                    setStatus('PDF downloaded. It will be emailed after checkout.');
                  } catch (e) {
                    setStatus('Failed to generate PDF.');
                  }
                }}
                disabled={!hasScrolledToEnd || !agreed}
                className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
                  hasScrolledToEnd && agreed
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Download PDF
              </button>
              <button
                onClick={handleContinueFromTerms}
                disabled={!hasScrolledToEnd || !agreed}
                className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
                  hasScrolledToEnd && agreed
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
            {status && <div className="text-xs text-yellow-400 mt-2">{status}</div>}
            <p className="text-[10px] text-gray-500 text-center mt-2">
              This is not an offer to sell or solicitation to buy securities. Please consult legal or financial advisors.
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">Enter Your Email</h2>
              <p className="text-xs text-gray-400">We’ll send a verification code to your email address.</p>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 mb-2"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-semibold transition-colors text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSendCode}
                disabled={!name || !email}
                className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
                  name && email
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Code
              </button>
            </div>
            {status && <div className="text-xs text-yellow-400 mt-2">{status}</div>}
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">Enter Verification Code</h2>
              <p className="text-xs text-gray-400">Check your email for the code and enter it below.</p>
            </div>
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-semibold transition-colors text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyCode}
                disabled={!code || verifying}
                className={`flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
                  code && !verifying
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {verifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
            <div className="text-center mt-2">
              <button
                onClick={handleSendCode}
                className="text-xs text-gray-300 underline hover:text-white"
              >
                Resend code
              </button>
            </div>
            {status && <div className="text-xs text-yellow-400 mt-2">{status}</div>}
          </>
        )}

        {step === 3 && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">Select Investment Amount</h2>
              <p className="text-xs text-gray-400">Choose your investment amount below.</p>
            </div>
            <select
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-full mb-4 text-white"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            >
              <option value="10">10</option>
              {amountOptions.map(v => (
                <option key={v} value={v}>{v.toLocaleString()}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-full font-semibold transition-colors text-xs md:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  try {
                    const html = termsRef.current?.outerHTML || '';
                    const payload = { html, name, email, investorType, entityForm, jurisdiction, amount };
                    localStorage.setItem('nrw_investor_payload', JSON.stringify(payload));
                  } catch {}
                  const qs = new URLSearchParams({ email, name, token, amount }).toString();
                  window.location.href = `/checkout?${qs}`;
                }}
                className="flex-1 py-2 rounded-full font-semibold transition-all text-xs md:text-sm bg-red-600 hover:bg-red-700 text-white"
              >
                Continue to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccreditationModal;
