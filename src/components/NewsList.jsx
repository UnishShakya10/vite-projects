import React, { useState } from "react";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=nepal&from=2026-07-27&sortBy=publishedAt&apiKey=01e80d44f943439d9de5e7a9a37e31b9"
      );

      const finalResponse = await response.json();

      setNewsList(finalResponse.articles);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Latest News
            </h1>

            <p className="text-gray-500 mt-1">
              Stay updated with the latest stories
            </p>
          </div>

          <button
            onClick={fetchNews}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition duration-300 shadow-md"
          >
            {loading ? "Fetching..." : "Fetch News"}
          </button>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-600 text-lg">
          Loading news...
        </div>
      )}

      {/* News Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {newsList.map((news, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 group"
          >

            {/* Image */}
            <div className="h-52 overflow-hidden">

              <img
                src={
                  news.urlToImage ||
                  "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                }
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

            {/* Content */}
            <div className="p-5">

              {/* Source + Date */}
              <div className="flex justify-between items-center mb-3">

                <span className="text-sm font-semibold text-blue-600">
                  {news.source?.name || "News"}
                </span>

                <span className="text-xs text-gray-400">
                  {news.publishedAt
                    ? new Date(news.publishedAt).toLocaleDateString()
                    : ""}
                </span>

              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                {news.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                {news.description || "No description available."}
              </p>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-5">

                <span className="text-sm text-gray-500">
                  By {news.author || "Unknown"}
                </span>

                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Read More
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* No News */}
      {!loading && newsList.length === 0 && (
        <div className="text-center mt-20">

          <p className="text-gray-500 text-lg">
            Click "Fetch News" to load the latest news.
          </p>

        </div>
      )}

    </div>
  );
};

export default NewsList;