import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { UseMyContext } from "../Utills/Context"

const Navbar = () => {
  const nav = useNavigate()
  const [search, setSearch] = useState("")
  const [foundProduct, setFoundProduct] = useState([])
  const data = useSelector(store => store.user)
  const { temp, setTemp } = UseMyContext()

 let  cartCount = 0
 for(let item of data.data.cart)
 {
      cartCount += item.quantity 
 }


  useEffect(() => {
    if (search.length === 0) {
      setFoundProduct([])
    }

    const Id = setTimeout(() => {
      if (search.length > 0) {
        axios
          .get(
            import.meta.env.VITE_DOMAIN + `/products/search?q=${search}`,
            { withCredentials: true }
          )
          .then((res) => {
            setFoundProduct(res.data.data)
          })
      }
    }, 3000)

    return () => clearTimeout(Id)
  }, [search])

  return (
    <nav className="fixed top-0 z-200 h-[80px] w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-2xl transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        {/* Logo */}
        <div
          onClick={() => nav("/home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKhpEvojtDfXKGUIXEhk_T5u9Ra-OBqCMCw&s"
            alt="logo"
            className="h-[45px] w-[45px] rounded-xl border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300 shadow-lg group-hover:shadow-indigo-500/20"
          />
          <span className="hidden md:block text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent group-hover:to-indigo-400 transition-all">
            ShopEase
          </span>
        </div>

        {/* Search */}
        <div className="relative w-[420px] hidden md:block group">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for premium products..."
            className="h-[45px] w-full rounded-full bg-slate-800/80 border border-slate-700 px-6 pr-12 text-sm text-slate-200 placeholder-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-800 transition-all duration-300"
          />

          <i className="fa-solid fa-magnifying-glass absolute right-5 top-[14px] text-slate-500 group-focus-within:text-indigo-400 transition-colors" />

          {search.length > 0 && (
            <div className="absolute top-[55px] w-full max-h-[350px] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-slide-down scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {foundProduct.length > 0 ? (
                foundProduct.map((item) => (
                  <p
                    key={item._id}
                    onClick={() => {
                      setTemp([item])
                      setFoundProduct([])
                      setSearch("")
                    }}
                    className="cursor-pointer px-5 py-4 text-sm text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-200 transition-colors border-b border-slate-800 last:border-none flex items-center gap-3"
                  >
                    <i className="fa-solid fa-arrow-right-long text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    {item.name}
                  </p>
                ))
              ) : (
                <p className="px-5 py-6 text-sm text-slate-500 text-center italic">
                  No matching products found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8">

          {/* Home */}
          {/* Home */}
          <button
            onClick={() => nav("/home")}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-all group"
          >
            <div className="p-2 rounded-full group-hover:bg-slate-800 transition-colors">
              <i className="fa-solid fa-house text-lg group-hover:scale-110 transition-transform" />
            </div>
            <span className="hidden sm:block group-hover:underline decoration-indigo-500 decoration-2 underline-offset-4">Home</span>
          </button>

          {/* Cart */}
          {/* Cart */}
         {data.data.role == "buyer" && <button
            onClick={() => nav("/cart")}
            className="relative flex flex-col items-center group"
          >
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold shadow-lg shadow-indigo-500/50 ring-2 ring-slate-900 animate-pulse">
              {cartCount || 0}
            </span>
            <div className="p-2 rounded-full group-hover:bg-slate-800 transition-colors">
              <i className="fa-solid fa-cart-shopping text-xl text-slate-300 group-hover:text-white transition-colors" />
            </div>
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-indigo-400 transition-colors -mt-1">Cart</span>
          </button>}

          {/* Profile */}
          {/* Profile */}
          <div
            onClick={() => nav("/profile")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={
                  data.data?.profilePicture ||
                  "data:image/png;base64,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"
                }
                alt="profile"
                className="h-[40px] w-[40px] rounded-full border-2 border-slate-700 group-hover:border-indigo-500 transition-all object-cover"
              />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></div>
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Profile</span>
          </div>

          {/* Logout */}
          {/* Logout */}
          <button
            onClick={() => {
              axios
                .post(
                  import.meta.env.VITE_DOMAIN + "/signout",
                  {},
                  { withCredentials: true }
                )
                .then(() => {
                  toast.success("Log Out")
                  nav("/signin")
                })
            }}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-red-400 transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
              <i className="fa-solid fa-power-off text-lg" />
            </div>
            <span className="hidden sm:block">Logout</span>
          </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
