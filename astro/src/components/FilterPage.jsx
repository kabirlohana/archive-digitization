import { useState } from "react";
import ContentGrid from "./ContentGrid";

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

  const handleSearch = () => {
    const newResults = [];
    if (filterType === "month") {
      if (startMonth && startYear && endMonth && endYear) {
        newResults.push(
          `Results from ${startMonth}/${startYear} to ${endMonth}/${endYear}`
        );
      } else {
        newResults.push("Please select both start and end months and years.");
      }
    } else if (filterType === "issue") {
      if (startIssue && startIssueYear && endIssue && endIssueYear) {
        newResults.push(
          `Results for Issues #${startIssue} (${startIssueYear}) to #${endIssue} (${endIssueYear})`
        );
      } else {
        newResults.push(
          "Please select issue numbers and years for both start and end."
        );
      }
    }
    setResults(newResults);
  };

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
              <option value="01">January</option>
              <option value="02">February</option>
              {/* Other months */}
            </select>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">Start Year</option>
              <option value="2024">2024</option>
              {/* Other years */}
            </select>
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Month</option>
              <option value="01">January</option>
              {/* Other months */}
            </select>
            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Year</option>
              <option value="2024">2024</option>
              {/* Other years */}
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
              {/* Other issue numbers */}
            </select>
            <select
              value={startIssueYear}
              onChange={(e) => setStartIssueYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">Start Year</option>
              <option value="2024">2024</option>
              {/* Other years */}
            </select>
            <select
              value={endIssue}
              onChange={(e) => setEndIssue(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Issue</option>
              <option value="1">1</option>
              <option value="2">2</option>
              {/* Other issue numbers */}
            </select>
            <select
              value={endIssueYear}
              onChange={(e) => setEndIssueYear(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-1/4"
            >
              <option value="">End Year</option>
              <option value="2024">2024</option>
              {/* Other years */}
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

      {/* Results */}
      <div className="mb-6">
        {results.length > 0 && (
          <div className="text-lg font-semibold">
            <ul>
              {results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Content Grid */}
      <ContentGrid />
    </div>
  );
};

export default FilterPage;
