import axios from "axios"
import { useEffect, useState } from "react"

const ViewOrderHistory = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(
      import.meta.env.VITE_DOMAIN + "/orderhistory/view",
      { withCredentials: true }
    )
    .then((res) => {
      setData(res.data.data)
    })
  }, [])

  // IST + 12-hour format
  const formatToIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          Your Orders
        </h1>
        <p className="text-gray-500 mt-1">
          Track everything you’ve purchased
        </p>
      </div>

      <div className="space-y-8 max-w-6xl mx-auto">
        {data && 
          (data.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6"
            >
              {/* Order Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">
                    Ordered on:
                  </span>{" "}
                  {formatToIST(item.createdAt)}
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                    ORDER PLACED
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{item.totalPrice}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {item.product.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="group relative bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="h-40 flex items-center justify-center overflow-hidden mb-4">
                        <img
                          src={item?.product?.image}
                          alt={item.product?.name}
                          className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Info */}
                      <h2 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
                        {item.product?.name}
                      </h2>

                      <p className="text-xs text-gray-500 text-center mt-1">
                        Quantity: {item.quantity}
                      </p>

                      {/* Order ID */}
                      <p className="text-[11px] text-gray-400 text-center mt-2 tracking-wider">
                        #ORD{item.product?._id.slice(0, 5)}
                        {
                          console.log(item.product?._id)
                        }
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }))}
      </div>
    </div>
  )
}

export default ViewOrderHistory
