import { useNavigate } from "react-router-dom"

const Ordered = () => {
    const nav = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-8 text-center">

        {/* Success Circle */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-4xl font-bold">✓</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You for Shopping!
        </h1>

        <p className="text-gray-600 text-base mb-6">
          Your order has been placed successfully and will be delivered within
          <span className="font-semibold text-gray-800"> 2 days</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
          onClick={() => (nav("/home"))}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95">
            Continue Shopping
          </button>

          <button 
          onClick={() => (nav("/vieworderhistory"))}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition active:scale-95">
            View Order Summary
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ordered
