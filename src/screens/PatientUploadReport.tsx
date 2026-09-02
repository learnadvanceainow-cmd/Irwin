import React, { useState, useRef } from 'react';

interface PatientUploadReportProps {
  onBack: () => void;
  onSubmitSuccess: (report: {
    type: string;
    title: string;
    date: string;
    notes: string;
    fileName: string;
  }) => void;
}

export const PatientUploadReport: React.FC<PatientUploadReportProps> = ({
  onBack,
  onSubmitSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [reportType, setReportType] = useState('xray');
  const [reportTitle, setReportTitle] = useState('Annual X-Ray 2024');
  const [reportDate, setReportDate] = useState('2024-11-02');
  const [reportNotes, setReportNotes] = useState('Follow-up panoramic radiograph for wisdom tooth evaluation.');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>({
    name: 'panoramic_scan_2024.png',
    size: '2.4 MB'
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
      setErrorMessage('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
      setErrorMessage('');
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) {
      setErrorMessage('Please provide a report title.');
      return;
    }
    if (!selectedFile) {
      setErrorMessage('Please select or upload a document.');
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }
    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    // Step 3: Final upload
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitSuccess({
        type: reportType,
        title: reportTitle,
        date: reportDate,
        notes: reportNotes,
        fileName: selectedFile.name
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="flex-grow flex flex-col items-center px-4 md:px-8 py-6 max-w-3xl mx-auto w-full pb-28 md:pb-8">
      {/* Header Section */}
      <div className="w-full mb-6 md:mb-8 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Diagnostic Intake</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5 mb-1.5">Upload Clinical Document</h1>
        <p className="text-xs text-[#a1a1aa]">
          Securely submit your dental radiographs, lab tests, and doctor referrals for clinical review.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="w-full flex items-center justify-between mb-8 px-2">
        {/* Step 1 */}
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex flex-col items-center gap-1.5 relative z-10 w-1/3 cursor-pointer"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep >= 1
                ? 'bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-md'
                : 'bg-[#171717] border border-white/10 text-[#71717a]'
            }`}
          >
            1
          </div>
          <span
            className={`text-[10px] font-semibold tracking-widest uppercase ${
              currentStep >= 1 ? 'text-[#fbbf24]' : 'text-[#71717a]'
            }`}
          >
            Details
          </span>
        </button>

        <div
          className={`h-[1px] flex-grow -mx-4 z-0 mt-[-20px] transition-colors ${
            currentStep >= 2 ? 'bg-[#fbbf24]' : 'bg-white/10'
          }`}
        ></div>

        {/* Step 2 */}
        <button
          type="button"
          onClick={() => setSelectedFile(selectedFile) && setCurrentStep(2)}
          className="flex flex-col items-center gap-1.5 relative z-10 w-1/3 cursor-pointer"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep >= 2
                ? 'bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-md'
                : 'bg-[#171717] border border-white/10 text-[#71717a]'
            }`}
          >
            2
          </div>
          <span
            className={`text-[10px] font-semibold tracking-widest uppercase ${
              currentStep >= 2 ? 'text-[#fbbf24]' : 'text-[#71717a]'
            }`}
          >
            Upload
          </span>
        </button>

        <div
          className={`h-[1px] flex-grow -mx-4 z-0 mt-[-20px] transition-colors ${
            currentStep >= 3 ? 'bg-[#fbbf24]' : 'bg-white/10'
          }`}
        ></div>

        {/* Step 3 */}
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="flex flex-col items-center gap-1.5 relative z-10 w-1/3 cursor-pointer"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep === 3
                ? 'bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-md'
                : 'bg-[#171717] border border-white/10 text-[#71717a]'
            }`}
          >
            3
          </div>
          <span
            className={`text-[10px] font-semibold tracking-widest uppercase ${
              currentStep === 3 ? 'text-[#fbbf24]' : 'text-[#71717a]'
            }`}
          >
            Review
          </span>
        </button>
      </div>

      {/* Error display */}
      {errorMessage && (
        <div className="w-full mb-4 p-3.5 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {errorMessage}
        </div>
      )}

      {/* Form Card */}
      <div className="w-full bg-[#141414] rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {currentStep === 1 && (
            <>
              {/* Report Type Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="reportType">
                  Report Type <span className="text-[#fbbf24]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    required
                    className="w-full h-11 bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white px-3.5 appearance-none cursor-pointer outline-hidden transition-all"
                  >
                    <option value="xray" className="bg-[#141414]">Dental X-Ray (Panoramic / Bitewing)</option>
                    <option value="blood" className="bg-[#141414]">Blood Diagnostic Test</option>
                    <option value="scan" className="bg-[#141414]">3D CBCT Dental Scan</option>
                    <option value="prescription" className="bg-[#141414]">Outside Prescription</option>
                    <option value="other" className="bg-[#141414]">Other Clinical Document</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#a1a1aa]">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Report Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="reportTitle">
                  Report Title <span className="text-[#fbbf24]">*</span>
                </label>
                <input
                  id="reportTitle"
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="e.g., Annual Panoramic X-Ray 2024"
                  required
                  className="w-full h-11 bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white px-3.5 placeholder:text-[#71717a] outline-hidden transition-all"
                />
              </div>

              {/* Report Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="reportDate">
                  Report Acquisition Date
                </label>
                <input
                  id="reportDate"
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full h-11 bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white px-3.5 outline-hidden transition-all color-scheme-dark"
                />
              </div>

              {/* Description / Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="reportNotes">
                  Description / Clinical Notes
                </label>
                <textarea
                  id="reportNotes"
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  placeholder="Add any relevant symptoms or details for your doctor..."
                  rows={3}
                  className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white p-3.5 placeholder:text-[#71717a] resize-none outline-hidden transition-all"
                />
              </div>
            </>
          )}

          {(currentStep === 2 || currentStep === 1) && (
            <div className={`flex flex-col gap-1.5 ${currentStep === 1 ? 'mt-2' : ''}`}>
              <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300">
                Upload Document <span className="text-[#fbbf24]">*</span>
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Drag and Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative w-full h-44 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer group transition-all ${
                  isDragging
                    ? 'border-[#fbbf24] bg-amber-500/10'
                    : 'border-white/15 bg-[#0d0d0d] hover:border-[#fbbf24]/50 hover:bg-[#121212]'
                }`}
              >
                <div className="flex flex-col items-center gap-2.5 p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#fbbf24]">
                    Tap to upload or drag &amp; drop
                  </span>
                  <span className="text-[11px] text-[#71717a]">PDF, JPG, or PNG (Max 10MB)</span>
                </div>
              </div>

              {/* Selected File Indicator */}
              {selectedFile && (
                <div className="flex items-center justify-between p-3.5 border border-white/10 rounded-xl bg-[#0d0d0d] mt-2 animate-in fade-in">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="material-symbols-outlined text-[#fbbf24] text-[22px]">
                      description
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate max-w-[240px]">
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-[#71717a] font-mono">{selectedFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearFile}
                    aria-label="Remove file"
                    className="p-1 text-[#a1a1aa] hover:text-red-400 transition-colors rounded-full hover:bg-white/5"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-4 py-2">
              <div className="bg-[#0e0e0e] border border-white/10 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Verification</span>
                  <span className="material-symbols-outlined text-[#fbbf24] text-[20px]">verified</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-3">
                  Confirm Submission Details
                </h3>
                <div className="space-y-2.5 text-xs text-zinc-300">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#a1a1aa]">Report Type:</span>
                    <span className="font-semibold text-white capitalize">{reportType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#a1a1aa]">Title:</span>
                    <span className="font-semibold text-white">{reportTitle}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#a1a1aa]">Acquisition Date:</span>
                    <span className="font-semibold text-white font-mono">{reportDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#a1a1aa]">Attached File:</span>
                    <span className="font-semibold text-[#fbbf24]">{selectedFile?.name}</span>
                  </div>
                  {reportNotes && (
                    <div className="pt-1.5">
                      <span className="text-[#a1a1aa] block mb-1">Clinical Notes:</span>
                      <p className="text-xs text-zinc-400 bg-[#070707] p-3 rounded-xl border border-white/5">{reportNotes}</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-[#71717a] text-center">
                Once submitted, Dr. Sarah Wilson and the clinical team will review your report within 24-48 hours.
              </p>
            </div>
          )}

          {/* Form Submit / Steps Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onBack}
              className="h-11 px-6 rounded-full border border-white/20 text-zinc-300 text-xs uppercase tracking-wider font-semibold hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-8 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <span>
                {currentStep < 3 ? 'Continue to Next Step' : isSubmitting ? 'Uploading...' : 'Upload Report'}
              </span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
