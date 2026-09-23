import { useState } from "react";

export const ProductList = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");

    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    // Add / Update Product
    const handleSubmit = () => {
        if (productName.trim() === "" || price.trim() === "") {
            return;
        }

        if (editIndex !== null) {
            const updatedProducts = products.map((product, index) => {
                if (index === editIndex) {
                    return {
                        ...product,
                        name: productName,
                        price: price
                    };
                }

                return product;
            });

            setProducts(updatedProducts);
            setEditIndex(null);
        } else {
            const newProduct = {
                name: productName,
                price: price
            };

            setProducts([...products, newProduct]);
        }

        setProductName("");
        setPrice("");
    };

    // Edit
    const handleEdit = (index) => {
        setProductName(products[index].name);
        setPrice(products[index].price);
        setEditIndex(index);
    };

    // Delete
    const handleDelete = (index) => {
        const newProducts = products.filter(
            (product, i) => i !== index
        );

        setProducts(newProducts);
    };

    return (

            <div
    className="min-h-screen flex items-start justify-center pt-10 bg-cover bg-center"
    style={{ backgroundImage: "url('/my-background.jpg')" }}
>

        <div className="bg-gray-300/60 p-6 rounded-2xl shadow-lg w-96 flex flex-col items-center gap-4 m-4 m-auto">

            <h1 className="text-3xl font-bold">
                Product List
            </h1>

            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="border border-gray-800 p-2 rounded-xl"
            />

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="border border-gray-800 p-2 rounded-xl"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
                {editIndex !== null ? "Update Product" : "+ Add Product"}
            </button>
            

            <div className="flex flex-col gap-2 w-80">

                {products.map((product, index) => (
                    <div
                        key={index}
                        className="bg-white p-3 rounded-xl flex items-center justify-between"
                    >

                        <div>
                            <p className="font-semibold">
                                {product.name}
                            </p>

                            <p className="text-gray-600">
                                Rs. {product.price}
                            </p>
                        </div>

                        <div className="flex gap-2">

                            <button
                                onClick={() => handleEdit(index)}
                                className="bg-blue-600 text-white px-2 py-1 rounded-lg"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-purple-600 text-white px-2 py-1 rounded-lg"
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </div>
        </div>
    );
};