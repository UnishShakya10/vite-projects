
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const loadProduct = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Unable to load product");
  }

  return response.json();
};

const ApiDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      setNewProduct(await loadProduct(params.id));
      setIsFetched(true);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    loadProduct(params.id)
      .then((product) => {
        if (active) {
          setError("");
          setNewProduct(product);
          setIsFetched(true);
        }
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [params.id]);

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

      {error && <p className="text-center text-red-600">{error}</p>}

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

