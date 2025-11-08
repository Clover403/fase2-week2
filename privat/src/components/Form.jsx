import { useState, useEffect } from "react";

export default function ProductForm({
  initialData = {},
  categories = [],
  onSubmit,
  loading = false,
  isEditMode = false,
  useFileUpload = false, // Prop untuk kontrol file upload
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
    ...initialData, // Merge dengan data awal
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.imgUrl || "");

  // Update form ketika initialData berubah (untuk edit mode)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        imgUrl: initialData.imgUrl || "",
        categoryId: initialData.categoryId || "",
      });
      setImagePreview(initialData.imgUrl || "");
    }
  }, [initialData]);

  // Handle input biasa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Update preview jika input adalah imgUrl
    if (name === "imgUrl") {
      setImagePreview(value);
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validasi tipe file
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        alert("Format file harus JPG, PNG, GIF, atau WebP!");
        e.target.value = "";
        return;
      }

      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB!");
        e.target.value = "";
        return;
      }

      // Simpan file
      setImageFile(file);

      // Buat preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        alert("Gagal membaca file!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kirim data ke parent component
    onSubmit({
      formData,
      imageFile,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h2>

        {/* Preview Gambar */}
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="2"
            placeholder="Write product description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
          />
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
          />
        </div>

        {/* Image Upload atau Image URL */}
        <div>
          <label
            htmlFor={useFileUpload ? "imageFile" : "imgUrl"}
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Product Image
          </label>
          
          {useFileUpload ? (
            // File Upload (untuk Edit)
            <>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max 2MB, format: JPG, PNG, GIF, WebP
              </p>
            </>
          ) : (
            // Text Input URL (untuk Add)
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imgUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 transition"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gray-900 text-white py-2 rounded-lg font-medium transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Submitting..."
            : isEditMode
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
      </div>
    </div>
  );
}