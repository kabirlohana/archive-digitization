import React, { useRef, useState } from "react";

function MagazineArchive() {
  const [selectedDecade, setSelectedDecade] = useState("2020s");
  const [selectedYear, setSelectedYear] = useState(2024);
  const decadeScrollRef = useRef(null); 
  const yearScrollRef = useRef(null); 

  
  const decades = {
    "2020s": [2020, 2021, 2022, 2023, 2024],
    "2010s": [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
    "2000s": [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
    "1990s": [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    "1980s": [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989],
    "1970s": [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979],
    "1960s": [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969],
    
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleDecadeClick = (decade) => {
    setSelectedDecade(decade);
    setSelectedYear(decades[decade][0]);
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
  const showYearArrows = decades[selectedDecade].length > 13;

  return (
    <div className="bg-gray-900 text-white p-8 flex flex-col justify-between">
    
      <h1 className="text-4xl font-bold text-center mb-8">Magazine Archive</h1>

      
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
          {decades[selectedDecade].map((year) => (
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
