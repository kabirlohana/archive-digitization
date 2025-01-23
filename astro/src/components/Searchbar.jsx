import React, { useEffect, useRef, useState } from "react";

function MagazineArchive({ onYearSelect }) {
  const [decades, setDecades] = useState({});
  const [selectedDecade, setSelectedDecade] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const decadeScrollRef = useRef(null);
  const yearScrollRef = useRef(null);

  // Sample JSON Data (simulate API response)
  const sampleData = {
    "1990": [1992, 1993, 1994, 1990, 1996, 1997, 1999, 1998, 1991, 1995],
    "2010": [2011, 2012, 2013, 2019, 2014, 2018, 2015, 2017, 2016, 2010],
    "2020": [2020, 2021, 2023, 2022, 2025],
    "2000": [2008, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2009],
    "1980": [1988, 1989],
  };

  // Simulate fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = sampleData;

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
          {decades[selectedDecade]?.map((year) => (
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
