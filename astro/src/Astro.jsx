import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ContentGrid from "./components/ContentGrid";
import FilterPage from "./components/FilterPage";
import SearchBar from "./components/Searchbar";
import MagazineApp from "./components/parentfile";

function App() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      {/* Pass state and setter to Navbar */}
      <Navbar
        showAdvancedSearch={showAdvancedSearch}
        setShowAdvancedSearch={setShowAdvancedSearch}
      />
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Conditionally render FilterPage */}
        {showAdvancedSearch ? (
          <FilterPage />
        ) : (
          <>
            <MagazineApp/>
            {/* <ContentGrid /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;