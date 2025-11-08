// src/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, formatRupiah }) {
  const navigate = useNavigate();

  return (
    <div
      className="product bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img
        src={
          product.imgUrl ||
          `https://placehold.co/600x400/CCCCCC/333333?text=${product.name}`
        }
        alt={product.name}
        className="w-full h-64 object-cover"
        onError={(e) =>
          (e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=${product.name}`)
        }
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Price:</span>{" "}
          <span className="text-green-700 font-bold">
            {formatRupiah(product.price)}
          </span>
        </p>

        <p className="text-gray-500 text-sm">
          <span className="font-semibold">Category:</span>{" "}
          {product.category?.name || "-"}
          <p className="text-gray-500 text-sm mb-1">
            <span className="font-semibold">Stock:</span> {product.stock || "-"}
          </p>
        </p>

        <div className="flex justify-start mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
            className="px-4 bg-gray-900 text-white py-1 rounded hover:bg-gray-700 transition"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
