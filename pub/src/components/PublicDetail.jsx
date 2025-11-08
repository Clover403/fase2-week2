import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `https://api.p2.gc01aio.foxhub.space/apis/pub/products/products/${id}`
        )
        setProduct(res.data.data)
        console.log(res);
        
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }
    

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p className="text-lg">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-20 px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full bg-gray-100 flex justify-center items-center">
          <img
            src={product.thumbnail || product.imgUrl}
            alt={product.name}
            className="object-cover w-full h-full md:h-[500px]"
          />
        </div>

        <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
            <p className="text-gray-500 mb-4">Category: {product.category.name}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-6">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6">

            <button onClick={() => navigate("/")} className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-all">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
