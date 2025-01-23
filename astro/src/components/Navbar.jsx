import React from "react";

function Navbar({ showAdvancedSearch, setShowAdvancedSearch }) {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Filtr Kommunikation
        </h1>
        <ul className="flex space-x-6 text-white">
          {/* <li>
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Projects
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Albums
            </a>
          </li> */}
          <li>
            <button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="hover:text-gray-400"
            >
              {showAdvancedSearch ? "Close Advanced Search" : "Advanced Search"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
