import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const RetailerCreateMarket = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
  });
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null); // market detail view
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    description: "",
    purchasePrice: "",
    sellingPrice: "",
    stock: "",
    visibility: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  // Fetch markets on mount
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/retail", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setMarkets(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMarkets();
  }, [token]);

  // Create market
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location) {
      setError("Market name and location are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/retail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create market");

      setMarkets([...markets, data]); // add new market
      setForm({ name: "", location: "", description: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open market detail + fetch products
  const openMarket = async (market) => {
    setSelectedMarket(market);

    try {
      const res = await fetch(
        `http://localhost:3000/api/retail/products?marketId=${market._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Back to markets
  const goBack = () => {
    setSelectedMarket(null);
    setProducts([]);
    setProductForm({
      name: "",
      category: "",
      description: "",
      purchasePrice: "",
      sellingPrice: "",
      stock: "",
      visibility: true,
    });
  };

  // Handle product form
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.sellingPrice || !productForm.stock) {
      setError("Name, selling price, and stock are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/retail/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...productForm,
          marketId: selectedMarket._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      setProducts([...products, data.product]); // use product from backend
      setProductForm({
        name: "",
        category: "",
        description: "",
        purchasePrice: "",
        sellingPrice: "",
        stock: "",
        visibility: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Market detail view
  if (selectedMarket) {
    return (
      <div className="space-y-6">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          ← Back to Markets
        </button>

        <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl shadow-card">
          <h2 className="text-2xl font-bold text-light-100">
            {selectedMarket.name}
          </h2>
          <p className="text-sm text-light-400">{selectedMarket.description}</p>
          <p className="text-sm text-light-300 mt-2">
            Owner: {selectedMarket.owner?.companyName} | Email:{" "}
            {selectedMarket.owner?.email} | Phone:{" "}
            {selectedMarket.owner?.phoneNumber}
          </p>
        </div>

        {/* Product Form */}
        <form
          onSubmit={handleProductSubmit}
          className="bg-dark-800 border border-dark-700 p-6 rounded-xl shadow-card space-y-4"
        >
          {error && <p className="text-red-500">{error}</p>}
          <h3 className="text-lg font-bold text-light-100">Add Product</h3>

          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={productForm.name}
            onChange={handleProductChange}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black placeholder-gray-400"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productForm.category}
            onChange={handleProductChange}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black placeholder-gray-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productForm.description}
            onChange={handleProductChange}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black placeholder-gray-400"
          />
          <input
            type="number"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={productForm.purchasePrice}
            onChange={handleProductChange}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black placeholder-gray-400"
          />
          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            value={productForm.sellingPrice}
            onChange={handleProductChange}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black placeholder-gray-400"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productForm.stock}
            onChange={handleProductChange}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black placeholder-gray-400"
          />

          <label className="flex items-center space-x-2 text-light-100">
            <input
              type="checkbox"
              name="visibility"
              checked={productForm.visibility}
              onChange={handleProductChange}
            />
            Visible in Store
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-black px-4 py-2 rounded-md"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <div className="space-y-3">
          {products.length === 0 ? (
            <p className="text-light-400">No products added yet.</p>
          ) : (
            products.map((p) => (
              <div
                key={p._id || p.id}
                className="bg-dark-900 border border-dark-600 p-4 rounded-md"
              >
                <h4 className="text-light-100 font-semibold">{p.name}</h4>
                <p className="text-light-400">{p.category}</p>
                <p className="text-light-500">{p.description}</p>
                <p className="text-light-300">
                  Purchase Price: ₹{p.purchasePrice} | Selling Price: ₹
                  {p.sellingPrice}
                </p>
                <p className="text-light-300">Stock: {p.stock}</p>
                <p className="text-light-400">
                  Status: {p.status} | Visible: {p.visibility ? "Yes" : "No"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Main markets page (with Create Market form)
  return (
    <div className="space-y-8">
      {/* Create Market Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-dark-800 border border-dark-700 p-6 rounded-xl shadow-card space-y-4"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <h2 className="text-xl font-bold text-black">Create Market</h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Market Name"
          className="w-full px-3 py-2 rounded-md bg-dark-900 text-black"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-3 py-2 rounded-md bg-dark-900 text-black"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 rounded-md bg-dark-900 text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          {loading ? "Creating..." : "Create Market"}
        </button>
      </form>

      {/* Markets List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-black">Your Markets</h2>
        {markets.length === 0 ? (
          <p className="text-light-400">No markets created yet.</p>
        ) : (
          <ul className="space-y-2">
            {markets.map((market) => (
              <li
                key={market._id || market.id}
                className="bg-dark-900 p-4 border border-dark-600 rounded-md cursor-pointer hover:border-primary transition-colors"
                onClick={() => openMarket(market)}
              >
                <h3 className="text-light-100 font-semibold">{market.name}</h3>
                <p className="text-light-400">{market.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RetailerCreateMarket;
