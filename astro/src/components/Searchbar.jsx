import React, { useState } from "react";

function SearchBar() {
  const [selectedYear, setSelectedYear] = useState(null);
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-8 text-center shadow-lg">
      <h2 className="text-4xl font-bold mb-6">Magazine Archive</h2>
      <div className="text-lg mb-6 space-x-2">
        {years.map((year) => (
          <a
            key={year}
            href="#"
            className={`hover:text-yellow-400 px-4 py-2 rounded-full transition ${
              selectedYear === year
                ? "bg-yellow-500 text-gray-900 font-bold"
                : "bg-gray-700 text-yellow-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleYearClick(year);
            }}
          >
            {year}
          </a>
        ))}
      </div>
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="button"
          className="absolute right-2 top-1 bg-yellow-500 hover:bg-yellow-600 rounded-full p-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 4a7 7 0 110 14 7 7 0 010-14z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
