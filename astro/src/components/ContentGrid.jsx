import React from "react";

const data = new Array(24).fill({
  title: "Dummy Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

function ContentGrid() {
  return (
    <div className="mt-12">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Popular on Internet</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
            <p className="text-sm">{item.description}</p>
            <a
              href="#"
              className="text-yellow-300 underline mt-4 block hover:text-yellow-400 transition"
            >
              Explore
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentGrid;
