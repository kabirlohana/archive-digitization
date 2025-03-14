import React, { useEffect, useRef, useState } from "react";

function MagazineArchive({ onYearSelect }) {
  const [decades, setDecades] = useState({});
  const [selectedDecade, setSelectedDecade] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const decadeScrollRef = useRef(null);
  const yearScrollRef = useRef(null);

  // API URL (update with your actual API endpoint)
  const API_URL = 'api/magazine_issue/decades/';

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();

          // Format decades (append 's' to the decade key)
          const formattedDecades = {};
          const sortedDecades = Object.keys(data).sort((a, b) => a - b);

          sortedDecades.forEach((decade) => {
            formattedDecades[`${decade}s`] = data[decade];
          });

          setDecades(formattedDecades);

          // Set the first decade and year as selected
          const firstDecade = Object.keys(formattedDecades)[0];
          const firstYear = formattedDecades[firstDecade][0];
          setSelectedDecade(firstDecade);
          setSelectedYear(firstYear);
          onYearSelect(firstYear); // Update selected year in parent component
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [onYearSelect]);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    onYearSelect(year); // Notify parent component about the year selection
  };

  const handleDecadeClick = (decade) => {
    setSelectedDecade(decade);
    setSelectedYear(decades[decade][0]);
    onYearSelect(decades[decade][0]); // Update selected year when decade is clicked
  };

  const scrollDecadesLeft = () => {
    decadeScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollDecadesRight = () => {
    decadeScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollYearsLeft = () => {
    yearScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollYearsRight = () => {
    yearScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const showDecadeArrows = Object.keys(decades).length > 12;
  const showYearArrows = decades[selectedDecade]?.length > 13;

  return (
    <div className="bg-gray-900 text-white p-8 flex flex-col justify-between">
      <h1 className="text-4xl font-bold text-center mb-8">Magazine Archive</h1>

      {/* Decades Section */}
      <div className="flex justify-center space-x-6 text-lg font-medium mb-6">
        {showDecadeArrows && (
          <button
            onClick={scrollDecadesLeft}
            className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
          >
            &lt;
          </button>
        )}

        <div
          ref={decadeScrollRef}
          className="flex overflow-hidden whitespace-nowrap py-4 border-b border-gray-700 scroll-smooth scrollbar-hide"
        >
          {Object.keys(decades).map((decade) => (
            <button
              key={decade}
              onClick={() => handleDecadeClick(decade)}
              className={`inline-block px-4 py-2 mx-1 rounded-md font-semibold transition ${
                selectedDecade === decade
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {decade}
            </button>
          ))}
        </div>

        {showDecadeArrows && (
          <button
            onClick={scrollDecadesRight}
            className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
          >
            &gt;
          </button>
        )}
      </div>

      {/* Years Section */}
      <div className="flex items-center justify-center space-x-4">
        {showYearArrows && (
          <button
            onClick={scrollYearsLeft}
            className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
          >
            &lt;
          </button>
        )}

        <div
          ref={yearScrollRef}
          className="flex overflow-hidden whitespace-nowrap py-4 border-b border-gray-700 scroll-smooth scrollbar-hide"
        >
          {Array.isArray(decades[selectedDecade]) &&
            decades[selectedDecade]?.map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`inline-block px-4 py-2 mx-1 rounded-md font-semibold transition ${
                  selectedYear === year
                    ? "text-red-500 underline decoration-4"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                {year}
              </button>
            ))}
        </div>

        {showYearArrows && (
          <button
            onClick={scrollYearsRight}
            className="bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
          >
            &gt;
          </button>
        )}
      </div>

      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold">Year: {selectedYear}</h2>
      </div>
    </div>
  );
}

export default MagazineArchive;