import { useState } from "react";
import PDFPageImage from "./PDFPageImage.jsx";

export default function PDFModal({ pdfPath, pages }) {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => {
              setActivePage(page);
              setOpen(true);
            }}
          >
            <PDFPageImage pdfPath={pdfPath} pageNumber={page} />
          </div>
        ))}
      </div>

    {open && (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
        >
        <div className="bg-white rounded-lg p-4 max-w-2xl w-full">
        <PDFPageImage
            pdfPath={pdfPath}
            pageNumber={activePage}
            scale={2} // 👈 make it smaller
        />
        <button
            onClick={() => setOpen(false)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
        Close
        </button>
        </div>
        </div>
    )}

    </div>
  );
}
