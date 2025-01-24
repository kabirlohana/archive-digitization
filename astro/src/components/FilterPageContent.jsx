import React from "react";

function FilterPageContent({ items }) {
  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
      <h3 className="text-4xl font-bold mb-10 text-white tracking-tight leading-tight">Magazine Issues</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div>
                <img
                  src={item.front_cover}
                  alt={`Cover of issue ${item.issue_number}`}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h4 className="text-2xl font-semibold text-gray-100">{`Issue ${item.issue_number}`}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Publication Date: {item.publication_date}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No results found.</p>
      )}
    </div>
  );
}

export default FilterPageContent;