import React from "react";

function Navbar({ showAdvancedSearch, setShowAdvancedSearch }) {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Filtr Kommunikation
        </h1>
        <ul className="flex space-x-6 text-white">
          <li>
            <a href="#" className="hover:text-yellow-300 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-300 transition">
              Projects
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-300 transition">
              Albums
            </a>
          </li>
          <li>
            <button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="hover:text-yellow-300 transition"
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
