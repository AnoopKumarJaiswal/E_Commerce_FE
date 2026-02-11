import axios from "axios"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [formData, setFormdata] = useState({ firstName: "", lastName: "", userName: "", mobile: "", password: "", role: "", profilePicture: "" })
  const [tempIMg, setTempImg] = useState("")
  const [dummyImg, setDummyImg] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showBtn, setShowBtn] = useState(true)
  const ipref = useRef()
  const nav = useNavigate()
  function handleChange(e) {
    setFormdata({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (tempIMg) {
      let url = URL.createObjectURL(tempIMg)
      setDummyImg(url)
      setShowBtn(false)
      const imgUrl = new FormData()
      imgUrl.append("file", tempIMg)
      imgUrl.append("upload_preset", import.meta.env.VITE_PRESET)
      axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload`, imgUrl)
        .then((res) => {
          setFormdata({ ...formData, profilePicture: res.data.secure_url })
          setShowBtn(true)
        })
    }

  }, [tempIMg])




  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative py-10">

      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in z-10">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Join us to start your premium shopping experience
          </p>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex justify-center items-center">
          <div className="relative group cursor-pointer">
            <img
              className="rounded-full h-32 w-32 object-cover border-4 border-slate-700 group-hover:border-indigo-500 transition-all duration-300 shadow-xl"
              onClick={() => {
                ipref.current.click()
              }} src={dummyImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
            <div onClick={() => ipref.current.click()} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fa-solid fa-camera text-white text-2xl"></i>
            </div>
            <div className="absolute bottom-1 right-2 bg-indigo-600 rounded-full p-2 border-2 border-slate-900 shadow-lg">
              <i className="fa-solid fa-plus text-white text-xs"></i>
            </div>
          </div>
          <input ref={ipref} onChange={e => setTempImg(e.target.files[0])} type="file" className="hidden" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 ml-1 uppercase">First Name</label>
              <input
                onChange={handleChange}
                value={formData.firstName}
                id="firstName"
                name="firstName"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="John"
                type="text"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 ml-1 uppercase">Last Name</label>
              <input
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="Doe"
                type="text"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase">Username</label>
            <input
              value={formData.userName}
              onChange={handleChange}
              name="userName"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="johndoe123"
              type="text"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase">Mobile Number</label>
            <input
              value={formData.mobile}
              name="mobile"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="1234567890"
              type="text"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase">Password</label>
            <div className="relative" >
              <input
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-10"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-indigo-400 transition-colors">
                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase">Role</label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none transition-all cursor-pointer"
              >
                <option value="" className="bg-slate-800 text-slate-400">Select Role</option>
                <option value="buyer" className="bg-slate-800 text-slate-200">Buyer</option>
                <option value="seller" className="bg-slate-800 text-slate-200">Seller</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-4 text-slate-500 pointer-events-none"></i>
            </div>
          </div>

        </div>

        {/* Button */}
        {showBtn && <button
          onClick={() => {
            if (formData.firstName.length < 2 || formData.firstName.length > 10) {
              toast.error("First Name Sholud be 2 to 8 chaeracter")
              return
            }
            if (formData.lastName.length < 3 || formData.lastName.length > 10) {
              toast.error("Last Name Shoud be 3 to 10 chaeracter")
              return
            }

            if (formData.userName.length < 3 || formData.userName.length > 10) {
              toast.error("User Name Shoud be 3 to 10 chaeracter")
              return
            }
            if (!formData.mobile) {
              toast.error("Please Enter your Mobile number")
              return
            }
            if (!formData.password) {
              toast.error("Please Enter Password")
              return
            }
            if (!formData.role) {
              toast.error("Please Select Role")
              return
            }
            if (!formData.profilePicture) {
              toast.error("Please select your profile picture")
              return
            }


            axios.post(import.meta.env.VITE_DOMAIN + "/signup", formData)
              .then((res) => {
                toast.success("Account Created Successfully")
                nav("/signin")
              })
              .catch((error) => {
                toast.error(error.response.data.error)
              })
          }}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
          Sign Up
        </button>}

        {/* Footer */}
        <p className="text-center text-sm text-slate-400">
          Already have an account?
          <span
            onClick={() => nav("/signin")}
            className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300 hover:underline ml-1 transition-all">
            Login
          </span>
        </p>

      </div>
    </div>
  )

}
export default SignUp
