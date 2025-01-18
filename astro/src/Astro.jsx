import React from "react";
import Navbar from "../../intergalactic-iron/src/components/Navbar.jsx";
import SearchBar from "../../intergalactic-iron/src/components/Searchbar.jsx";
import ContentGrid from "../../intergalactic-iron/src/components/ContentGrid.jsx";

function App() {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <SearchBar />
        <ContentGrid />
      </div>
    </div>
  );
}

export default App;
