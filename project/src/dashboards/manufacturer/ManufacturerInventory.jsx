import React, { useEffect, useState } from "react";
import { Plus, X, Edit, Eye, Trash2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const ManufacturerInventory = () => {
  const { user, token, products, setProducts } = useAuth(); // ✅ use global products from context

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    images: [],
    price: 0,
    minOrderQty: 1,
    stock: 0,
    dynamicPricing: false,
    isExclusive: false,
    exclusiveRetailer: "",
    active: true,
  });

  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const resetForm = () =>
    setForm({
      name: "",
      sku: "",
      category: "",
      description: "",
      images: "",
      price: 0,
      minOrderQty: 1,
      stock: 0,
      dynamicPricing: false,
      isExclusive: false,
      exclusiveRetailer: "",
      active: true,
    });

  // Handle image upload
  const handleImageUpload = (e, target = "form") => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((imgs) => {
      if (target === "form") {
        setForm((f) => ({ ...f, images: [...f.images, ...imgs] }));
      } else {
        setSelected((p) => ({ ...p, images: [...p.images, ...imgs] }));
      }
    });
  };

  // Add product
  // Add product
const addProduct = async (e) => {
  e.preventDefault();

  if (!form.name.trim() || !form.sku.trim()) {
    return alert("Product name and SKU are required");
  }

  try {
    const fd = new FormData();
    fd.append("role", "Manufacturer");
    fd.append("sellerId", user?._id);
    fd.append("name", form.name);
    fd.append("sku", form.sku);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("price", Number(form.price));
    fd.append("minOrderQty", Number(form.minOrderQty) || 1);
    fd.append("stock", Number(form.stock));
    fd.append("dynamicPricing", form.dynamicPricing);
    fd.append("isExclusive", form.isExclusive);
    fd.append("exclusiveRetailer", form.exclusiveRetailer);
    fd.append("images", form.images); // 👈 must be File, not base64
    

    const response = await fetch("http://localhost:3000/api/products/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ don't set Content-Type, browser will set it with boundary
      },
      body: fd,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product");
    }

    setProducts((prev) => [data.product, ...prev]);
    resetForm();
    setCurrentPage(1);
    alert("✅ Product added successfully!");
  } catch (err) {
    console.error("Add product error:", err);
    alert(err.message);
  }
};


  // Edit
  const startEdit = (product) => {
    setSelected(product);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!selected.name.trim() || !selected.sku.trim())
      return alert("Product name and SKU are required");

    setProducts((p) => p.map((x) => (x._id === selected._id ? selected : x)));
    setIsEditing(false);
    setSelected(null);
  };

  // Delete
  const deleteProduct = (productId) => {
    if (!window.confirm("Delete this product? This action cannot be undone."))
      return;
    setProducts((p) => p.filter((x) => x._id !== productId));
    setSelected(null);
  };

  // Filters
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
  ];

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  return (
    <div className="space-y-8 px-3 md:px-0">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Manufacturer Inventory</h1>
        <p className="text-sm mt-2 opacity-90">
          Manage products, stock, and pricing all in one place.
        </p>
      </div>

      {/* Add product */}
      {/* Add product */}
<div className="bg-dark-800/60 border border-dark-700 rounded-2xl p-4 md:p-6 shadow-lg">
  <h2 className="font-semibold text-black mb-4 flex items-center gap-2">
    <Plus className="w-5 h-5 text-teal-400" /> Add New Product
  </h2>

  <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Product Name */}
    <div>
      <label className="text-light-300 text-sm mb-1 block">Product Name *</label>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="e.g., Premium Rice Bag"
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
        required
      />
    </div>

    {/* SKU */}
    <div>
      <label className="text-light-300 text-sm mb-1 block">SKU *</label>
      <input
        value={form.sku}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
        placeholder="e.g., RICE-25KG"
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
        required
      />
    </div>

    {/* Category */}
    <div>
      <label className="text-light-300 text-sm mb-1 block">Category</label>
      <input
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="e.g., Food / Beverages"
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
      />
    </div>

    {/* Price */}
    <div>
      <label className="text-light-300 text-sm mb-1 block">Price (INR) *</label>
      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        placeholder="e.g., 1200"
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
        required
      />
    </div>

    {/* Stock */}
    <div>
      <label className="text-light-300 text-sm mb-1 block">Stock *</label>
      <input
        type="number"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        placeholder="e.g., 500"
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
        required
      />
    </div>

    {/* Min Order Qty */}
    <div>
      <label className="text-light-300 text-sm mb-1 block">Minimum Order Qty</label>
      <input
        type="number"
        value={form.minOrderQty}
        onChange={(e) => setForm({ ...form, minOrderQty: Number(e.target.value) })}
        placeholder="e.g., 5"
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
      />
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <label className="text-light-300 text-sm mb-1 block">Description</label>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Enter a short description of the product..."
        className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
        rows={3}
      />
    </div>

    {/* Image Upload */}
    <div className="md:col-span-2">
      <label className="text-light-300 text-sm mb-1 block">Upload Product Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setForm({...form , images:e.target.files[0]})}
        className="block w-full text-sm text-light-400"
      />
    </div>

    {/* Dynamic Pricing */}
    <label className="flex items-center gap-2 text-light-300 md:col-span-2">
      <input
        type="checkbox"
        checked={form.dynamicPricing}
        onChange={(e) => setForm({ ...form, dynamicPricing: e.target.checked })}
        className="accent-teal-500"
      />
      Enable Dynamic Pricing
    </label>

    {/* Exclusive Retailer */}
    <label className="flex items-center gap-2 text-light-300 md:col-span-2">
      <input
        type="checkbox"
        checked={form.isExclusive}
        onChange={(e) => setForm({ ...form, isExclusive: e.target.checked })}
        className="accent-teal-500"
      />
      Exclusive to a Retailer
    </label>

    {form.isExclusive && (
      <div className="md:col-span-2">
        <label className="text-light-300 text-sm mb-1 block">Retailer ID</label>
        <input
          type="text"
          value={form.exclusiveRetailer}
          onChange={(e) => setForm({ ...form, exclusiveRetailer: e.target.value })}
          placeholder="Enter retailer ID"
          className="w-full bg-dark-700/50 text-black border border-dark-600 rounded-lg px-3 py-2"
        />
      </div>
    )}

    {/* Submit */}
    <button
      type="submit"
      className="md:col-span-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
    >
      Add Product
    </button>
  </form>
