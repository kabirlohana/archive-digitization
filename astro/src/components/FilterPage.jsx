import { useState, useEffect } from "react";
import ContentGrid from "./ContentGrid";
import FilterPageContent from "./FilterPageContent";

const API_URL = "api/magazine_issue/search/";

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
  const [loading, setLoading] = useState(false); // Loading state for search
  const [error, setError] = useState(null); // Error state

  const handleFilterTypeChange = (e) => {
    const selectedType = e.target.value;
    setFilterType(selectedType);
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");
    setStartIssue("");
    setStartIssueYear("");
    setEndIssue("");
    setEndIssueYear("");
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
  
    try {
      let params = "";
  
      if (filterType === "month") {
        if (startMonth && startYear && endMonth && endYear) {
          params = `?date_begin=${startMonth}-${startYear}&date_end=${endMonth}-${endYear}`;
        } else {
          alert("Please select both start and end months and years.");
          setLoading(false);
          return;
        }
      } else if (filterType === "issue") {
        if (startIssue && startIssueYear && endIssue && endIssueYear) {
          params = `?issue_begin=${startIssue}-${startIssueYear}&issue_end=${endIssue}-${endIssueYear}`;
        } else {
          alert("Please select issue numbers and years for both start and end.");
          setLoading(false);
          return;
        }
      }
  
      const response = await fetch(`${API_URL}${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
  
      const result = await response.json();
      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

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
           <FilterPageContent items={results} loading={loading} />
           
 
        ) : (
          <p className="text-gray-500">No results found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
};

export default FilterPage;