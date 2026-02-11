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
    <div className="min-h-screen w-full bg-slate-50 pt-28 px-4 md:px-12 pb-10">

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <i className="fa-solid fa-bag-shopping text-2xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Your Cart
            </h1>
            <p className="text-slate-500 text-sm">Review your selected items</p>
          </div>
        </div>

        {data.data.cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="bg-slate-100 p-8 rounded-full mb-6">
              <i className="fa-solid fa-cart-arrow-down text-6xl text-slate-300"></i>
            </div>
            <h2 className="text-2xl font-semibold text-slate-700">Your cart is empty</h2>
            <p className="text-slate-500 mt-2 mb-8">Looks like you haven't added anything yet.</p>
            <button onClick={() => nav('/home')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-6">
              {data.data.cart.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center hover:shadow-xl transition-all duration-300 border border-slate-100 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >

                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="relative h-28 w-28 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium bg-slate-100 inline-block px-2 py-0.5 rounded-lg">
                        {item.product.category}
                      </p>
                      <div className="text-sm text-slate-500 mt-1">
                        <span className="font-semibold text-slate-700">₹{item.product.price}</span>
                        <span className="mx-2">×</span>
                        <span className="font-semibold text-slate-700">{item.quantity}</span>
                      </div>
                      <p className="text-indigo-600 font-bold text-lg mt-1">
                        ₹ {item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    className="mt-4 sm:mt-0 bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-red-200 group/btn"
                    onClick={() => {
                      axios
                        .delete(
                          import.meta.env.VITE_DOMAIN +
                          `/removecart/${item.product._id}`,
                          { withCredentials: true }
                        )
                        .then(() => {
                          dis(removeCart(item.product._id))
                          toast.success("Item Removed Successfully")
                        })
                    }}
                  >
                    <i className="fa-solid fa-trash-can text-lg group-hover/btn:animate-bounce"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-28 border border-white/20 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500">
                  <span>Items ({data.data.cart.length})</span>
                  <span className="font-medium text-slate-700">₹ {cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax</span>
                  <span className="font-medium text-slate-700">₹ 0</span>
                </div>
                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-800 font-bold text-lg">Total Amount</span>
                  <span className="font-extrabold text-2xl text-indigo-600">
                    ₹ {cartTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={() => nav("/checkout")}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold tracking-wide hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Proceed to Checkout <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                Secure Checkout - 100% Protected
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