</div>


      {/* Products table */}
      <div className="bg-dark-800/60 border border-dark-700 rounded-2xl p-4 md:p-6">
        <h2 className="font-semibold text-black mb-4">Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-light-300">
            <thead>
              <tr className="border-b border-dark-600 text-light-400">
                <th className="py-2 px-3">Image</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Stock</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id} className="border-b border-dark-700">
                  <td className="py-2 px-3">
                    {p.images?.length > 0 ? (
                      <img
                        src={p.images}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-light-500">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-3 font-medium text-black">{p.name}</td>
                  <td className="py-2 px-3">{p.category}</td>
                  <td className="py-2 px-3">₹{p.price}</td>
                  <td className="py-2 px-3">{p.stock}</td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      onClick={() => setSelected(p)}
                      className="text-green-400 hover:text-green-300"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selected && !isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-dark-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-light-100 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-400" /> Product Details
            </h3>
            <div className="space-y-2 text-light-300">
              <p>
                <strong>Name:</strong> {selected.name}
              </p>
              <p>
                <strong>SKU:</strong> {selected.sku}
              </p>
              <p>
                <strong>Category:</strong> {selected.category}
              </p>
              <p>
                <strong>Stock:</strong> {selected.stock}
              </p>
              <p>
                <strong>Price:</strong> ₹{selected.price}
              </p>
              <p>
                <strong>Description:</strong> {selected.description}
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 rounded bg-dark-600 text-light-200"
              >
                <X size={16} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="px-3 py-1 rounded bg-teal-500 text-white"
              >
                <Edit size={16} /> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-dark-800 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-light-100 mb-3 flex items-center gap-2">
              <Edit className="w-5 h-5 text-emerald-400" /> Edit Product
            </h3>
            <div className="grid gap-3">
              <input
                type="text"
                value={selected.name}
                onChange={(e) =>
                  setSelected({ ...selected, name: e.target.value })
                }
                className="bg-dark-700 text-light-100 rounded px-3 py-2"
              />
              <input
                type="text"
                value={selected.sku}
                onChange={(e) =>
                  setSelected({ ...selected, sku: e.target.value })
                }
                className="bg-dark-700 text-light-100 rounded px-3 py-2"
              />
              <input
                type="text"
                value={selected.category}
                onChange={(e) =>
                  setSelected({ ...selected, category: e.target.value })
                }
                className="bg-dark-700 text-light-100 rounded px-3 py-2"
              />
              <textarea
                value={selected.description}
                onChange={(e) =>
                  setSelected({ ...selected, description: e.target.value })
                }
                className="bg-dark-700 text-light-100 rounded px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "selected")}
                className="text-sm text-light-400"
              />
              <div className="flex gap-2 flex-wrap">
                {selected.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={saveEdit}
                className="px-3 py-1 rounded bg-emerald-500 text-white"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelected(null);
                }}
                className="px-3 py-1 rounded bg-dark-600 text-light-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerInventory;
