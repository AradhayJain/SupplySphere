import React, { useEffect, useState } from "react";
import { Plus, X, Edit, Eye, Trash2 } from "lucide-react";

const STORAGE_KEY = "supply_sphere_manufacturer_products";

const defaultProducts = [
  {
    id: "PR-1001",
    name: "Wheat Flour 25kg",
    sku: "WF-25",
    category: "Grains",
    stock: 120,
    price: 1200,
    active: true,
    createdAt: "2025-08-01",
  },
  {
    id: "PR-1002",
    name: "Rice 50kg",
    sku: "RC-50",
    category: "Grains",
    stock: 80,
    price: 2400,
    active: true,
    createdAt: "2025-08-05",
  },
  {
    id: "PR-1003",
    name: "Olive Oil 5L",
    sku: "OO-5",
    category: "Oils",
    stock: 40,
    price: 1800,
    active: true,
    createdAt: "2025-08-10",
  },
];

const ManufacturerInventory = () => {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultProducts;
    } catch (e) {
      return defaultProducts;
    }
  });

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    stock: 0,
    price: 0,
    active: true,
  });
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // search / filter / pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const resetForm = () =>
    setForm({ name: "", sku: "", category: "", stock: 0, price: 0, active: true });

  // Add product
  const addProduct = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim())
      return alert("Product name and SKU are required");

    const id = `PR-${Math.floor(Math.random() * 9000) + 1000}`;
    const createdAt = new Date().toISOString().split("T")[0];
    const newProd = { id, ...form, createdAt };
    setProducts((p) => [newProd, ...p]);
    resetForm();
    setCurrentPage(1);
  };

  // Edit
  const startEdit = (product) => {
    setSelected(product);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!selected.name.trim() || !selected.sku.trim())
      return alert("Product name and SKU are required");
    setProducts((p) => p.map((x) => (x.id === selected.id ? selected : x)));
    setIsEditing(false);
    setSelected(null);
  };

  // Delete
  const deleteProduct = (productId) => {
    if (!window.confirm("Delete this product? This action cannot be undone."))
      return;
    setProducts((p) => p.filter((x) => x.id !== productId));
    setSelected(null);
  };

  // Stock adjust
  const adjustStock = (productId, delta) => {
    setProducts((p) =>
      p.map((x) =>
        x.id === productId
          ? { ...x, stock: Math.max(0, x.stock + delta) }
          : x
      )
    );
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
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Manufacturer Inventory</h1>
        <p className="text-sm mt-2 opacity-90">
          Manage products, stock, and pricing all in one place.
        </p>
      </div>

      {/* Add product */}
      <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <h2 className="font-semibold text-light-100 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-teal-400" /> Add New Product
        </h2>
        <form
          onSubmit={addProduct}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          {[
            { name: "name", placeholder: "Product name", type: "text" },
            { name: "sku", placeholder: "SKU", type: "text" },
            { name: "category", placeholder: "Category", type: "text" },
            { name: "stock", placeholder: "Stock", type: "number" },
            { name: "price", placeholder: "Price (INR)", type: "number" },
          ].map((f, i) => (
            <input
              key={f.name}
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={(e) =>
                setForm({ ...form, [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value })
              }
              placeholder={f.placeholder}
              className={`bg-dark-700/50 text-light-100 border border-dark-600 rounded-lg px-3 py-2 placeholder-light-500 focus:ring-2 focus:ring-teal-500 ${
                f.name === "price" ? "md:col-span-2" : ""
              }`}
              required={i < 2}
            />
          ))}
          <label className="flex items-center gap-2 text-light-300">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="accent-teal-500"
            />
            Active
          </label>
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name or SKU"
          className="bg-dark-700/50 text-light-100 border border-dark-600 rounded-lg px-3 py-2 placeholder-light-500 focus:ring-2 focus:ring-teal-500 w-full md:w-1/3"
        />
        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-dark-700/50 text-light-100 border border-dark-600 rounded-lg px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === "stock-low")
                setProducts((p) => [...p].sort((a, b) => a.stock - b.stock));
              if (val === "stock-high")
                setProducts((p) => [...p].sort((a, b) => b.stock - a.stock));
              if (val === "recent")
                setProducts((p) =>
                  [...p].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                );
            }}
            className="bg-dark-700/50 text-light-100 border border-dark-600 rounded-lg px-3 py-2"
          >
            <option value="">Sort</option>
            <option value="stock-low">Stock: Low → High</option>
            <option value="stock-high">Stock: High → Low</option>
            <option value="recent">Newest</option>
          </select>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-dark-800/60 border border-dark-700 backdrop-blur-lg rounded-2xl shadow-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-dark-700 text-light-300">
              <tr>
                <th className="px-3 py-2 text-left">SKU</th>
                <th className="px-3 py-2 text-left">Product</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-right">Stock</th>
                <th className="px-3 py-2 text-right">Price</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-dark-700 hover:bg-dark-700/40 text-light-200"
                >
                  <td className="px-3 py-2">{p.sku}</td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.category}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => adjustStock(p.id, -1)}
                        className="px-2 py-1 bg-dark-700 text-light-200 rounded-lg hover:bg-dark-600"
                      >
                        -
                      </button>
                      <span className="w-12 text-right">{p.stock}</span>
                      <button
                        onClick={() => adjustStock(p.id, 1)}
                        className="px-2 py-1 bg-dark-700 text-light-200 rounded-lg hover:bg-dark-600"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right">
                    ₹ {p.price.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelected(p)}
                        className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-light-200 rounded-lg flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button
                        onClick={() => startEdit(p)}
                        className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-light-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((s) => Math.max(1, s - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-dark-700 text-light-200 rounded-lg disabled:opacity-50 hover:bg-dark-600"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                  : "bg-dark-700 text-light-200 hover:bg-dark-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((s) => Math.min(totalPages, s + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-dark-700 text-light-200 rounded-lg disabled:opacity-50 hover:bg-dark-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      {selected && !isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-dark-800/90 border border-dark-700 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-semibold text-light-100 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-400" /> Product Details
            </h3>
            <div className="space-y-2 text-light-300">
              <p>
                <strong className="text-light-100">SKU:</strong> {selected.sku}
              </p>
              <p>
                <strong className="text-light-100">Name:</strong> {selected.name}
              </p>
              <p>
                <strong className="text-light-100">Category:</strong>{" "}
                {selected.category}
              </p>
              <p>
                <strong className="text-light-100">Stock:</strong>{" "}
                {selected.stock}
              </p>
              <p>
                <strong className="text-light-100">Price:</strong> ₹{" "}
                {selected.price.toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-light-200 rounded-lg flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Close
              </button>
              <button
                onClick={() => {
                  setSelected(null);
                  startEdit(selected);
                }}
                className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg flex items-center gap-1"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-dark-800/90 border border-dark-700 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-semibold text-light-100 mb-3 flex items-center gap-2">
              <Edit className="w-5 h-5 text-emerald-400" /> Edit Product
            </h3>
            <div className="space-y-3">
              {["name", "sku", "category", "stock", "price"].map((field) => (
                <input
                  key={field}
                  type={["stock", "price"].includes(field) ? "number" : "text"}
                  value={selected[field]}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      [field]: ["stock", "price"].includes(field)
                        ? Number(e.target.value)
                        : e.target.value,
                    })
                  }
                  className="bg-dark-700/50 text-light-100 border border-dark-600 rounded-lg px-3 py-2 placeholder-light-500 focus:ring-2 focus:ring-teal-500 w-full"
                />
              ))}
              <div className="flex justify-between mt-4">
                <button
                  onClick={saveEdit}
                  className="px-3 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 bg-dark-700 hover:bg-dark-600 text-light-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerInventory;
