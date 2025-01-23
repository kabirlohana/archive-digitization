import { useState, useEffect } from "react";
import ContentGrid from "./ContentGrid";

// Assuming your API URL is something like this
const API_URL = "http://localhost:8000/magazine_issue/";

const FilterPage = () => {
  const [filterType, setFilterType] = useState("month"); // 'month' or 'issue'
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startIssue, setStartIssue] = useState("");
  const [startIssueYear, setStartIssueYear] = useState("");
  const [endIssue, setEndIssue] = useState("");
  const [endIssueYear, setEndIssueYear] = useState("");
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]); // To store fetched data
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result); // Store the fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run only on mount

  const handleFilterTypeChange = (e) => {
    const selectedType = e.target.value;
    setFilterType(selectedType);
    // Reset all filter values when changing filter type
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");
    setStartIssue("");
    setStartIssueYear("");
    setEndIssue("");
    setEndIssueYear("");
  };

  const handleSearch = () => {
    let filteredResults = [];
    if (filterType === "month") {
      if (startMonth && startYear && endMonth && endYear) {
        const startDate = new Date(`${startMonth}-01-${startYear}`);
        const endDate = new Date(`${endMonth}-01-${endYear}`);
        filteredResults = data.filter((item) => {
          const [month, year] = item.publication_date.split("/");
          const itemDate = new Date(`${month}-01-${year}`);
          return itemDate >= startDate && itemDate <= endDate;
        });
      } else {
        alert("Please select both start and end months and years.");
      }
    } else if (filterType === "issue") {
      if (startIssue && startIssueYear && endIssue && endIssueYear) {
        const startIssueNumber = parseInt(startIssue);
        const endIssueNumber = parseInt(endIssue);
        const startYearNumber = parseInt(startIssueYear);
        const endYearNumber = parseInt(endIssueYear);

        filteredResults = data.filter((item) => {
          const issueNumber = item.issue_number[0];
          const [, year] = item.publication_date.split("/");
          const itemYear = parseInt(year);
          return (
            (itemYear > startYearNumber || (itemYear === startYearNumber && issueNumber >= startIssueNumber)) &&
            (itemYear < endYearNumber || (itemYear === endYearNumber && issueNumber <= endIssueNumber))
          );
        });
      } else {
        alert("Please select issue numbers and years for both start and end.");
      }
    }
    setResults(filteredResults);
  };

  // Handle loading and error states
  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      {/* Filter Type Selection */}
      <div className="flex space-x-4 mb-6">
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            value="month"
            checked={filterType === "month"}
            onChange={handleFilterTypeChange}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span>Month Range</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="radio"
            value="issue"
            checked={filterType === "issue"}
            onChange={handleFilterTypeChange}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span>Issue Range</span>
        </label>
      </div>

      {/* Month Range Filter */}
      {filterType === "month" && (
        <div className="space-y-4 mb-6">
          <div className="flex space-x-4">
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">Start Month</option>
              <option value="March">March</option>
              <option value="June">June</option>
              <option value="September">September</option>
              <option value="December">December</option>
            </select>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">Start Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </select>
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Month</option>
              <option value="March">March</option>
              <option value="June">June</option>
              <option value="September">September</option>
              <option value="December">December</option>
            </select>
            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Issue Range Filter */}
      {filterType === "issue" && (
        <div className="space-y-4 mb-6">
          <div className="flex space-x-4">
            <select
              value={startIssue}
              onChange={(e) => setStartIssue(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">Start Issue</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <select
              value={startIssueYear}
              onChange={(e) => setStartIssueYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">Start Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </select>
            <select
              value={endIssue}
              onChange={(e) => setEndIssue(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Issue</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <select
              value={endIssueYear}
              onChange={(e) => setEndIssueYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Year</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Results Display */}
      <div className="mt-6">
        {results.length > 0 ? (
          <ContentGrid items={results} />
        ) : (
          <p className="text-gray-500">No results found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
};

export default FilterPage;