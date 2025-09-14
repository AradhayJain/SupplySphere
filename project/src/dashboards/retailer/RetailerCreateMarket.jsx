import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const RetailerCreateMarket = () => {
  const [form, setForm] = useState({
    marketId:"",
    name: "",
    location: "",
    description: "",
  });
  
  const [selectedMarket, setSelectedMarket] = useState(null);

  // Bought products for retailer
  const [products, setProducts] = useState([]);
  const [marketProducts, setMarketProducts] = useState([]);
  const {allMarkets,markets,setMarkets} = useAuth();

  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    category: "",
    description: "",
    sellingPrice: "",
    stock: "",
    visibility: true,
  });

  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  //fetch all markets


  // Fetch markets on mount
 

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

  // ✅ check if market already exists
  const exists = markets.some((m) => m.name.toLowerCase() === form.name.toLowerCase());
  if (exists) {
    window.alert("Market Already Exists");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const final = {
      name: form.name.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
    };

    const res = await fetch("http://localhost:3000/api/retail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(final),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create market");

    setMarkets([...markets, data]);
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
      if (res.ok) setMarketProducts(data);

      // fetch bought products for retailer
      const boughtRes = await fetch(
        "http://localhost:3000/api/retail/products/bought",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const boughtData = await boughtRes.json();
      if (boughtRes.ok) setProducts(boughtData);
    } catch (err) {
      console.error(err);
    }
  };

  // Back to markets
  const goBack = () => {
    setSelectedMarket(null);
    setProducts([]);
    setMarketProducts([]);
    setProductForm({
      productId: "",
      name: "",
      category: "",
      description: "",
      sellingPrice: "",
      stock: "",
      visibility: true,
    });
  };

  // Handle product dropdown select
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const selected = products.find((p) => p.orderId === productId);
    console.log(selected)
    if (selected) {
      setProductForm({
        ...productForm,
        productId: selected.orderId,
        name: selected.name,
        category: selected.category,
        description: selected.description,
        purchasePrice:selected.purchasePrice
      });
    } else {
      setProductForm({
        productId: "",
        name: "",
        category: "",
        description: "",
        sellingPrice: 100,
        stock: "",
        purchasePrice: 100,
        visibility: true,
      });
    }
  };

  // Handle product form changes (sellingPrice, stock, visibility)
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleMarketChange = (e) => {
    const marketId = e.target.value;
    const selected = allMarkets.find((p) => p._id === marketId);
    console.log(selected)
    if (selected) {
      setForm({
        ...form,
        marketId: selected._id,
        name: selected.name,
        location: selected.location,
        description: selected.description,
      });
    } else {
      setForm({
        marketId:"",
        name: "",
        location: "",
        description: ""
      });
    }
  };

  // Submit product to market
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.productId || !productForm.sellingPrice || !productForm.stock) {
      setError("Product, selling price, and stock are required.");
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

      setMarketProducts([...marketProducts, data.product]);
      setProductForm({
        productId: "",
        name: "",
        category: "",
        description: "",
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

  // ---------------- Market Detail View ----------------
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

        {/* Add Product Form */}
        <form
          onSubmit={handleProductSubmit}
          className="bg-dark-800 border border-dark-700 p-6 rounded-xl shadow-card space-y-4"
        >
          {error && <p className="text-red-500">{error}</p>}
          <h3 className="text-lg font-bold text-light-100">Add Product</h3>

          {/* Dropdown of bought products */}
          <select
            name="productId"
            onChange={handleProductSelect}
            value={productForm.productId || ""}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black"
          >
            <option value="">-- Select from Bought Products --</option>
            {products.map((bp) => (
              <option key={bp.orderId} value={bp.orderId}>
                {bp.name} ({bp.category})
              </option>
            ))}
          </select>

          {/* Auto-filled manufacturer fields */}
          <input
            type="text"
            name="name"
            value={productForm.name}
            readOnly
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-gray-400"
          />
          <input
            type="text"
            name="category"
            value={productForm.category}
            readOnly
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-gray-400"
          />
          <textarea
            name="description"
            value={productForm.description}
            readOnly
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-gray-400"
          />

          {/* Retailer-specific fields */}
          <input
            type="number"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={productForm.purchasePrice}
            readOnly
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
          {marketProducts.length === 0 ? (
            <p className="text-light-400">No products added yet.</p>
          ) : (
            marketProducts.map((p) => (
              <div
                key={p._id || p.id}
                className="bg-dark-900 border border-dark-600 p-4 rounded-md"
              >
                <h4 className="text-light-100 font-semibold">{p.name}</h4>
                <p className="text-light-400">{p.category}</p>
                <p className="text-light-500">{p.description}</p>
                <p className="text-light-300">
                  Selling Price: ₹{p.sellingPrice} | Stock: {p.stock}
                </p>
                <p className="text-light-400">
                  Visible: {p.visibility ? "Yes" : "No"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ---------------- Markets Page ----------------
  return (
    <div className="space-y-8">
      {/* Create Market Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-dark-800 border border-dark-700 p-6 rounded-xl shadow-card space-y-4"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <h2 className="text-xl font-bold text-black">Create Market</h2>
         <select
            name="marketId"
            onChange={handleMarketChange}
            value={form.marketId || ""}
            className="w-full px-3 py-2 rounded-md bg-dark-900 text-black"
          >
            <option value="">-- Select from Markets --</option>
            {allMarkets.map((bp) => (
              <option key={bp._id} value={bp._id}>
                {bp.name}
              </option>
            ))}
          </select>
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
