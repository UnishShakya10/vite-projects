
import { Ship } from "lucide-react";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

const ApiDetail = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/${params.id}`
      );

      const finalResponse = await response.json();

      console.log(finalResponse);

      setNewProduct(finalResponse);
      setIsFetched(true);

    } catch (err) {

      alert("Error loading product");

    } finally {

      setLoading(false);

    }
  };
useEffect (()=>{
    fetchProducts()
  },[]
)

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10 ">

      {/* FETCH / RETURN BUTTON */}

      <div className="mb-8 flex justify-end">

        <button
          className="rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-amber-100 transition hover:bg-blue-500"
          onClick={() => {
            if (isFetched) {
              navigate("/api");
            } else {
              fetchProducts();
            }
          }}
        >
          {loading
            ? "Loading..."
            : isFetched
            ? "Return"
            : "Fetch"}
        </button>

      </div>

      {/* PRODUCT DETAILS */}

      {newProduct.id && (

        <div className="mx-auto max-w-6xl rounded-2xl bg-gray-400  px-6 py-10">

          <div className="grid gap-10 md:grid-cols-2">

            {/* PRODUCT IMAGE */}

            <div className="flex items-center justify-center border rounded-2xl">

              <img
                src={newProduct.thumbnail}
                alt={newProduct.title}
                className="w-full rounded-xl object-cover"
              />

            </div>

            {/* PRODUCT INFORMATION */}

            <div className="rounded-xl bg-white p-8">

              <h1 className="mb-4 text-3xl font-bold">
                {newProduct.title}
              </h1>

              <p className="mb-4 text-gray-600">
                {newProduct.description}
              </p>

              <p className="mb-2 text-lg">
                <strong>Brand:</strong> {newProduct.brand}
              </p>

              <p className="mb-2 text-lg">
                <strong>Category:</strong> {newProduct.category}
              </p>

              <p className="mb-2 text-lg">
                <strong>Rating:</strong> ⭐ {newProduct.rating}
              </p>

              <p className="mb-2 text-lg">
                <strong>Stock:</strong> {newProduct.stock}
              </p>

              <p className="mt-5 text-3xl font-bold text-green-600">
                ${newProduct.price}
              </p>

              <p className="mt-2 text-red-500">
                {newProduct.discountPercentage}% OFF
              </p>

              <button className="mt-6 w-full rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-600">
                  Add to Cart
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ApiDetail;

