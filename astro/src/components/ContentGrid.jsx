import React from "react";

const data = {
  "1992": [
    {
      "url": "http://localhost:8000/magazine_issue/132/",
      "publication_date": "January/1992",
      "issue_number": [1],
      "front_cover": "http://localhost:8000/media/1_-_January_1992.jpg"
    },
    {
      "url": "http://localhost:8000/magazine_issue/134/",
      "publication_date": "April/1992",
      "issue_number": [2],
      "front_cover": "http://localhost:8000/media/2_-_April_1992.jpg"
    },
    {
      "url": "http://localhost:8000/magazine_issue/133/",
      "publication_date": "July/1992",
      "issue_number": [3],
      "front_cover": "http://localhost:8000/media/3_-_July_1992.jpg"
    },
    {
      "url": "http://localhost:8000/magazine_issue/131/",
      "publication_date": "October/1992",
      "issue_number": [4],
      "front_cover": "http://localhost:8000/media/4_-_October_1992.jpg"
    }
  ],
  "2011": [
    {
      "url": "http://localhost:8000/magazine_issue/194/",
      "publication_date": "March/2011",
      "issue_number": [1],
      "front_cover": "http://localhost:8000/media/1_-_March_2011.jpg"
    },
    {
      "url": "http://localhost:8000/magazine_issue/195/",
      "publication_date": "June/2011",
      "issue_number": [2],
      "front_cover": "http://localhost:8000/media/2_-_June_2011.jpg"
    },
    {
      "url": "http://localhost:8000/magazine_issue/251/",
      "publication_date": "September/2011",
      "issue_number": [3],
      "front_cover": "http://localhost:8000/media/3_-_September_2011.jpg"
    },
    {
      "url": "http://localhost:8000/magazine_issue/196/",
      "publication_date": "December/2011",
      "issue_number": [4],
      "front_cover": "http://localhost:8000/media/4_-_December_2011.jpg"
    }
  ]
};

function ContentGrid({ selectedYear }) {
  console.log('Content Grid Selected Year:', selectedYear); 

  const issues = data[selectedYear] || [];  

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
      <h3 className="text-4xl font-bold mb-10 text-white tracking-tight leading-tight">
        Magazine Issues for {selectedYear}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {issues.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="p-6 space-y-4">
              <h4 className="text-2xl font-semibold text-gray-100">{item.publication_date}</h4>
              <img src={item.front_cover} alt={`Issue ${item.issue_number}`} className="w-full h-56 object-cover rounded-md" />
              <a
                href={item.url}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
              >
                Explore
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ContentGrid;
