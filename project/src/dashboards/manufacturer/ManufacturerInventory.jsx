import React, { useEffect, useState } from "react";

// Manufacturer Inventory — production-ready features:
// - CRUD: Add / Edit / Delete products
// - Stock adjustments
// - Search, category filter
// - Pagination
// - LocalStorage persistence

const STORAGE_KEY = "supply_sphere_manufacturer_products";

const defaultProducts = [
  { id: "PR-1001", name: "Wheat Flour 25kg", sku: "WF-25", category: "Grains", stock: 120, price: 1200, active: true, createdAt: "2025-08-01" },
  { id: "PR-1002", name: "Rice 50kg", sku: "RC-50", category: "Grains", stock: 80, price: 2400, active: true, createdAt: "2025-08-05" },
  { id: "PR-1003", name: "Olive Oil 5L", sku: "OO-5", category: "Oils", stock: 40, price: 1800, active: true, createdAt: "2025-08-10" },
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

  const [form, setForm] = useState({ name: "", sku: "", category: "", stock: 0, price: 0, active: true });
  const [selected, setSelected] = useState(null); // product selected for view/edit
  const [isEditing, setIsEditing] = useState(false);

  // search / filter / pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const resetForm = () => setForm({ name: "", sku: "", category: "", stock: 0, price: 0, active: true });

  // --- Add product ---
  const addProduct = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim()) return alert("Product name and SKU are required");

    const id = `PR-${Math.floor(Math.random() * 9000) + 1000}`;
    const createdAt = new Date().toISOString().split("T")[0];
    const newProd = { id, ...form, createdAt };
    setProducts((p) => [newProd, ...p]);
    resetForm();
    setCurrentPage(1);
  };

  // --- Edit product ---
  const startEdit = (product) => {
    setSelected(product);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!selected.name.trim() || !selected.sku.trim()) return alert("Product name and SKU are required");
    setProducts((p) => p.map((x) => (x.id === selected.id ? selected : x)));
    setIsEditing(false);
    setSelected(null);
  };

  // --- Delete product ---
  const deleteProduct = (productId) => {
    if (!window.confirm("Delete this product? This action cannot be undone.")) return;
    setProducts((p) => p.filter((x) => x.id !== productId));
    setSelected(null);
  };

  // --- Stock adjustments ---
  const adjustStock = (productId, delta) => {
    setProducts((p) => p.map((x) => (x.id === productId ? { ...x, stock: Math.max(0, x.stock + delta) } : x)));
  };

  // --- Filtering & search ---
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category))).filter(Boolean)];

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // --- Pagination ---
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="text-sm text-gray-500">Total products: <strong>{products.length}</strong></div>
      </div>

      {/* Add product form */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-semibold mb-3">Add New Product</h2>
        <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="border rounded px-3 py-2" required />
          <input name="sku" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="SKU" className="border rounded px-3 py-2" required />
          <input name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="border rounded px-3 py-2" />
          <input name="stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} placeholder="Stock" className="border rounded px-3 py-2" />
          <input name="price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price (INR)" className="border rounded px-3 py-2 md:col-span-2" />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="w-full bg-red-500 text-white px-4 py-2 rounded">Add Product</button>
          </div>
        </form>
      </div>

      {/* Search / Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} placeholder="Search by name or SKU" className="border rounded px-3 py-2 w-full md:w-1/3" />
        <div className="flex items-center gap-3">
          <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }} className="border rounded px-3 py-2">
            {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select onChange={(e) => {
            const val = e.target.value;
            if (val === "stock-low") setProducts((p) => [...p].sort((a,b) => a.stock - b.stock));
            if (val === "stock-high") setProducts((p) => [...p].sort((a,b) => b.stock - a.stock));
            if (val === "recent") setProducts((p) => [...p].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
          }} className="border rounded px-3 py-2">
            <option value="">Sort</option>
            <option value="stock-low">Stock: Low → High</option>
            <option value="stock-high">Stock: High → Low</option>
            <option value="recent">Newest</option>
          </select>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
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
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{p.sku}</td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.category}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => adjustStock(p.id, -1)} className="px-2 py-1 border rounded">-</button>
                      <span className="w-12 text-right">{p.stock}</span>
                      <button onClick={() => adjustStock(p.id, 1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right">₹ {p.price.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelected(p)} className="px-3 py-1 bg-gray-100 rounded">View</button>
                      <button onClick={() => startEdit(p)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                      <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button onClick={() => setCurrentPage((s) => Math.max(1, s - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-red-500 text-white' : ''}`}>{i + 1}</button>
          ))}
          <button onClick={() => setCurrentPage((s) => Math.min(totalPages, s + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <p><strong>SKU:</strong> {selected.sku}</p>
            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Category:</strong> {selected.category}</p>
            <p><strong>Stock:</strong> {selected.stock}</p>
            <p><strong>Price:</strong> ₹ {selected.price.toLocaleString()}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => setSelected(null)} className="px-3 py-1 bg-gray-200 rounded">Close</button>
              <button onClick={() => { setSelected(null); startEdit(selected); }} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Drawer/Modal */}
      {isEditing && selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-3">Edit Product</h3>
            <div className="space-y-3">
              <input value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} className="border rounded px-3 py-2 w-full" />
              <input value={selected.sku} onChange={(e) => setSelected({ ...selected, sku: e.target.value })} className="border rounded px-3 py-2 w-full" />
              <input value={selected.category} onChange={(e) => setSelected({ ...selected, category: e.target.value })} className="border rounded px-3 py-2 w-full" />
              <input type="number" value={selected.stock} onChange={(e) => setSelected({ ...selected, stock: Number(e.target.value) })} className="border rounded px-3 py-2 w-full" />
              <input type="number" value={selected.price} onChange={(e) => setSelected({ ...selected, price: Number(e.target.value) })} className="border rounded px-3 py-2 w-full" />
              <div className="flex justify-between">
                <button onClick={() => { saveEdit(); }} className="px-3 py-2 bg-green-500 text-white rounded">Save</button>
                <button onClick={() => { setIsEditing(false); setSelected(null); }} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerInventory;
