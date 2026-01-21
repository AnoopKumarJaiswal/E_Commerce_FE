import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SellerHome = () => {
  const [totalProduct, setTotalProduct] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_DOMAIN + "/products/adminwise", {
        withCredentials: true
      })
      .then((res) => [
        setTotalProduct(res.data.data)
      ])
  }, [])

  return (
    <div className="max-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10">

      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Seller Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage products, orders & store performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-4xl font-bold text-indigo-600 mt-3">
            {totalProduct.length > 0 && totalProduct.reduce((acc, curr) => {
              return acc + curr.quantity
            }, 0)}
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
          <p className="text-sm text-gray-500">Total Item Types</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-3">
            {totalProduct.length}
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
          <p className="text-sm text-gray-500">Total Investment</p>
          <h2 className="text-4xl font-bold text-green-600 mt-3">
            ₹ {totalProduct.reduce((acc, curr) => {
              return acc + (curr.price * curr.quantity)
            }, 0)}
          </h2>
        </div>

      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Product Management
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div
            onClick={() => nav("/addproduct")}
            className="group rounded-2xl border border-gray-200 p-8 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-xl transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600">
              Add Product
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Create a new product for your store
            </p>
          </div>

          <div
            onClick={() => nav("/view/product/seller")}
            className="group rounded-2xl border border-gray-200 p-8 hover:bg-purple-50 hover:border-purple-300 hover:shadow-xl transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600">
              View All Products
            </h3>
           <p className="text-sm text-gray-500 mt-2">
  See all products with pagination — after inside this you can{" "}
  <span className="font-semibold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">
    Edit
  </span>{" "}
  or{" "}
  <span className="font-semibold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
    Delete
  </span>{" "}
  your products
</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SellerHome
