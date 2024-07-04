import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fetch-pdf");
        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }
        const blob = await response.blob();

        // Convert blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setPdfData(base64data);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setError("Failed to load PDF");
      }
    };

    fetchPdf();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {pdfData && (
        <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
}

export default PdfViewer;
