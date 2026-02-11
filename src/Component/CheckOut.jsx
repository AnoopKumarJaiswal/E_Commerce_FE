import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUserData, removeCart } from "../Utills/Slice"

const Checkout = () => {

  const dispatch = useDispatch()
  const [userAddress, setUserAddress] = useState({
    name: "",
    number: "",
    address: "",
    city: "",
    state: "",
    pin: ""
  })



  const [selectCOD, setSelectCOD] = useState(false)
  const data = useSelector(store => store.user)
  const nav = useNavigate()

  function handleChange(e) {
    setUserAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const totalPrice = data.data.cart.reduce((acc, curr) => {
    return acc + (curr.product.price * curr.quantity)
  }, 0)


  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-4 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <div className="w-full mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Checkout</h1>
          <p className="text-slate-500 text-sm">Complete your purchase</p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6 animate-slide-up">

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-indigo-500"></i> Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                  <input
                    value={userAddress.name}
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Phone Number</label>
                  <input
                    value={userAddress.number}
                    name="number"
                    onChange={handleChange}
                    type="number"
                    placeholder="9876543210"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Address Line</label>
                  <input
                    value={userAddress.address}
                    name="address"
                    onChange={handleChange}
                    type="text"
                    placeholder="Flat / House No / Street"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">City</label>
                  <input
                    value={userAddress.city}
                    name="city"
                    onChange={handleChange}
                    type="text"
                    placeholder="New York"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">State</label>
                  <input
                    value={userAddress.state}
                    name="state"
                    onChange={handleChange}
                    type="text"
                    placeholder="NY"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Pincode</label>
                  <input
                    value={userAddress.pin}
                    name="pin"
                    onChange={handleChange}
                    type="number"
                    placeholder="10001"
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-wallet text-indigo-500"></i> Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-4 cursor-pointer p-4 border rounded-xl hover:bg-slate-50 transition-colors group">
                  <input type="radio" name="payment" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">Credit / Debit Card</span>
                  <i className="fa-brands fa-cc-visa text-2xl text-slate-400 ml-auto"></i>
                </label>

                <label className="flex items-center gap-4 cursor-pointer p-4 border rounded-xl hover:bg-slate-50 transition-colors group">
                  <input type="radio" name="payment" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">UPI</span>
                </label>

                <label className="flex items-center gap-4 cursor-pointer p-4 border rounded-xl hover:bg-slate-50 transition-colors group">
                  <input
                    onClick={() => {
                      setSelectCOD(true)
                    }}
                    type="radio" name="payment" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">Cash on Delivery</span>
                  <i className="fa-solid fa-money-bill-wave text-green-500 ml-auto"></i>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 h-fit lg:sticky lg:top-28 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-slate-600 text-sm font-medium">
              <div className="flex justify-between">
                <span>Items ({data.data.cart.length})</span>
                <span>{data.data.cart.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-indigo-600">
                <span>Shipping cost (1%)</span>
                <span>₹ {totalPrice / 100}</span>
              </div>
            </div>

            <div className="h-px bg-slate-200 my-6"></div>

            <div className="flex justify-between items-end mb-8">
              <span className="font-bold text-slate-800">Total Payable</span>
              <span className="font-extrabold text-2xl text-indigo-600">₹ {totalPrice + (totalPrice / 100)}</span>
            </div>

            <button
              onClick={() => {
                if (userAddress.name.length < 2 || String(userAddress.number).length < 10 || userAddress.address.length < 4 || userAddress.city.length < 3 || userAddress.state.length < 3 || String(userAddress.pin).length < 6) {
                  toast.error("Please fill all input fields with valid details")
                  return
                }
                else if (!selectCOD) {
                  toast.error("Only Cash On Delivery Available")
                  return
                }
                axios.post(import.meta.env.VITE_DOMAIN + "/orderhistory", {}, { withCredentials: true })
                  .then((res) => {
                    dispatch(fetchUserData())
                    toast.success(res.data.data)

                  })
                nav("/ordered")
              }}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Confirm Order
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <i className="fa-solid fa-lock"></i> SSL Secured Payment
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout
