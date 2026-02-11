import { useNavigate } from "react-router-dom"

const Ordered = () => {
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center animate-scale-in border border-slate-100">

        {/* Success Circle */}
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce shadow-lg shadow-green-200">
            <i className="fa-solid fa-check text-4xl text-green-600"></i>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Order Placed!
        </h1>

        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and will be delivered within
          <span className="font-bold text-slate-800"> 2 business days</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => (nav("/home"))}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 active:scale-[0.98]">
            Continue Shopping
          </button>

          <button
            onClick={() => (nav("/vieworderhistory"))}
            className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-50 hover:text-indigo-600 transition active:scale-[0.98]">
            View Order History
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ordered
