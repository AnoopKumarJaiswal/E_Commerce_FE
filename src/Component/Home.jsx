import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Loader from "./Loder"
import { useDispatch } from "react-redux"
import { addCart } from "../Utills/Slice"
import toast from "react-hot-toast"

const Home = () => {
  const [userData, setUserData] = useState([])
  const [showCategroy, setShowcategroy] = useState(false)
  const [catagory, setCatarory] = useState()
  const [price, setPrice] = useState(null)
  const [showPrice, setShowPrice] = useState(false)

  const [postCount] = useState(4)
  const [pagNum, setPagNum] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const [q, setQ] = useState(0)
  const dis = useDispatch()
  const [cartAdd, setCardAdd] = useState(false)

  const loaderRef = useRef(null)

  useEffect(() => {
    if (!hasMore || loading) return
    setLoading(true)

    const url =
      !catagory || catagory === "all category"
        ? `${import.meta.env.VITE_DOMAIN}/products?postCount=${postCount}&pagNum=${pagNum}`
        : `${import.meta.env.VITE_DOMAIN}/products/filter/${catagory}?postCount=${postCount}&pagNum=${pagNum}`

    axios
      .get(url, { withCredentials: true })
      .then(res => {
        let data = res.data.data
        if (price) data = data.filter(item => item.price <= price)
        if (data.length === 0) setHasMore(false)
        else setUserData(prev => [...prev, ...data])
      })
      .finally(() => setLoading(false))
  }, [pagNum, catagory, price])

  useEffect(() => {
    setUserData([])
    setPagNum(1)
    setHasMore(true)
  }, [catagory, price])

  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPagNum(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-6 md:px-12 py-14">

      {/* HEADER */}
      <div className="flex flex-col items-center gap-8 mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
          Discover Products
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">

          {/* CATEGORY */}
          <div className="relative">
            <button
              onClick={() => setShowcategroy(!showCategroy)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              {catagory && catagory !== "all category"
                ? catagory.toUpperCase()
                : "Category"} ▼
            </button>

            {showCategroy && (
              <div className="absolute mt-3 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-20">
                {["fashion", "grocery", "electronics", "all category"].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      setCatarory(item)
                      setShowcategroy(false)
                    }}
                    className="w-full px-6 py-3 text-left text-sm hover:bg-indigo-50 transition"
                  >
                    {item === "all category" ? "All Products" : item.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRICE */}
          <div className="relative">
            <button
              onClick={() => setShowPrice(!showPrice)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              {price ? `Up to ₹${price}` : "Price"} ▼
            </button>

            {showPrice && (
              <div className="absolute mt-3 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-20">
                {[1000, 2000, 10000].map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      setPrice(p)
                      setShowPrice(false)
                    }}
                    className="w-full px-6 py-3 text-left text-sm hover:bg-indigo-50 transition"
                  >
                    Up to ₹{p}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setPrice(null)
                    setShowPrice(false)
                  }}
                  className="w-full px-6 py-3 text-left text-sm hover:bg-indigo-50 transition"
                >
                  All Price
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {userData.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all overflow-hidden hover:-translate-y-1 border border-slate-100"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs px-3 py-1 rounded-full shadow">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-4">
              <h1 className="font-semibold text-lg text-slate-800 truncate">
                {item.name}
              </h1>

              <p className="text-sm text-slate-500 line-clamp-2">
                {item.desc}
              </p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600 text-xl">
                  ₹ {item.price}
                </span>
                <span className="text-xs text-slate-500">
                  Stock: {item.quantity}
                </span>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2 border">
                <span className="text-sm text-slate-600">Quantity</span>
                <select
                  onChange={(e) => setQ(Number(e.target.value))}
                  className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                >
                  <option value={0}>Select</option>
                  {Array.from({ length: item.quantity }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    axios.patch(
                      import.meta.env.VITE_DOMAIN +
                        `/addproduct?id=${item._id}&q=${q}`,
                      {},
                      { withCredentials: true }
                    ).then(res => {
                      setQ(0)
                      dis(addCart(res.data.cart[res.data.cart.length - 1]))
                      setCardAdd(!cartAdd)
                      toast.success("Product Added")
                    })
                  }}
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition font-medium"
                >
                  Add to Cart
                </button>

                <button className="flex-1 border border-indigo-600 text-indigo-600 py-2.5 rounded-xl hover:bg-indigo-50 transition font-medium">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOADER */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-12">
          {loading && <Loader />}
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-slate-500 py-12">
          No More Products
        </p>
      )}
    </div>
  )
}

export default Home
