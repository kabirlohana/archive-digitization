import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ContentGrid from "./components/ContentGrid";
import FilterPage from "./components/FilterPage";
import SearchBar from "./components/Searchbar";

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
        {/* Always show SearchBar and ContentGrid */}

        {/* Conditionally render FilterPage */}
        {showAdvancedSearch ? (
          <FilterPage />
        ) : (
          <>
            <SearchBar />
            <ContentGrid />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
