import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchUserData, removeCart } from "../Utills/Slice"

const Checkout = () => {
 
    const dispatch = useDispatch()
    const [userAddress , setUserAddress] = useState({
        name : "",
        number : "",
        address : "",
        city : "",
        state : "",
        pin  : ""
    })



    const [selectCOD, setSelectCOD] = useState(false)
    const data = useSelector(store => store.user)
    const nav = useNavigate()

    function handleChange(e) 
    {
        setUserAddress(prev => ({...prev , [e.target.name] : e.target.value}))
    }
    const totalPrice = data.data.cart.reduce((acc , curr) => {
        return acc + (curr.product.price*curr.quantity)
    }, 0)


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center mt-[10vh]">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={userAddress.name}
                name="name" 
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                value={userAddress.number}
                name="number"
                onChange={handleChange}
                type="number"
                placeholder="Phone Number"
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                value={userAddress.address}
                name = "address"
                onChange={handleChange}
                type="text"
                placeholder="Address Line 1"
                className="border rounded-xl px-4 py-2 col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
               value={userAddress.city}
               name = "city"
               onChange={handleChange}
                type="text"
                placeholder="City"
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                value={userAddress.state}
                name = "state"
                onChange={handleChange}
                type="text"
                placeholder="State"
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                value={userAddress.pin}
                name = "pin"
                onChange={handleChange}
                type="number"
                placeholder="Pincode"
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" />
                <span>Credit / Debit Card</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" />
                <span>UPI</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                onClick={() =>{
                    setSelectCOD(true)
                }}
                 type="radio" name="payment" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{data.data.cart.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ {totalPrice /100}</span>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="flex justify-between font-semibold text-gray-900 mb-6">
            <span>Total</span>
            <span>₹ {totalPrice + (totalPrice/100)}</span>
          </div>

          <button 
          onClick={() =>{
            if(userAddress.name.length < 2 || String(userAddress.number).length < 10 || userAddress.address.length < 4 ||userAddress.city.length < 3 || userAddress.state.length < 3 || String(userAddress.pin).length < 6)
            {
                 toast.error("Please fill all input feilds with valid Detials")
                 return
            }
            else if(!selectCOD)
            {
                toast.error("Ony Cash On Delivery Avilable")
                return
            }
             axios.post(import.meta.env.VITE_DOMAIN + "/orderhistory" , {} , {withCredentials : true})
             .then((res) =>{
              dispatch(fetchUserData())
              toast.success(res.data.data)
              
             })
            nav("/ordered")
          }}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95">
            Place Order
          </button>
        </div>

      </div>
    </div>
  )
}

export default Checkout
