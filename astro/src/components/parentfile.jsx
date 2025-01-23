import React, { useState } from "react";
import MagazineArchive from "./Searchbar";  // Assuming this is your search bar component
import ContentGrid from "./ContentGrid";

function MagazineApp() {
    const [selectedYear, setSelectedYear] = useState(null);
  
    // console.log('Selected Year:', selectedYear);  // Check if the selected year is logged
  
    return (
      <div className="bg-gray-900 min-h-screen">
        <MagazineArchive onYearSelect={setSelectedYear} />
  
        {/* Content Grid Component */}
        {selectedYear && <ContentGrid selectedYear={selectedYear} />}
      </div>
    );
  }
  

export default MagazineApp;