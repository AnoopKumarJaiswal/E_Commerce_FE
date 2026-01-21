import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { removeCart } from "../Utills/Slice"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const data = useSelector(store => store.user)
  const dis = useDispatch()
  const nav = useNavigate()

  const cartTotal = data.data.cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 p-6">


      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          Your Cart
        </h1>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">



        <div className="lg:col-span-2 space-y-6">
          {data.data.cart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition"
            >



              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover rounded-xl border"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹ {item.product.price} × {item.quantity}
                  </p>
                  <p className="font-medium text-gray-900 mt-1">
                    Total: ₹ {item.product.price * item.quantity}
                  </p>
                </div>
              </div>




              <button
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition active:scale-95"
                onClick={() => {
                  axios
                    .delete(
                      import.meta.env.VITE_DOMAIN +
                        `/removecart/${item.product._id}`,
                      { withCredentials: true }
                    )
                    .then(() => {
                      dis(removeCart(item.product._id))
                      toast.success("Item Removed from Cart Successfully!")
                    })
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>




        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Items</span>
            <span>{data.data.cart.length}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Total Amount</span>
            <span className="font-semibold text-gray-900">
              ₹ {cartTotal}
            </span>
          </div>

          <div className="h-px bg-gray-200 mb-4"></div>




          <button
            onClick={() => nav("/checkout")}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition active:scale-95"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cart
