import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Api = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState("All");

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=30"
      );

      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((item) => item.category))];

  // Filter products
  const filteredProducts =
    cat === "All"
      ? products
      : products.filter((item) => item.category === cat);

  return (
    <div className="min-h-screen bg-[#f5f5f0] px-5 py-12">

      {/* HEADER */}
      <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[5px] text-gray-500">
            Product Store
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
            Find Your
            <span className="block text-orange-500">
              Favorite Product.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-gray-500">
            Explore our collection of products and discover something
            you'll love.
          </p>
        </div>

        <button
          onClick={fetchProducts}
          disabled={loading}
          className="rounded-full bg-black px-8 py-4 font-bold text-white transition hover:bg-orange-500 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load Products →"}
        </button>
      </div>

      {/* CATEGORY FILTER */}
      {products.length > 0 && (
        <div className="mx-auto mb-10 flex max-w-7xl flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCat(category)}
              className={`rounded-full px-5 py-2.5 font-semibold capitalize transition ${
                cat === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {products.length === 0 && !loading && (
        <div className="mx-auto max-w-7xl border-t border-gray-300 py-20 text-center">
          <p className="text-6xl">📦</p>

          <h2 className="mt-5 text-3xl font-black text-gray-900">
            Nothing here yet
          </h2>

          <p className="mt-2 text-gray-500">
            Click "Load Products" to explore the collection.
          </p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-24">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500"></div>
        </div>
      )}

      {/* PRODUCTS */}
      {!loading && filteredProducts.length > 0 && (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">

          {filteredProducts.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="group relative flex min-h-[330px] overflow-hidden rounded-[35px] bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
            >

              {/* LEFT IMAGE */}
              <div className="relative w-[45%] overflow-hidden bg-gray-100">

                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-125"
                />

                {/* CATEGORY */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-800 backdrop-blur">
                  {item.category}
                </span>
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex w-[55%] flex-col justify-between p-6">

                <div>

                  {/* NUMBER + HEART */}
                  <div className="flex items-center justify-between">

                    <span className="text-xs font-bold text-gray-300">
                      PRODUCT #{String(item.id).padStart(2, "0")}
                    </span>

                    <button
                      onClick={(e) => e.preventDefault()}
                      className="text-2xl text-gray-400 transition hover:scale-125 hover:text-red-500"
                    >
                      <Heart />
                    </button>

                  </div>

                  {/* TITLE */}
                  <h2 className="mt-6 text-2xl font-black leading-tight text-gray-900">
                    {item.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                </div>

                <div>

                  {/* RATING */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-yellow-500">
                      ★★★★★
                    </span>

                    <span className="text-sm font-semibold text-gray-500">
                      {item.rating}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Price
                      </p>

                      <p className="text-3xl font-black text-gray-900">
                        ${item.price}
                      </p>
                    </div>

                    {/* DISCOUNT */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-center text-xs font-black text-white">
                      -{Math.round(item.discountPercentage)}%
                    </div>

                  </div>

                  {/* ADD TO CART */}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="mt-5 w-full rounded-2xl bg-gray-900 py-3 font-bold text-white transition-all duration-300 hover:bg-orange-500"
                  >
                    Add to Cart
                  </button>

                </div>
              </div>

            </Link>
          ))}

        </div>
      )}

    </div>
  );
};

export default Api;