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
    <div className="min-h-screen bg-slate-50 px-6 md:px-12 py-24">

      {/* HEADER */}
      <div className="flex flex-col items-center gap-6 mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
          Discover Premium Collection
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl text-center">
          Explore our curated list of top-tier products designed for your lifestyle.
        </p>

        <div className="flex flex-wrap gap-6 justify-center">

          {/* CATEGORY */}
          <div className="relative group z-50">
            <button
              onClick={() => setShowcategroy(!showCategroy)}
              className="px-8 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md text-slate-700 font-medium transition-all flex items-center gap-2 hover:border-indigo-500 hover:text-indigo-600"
            >
              {catagory && catagory !== "all category"
                ? catagory.toUpperCase()
                : "Category"}
              <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${showCategroy ? 'rotate-180' : ''}`}></i>
            </button>

            {showCategroy && (
              <div className="absolute mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-down">
                {["fashion", "grocery", "electronics", "all category"].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      setCatarory(item)
                      setShowcategroy(false)
                    }}
                    className="w-full px-6 py-3.5 text-left text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition border-b border-slate-50 last:border-none flex items-center justify-between group/item"
                  >
                    <span>{item === "all category" ? "All Products" : item.toUpperCase()}</span>
                    <i className="fa-solid fa-check opacity-0 group-hover/item:opacity-100 text-indigo-500 transition-opacity"></i>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRICE */}
          <div className="relative group z-50">
            <button
              onClick={() => setShowPrice(!showPrice)}
              className="px-8 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md text-slate-700 font-medium transition-all flex items-center gap-2 hover:border-indigo-500 hover:text-indigo-600"
            >
              {price ? `Up to ₹${price}` : "Price Range"}
              <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${showPrice ? 'rotate-180' : ''}`}></i>
            </button>

            {showPrice && (
              <div className="z-100 absolute mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border  border-slate-100 overflow-hidden animate-slide-down ">
                {[1000, 2000, 10000].map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      setPrice(p)
                      setShowPrice(false)
                    }}
                    className="w-full px-6 py-3.5 text-left text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition border-b border-slate-50 last:border-none group/item flex justify-between"
                  >
                    <span>Up to ₹{p}</span>
                    <i className="fa-solid fa-check opacity-0 group-hover/item:opacity-100 text-indigo-500 transition-opacity "></i>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setPrice(null)
                    setShowPrice(false)
                  }}
                  className="w-full px-6 py-3.5 text-left text-sm font-medium text-slate-600  hover:bg-indigo-50 hover:text-indigo-600 transition group/item"
                >
                  All Prices
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {userData.map((item, index) => (
          <div
            key={item._id}
            className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-slate-100 flex flex-col justify-between animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div>
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 right-4 bg-white/95 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full shadow-lg text-slate-800 tracking-wide uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h1 className="font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h1>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex justify-between items-end pt-2">
                  <span className="font-extrabold text-2xl text-slate-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-lg">
                    In Stock: {item.quantity}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4">
              {/* QUANTITY */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</span>
                <select
                  onChange={(e) => setQ(Number(e.target.value))}
                  className="bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value={0}>0</option>
                  {Array.from({ length: item.quantity }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-3">
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
                      toast.success("Added to Cart")
                    })
                  }}
                  className="col-span-1 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 font-medium text-sm flex items-center justify-center gap-2 group/btn"
                >
                  <i className="fa-solid fa-cart-shopping group-hover/btn:animate-bounce"></i> Add
                </button>

                <button className="col-span-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 font-medium text-sm">
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
