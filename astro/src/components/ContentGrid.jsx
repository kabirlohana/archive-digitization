import React, { useEffect, useState } from "react";

function ContentGrid({ selectedYear }) {
  console.log('Content Grid Selected Year:', selectedYear);

  const [issues, setIssues] = useState([]);

  // API URL (update with your actual API endpoint)
  const API_URL = 'http://localhost:8000/magazine_issue/';

  // Fetching data for selected year
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          
          // Access the issues for the selected year from the data
          if (data[selectedYear]) {
            setIssues(data[selectedYear]);
          } else {
            console.error(`No issues found for year: ${selectedYear}`);
            setIssues([]); // Clear issues if no data for the selected year
          }
        } else {
          console.error("Failed to fetch issues");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    // Ensure selectedYear is not empty or undefined before making the API request
    if (selectedYear) {
      fetchData();
    }
  }, [selectedYear]); // Trigger API call when the selectedYear changes

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
      <h3 className="text-4xl font-bold mb-10 text-white tracking-tight leading-tight">
        Magazine Issues for {selectedYear}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {issues.length > 0 ? (
          issues.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="p-6 space-y-4">
                <h4 className="text-2xl font-semibold text-gray-100">{item.publication_date}</h4>
                <img src={item.front_cover} alt={`Issue ${item.issue_number}`}  className="w-full h-56 object-contain rounded-md" />
                <a
                  href={item.url}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                >
                  Explore
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No magazine issues available for the selected year.</p>
        )}
      </div>
    </div>
  );
}

export default ContentGrid;
