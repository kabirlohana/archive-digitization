import React, { useState, useEffect } from "react";
import MagazineArchive from "./Searchbar"; // Search bar component
import ContentGrid from "./ContentGrid";

function MagazineApp() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true); // State for loader

  // Simulate API or content loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate loading for 1.5s
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Show loader while loading */}
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <MagazineArchive onYearSelect={setSelectedYear} />
          {/* Show ContentGrid only when a year is selected */}
          {selectedYear && <ContentGrid selectedYear={selectedYear} />}
        </>
      )}
    </div>
  );
}

export default MagazineApp;