'use client';

export default function PDFUploader({ onUpload, isExtracting, pdfText }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Upload a PDF
      </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onUpload(e.target.files[0])}
        disabled={isExtracting}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                   file:rounded-lg file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-600 file:text-white hover:file:bg-blue-700 
                   disabled:opacity-50"
      />
      {isExtracting && (
        <p className="text-blue-500 mt-3 animate-pulse">Extracting text from PDF...</p>
      )}
      {pdfText && !isExtracting && (
        <p className="text-green-600 mt-3">✅ PDF content loaded successfully!</p>
      )}
    </div>
  );
}
