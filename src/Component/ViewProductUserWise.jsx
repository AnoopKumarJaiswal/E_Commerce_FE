import { useNavigate } from "react-router-dom"
import EditProduct from "./EditProduct"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const ViewProductSellorWise = () => {
  const nav = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(import.meta.env.VITE_DOMAIN + "/products/adminwise", {
      withCredentials: true
    })
      .then((res) => {
        setData(res.data.data)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">My Products</h1>
        <p className="text-gray-500 mt-2">
          View and manage all products added by you
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {data.length > 0 && data.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
            >

              <img
                src={item.image}
                className="h-48 w-[500px] object-cover"
              />

              <div className="p-6">

                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 justify-between">
                    <span className="text-indigo-600 font-bold text-lg">
                      ₹ {item.price}
                    </span>
                  <div>
                    <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Qty: {item.quantity}
                    </span>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => {
                      <EditProduct />
                      nav("/edit/product/" + item._id)
                    }}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      axios.delete(import.meta.env.VITE_DOMAIN + `/product/delete/${item._id}`, {
                        withCredentials: true
                      })
                        .then(() => {
                          toast.success("Product Deleted")
                          nav("/home")
                        })
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ViewProductSellorWise
