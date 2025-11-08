export default function Button({ property }) {
    return (
        <>
           <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              {property}
            </button>
        </>
    )
}