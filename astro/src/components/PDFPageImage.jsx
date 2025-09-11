import { useEffect, useState } from "react";

export default function PDFPageImage({ pdfPath, pageNumber, scale = 2 }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    const renderPageAsImage = async () => {
      const pdfjsLib = await import("pdfjs-dist/webpack"); // 👈 lazy import
      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      setImgSrc(canvas.toDataURL("image/png"));
    };

    renderPageAsImage();
  }, [pdfPath, pageNumber, scale]);

  if (!imgSrc) return <p className="text-gray-400">Loading page {pageNumber}...</p>;

  return (
    <img
      src={imgSrc}
      alt={`PDF page ${pageNumber}`}
      className="cursor-pointer rounded shadow-md hover:scale-105 transition"
    />
  );
}
