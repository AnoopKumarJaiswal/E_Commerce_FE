import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Signin = () => {
  const [loginData, setLogindata] = useState({ userName: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()

  function handleChange(e) {
    setLogindata({ ...loginData, [e.target.name]: e.target.value })
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">

      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-fade-in z-10">

        <div className="mb-8 flex flex-col items-center">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform hover:rotate-12 transition-transform duration-300">
            <i className="fa-solid fa-user text-2xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to continue to your account</p>
        </div>

        <div className="w-full space-y-5">

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase tracking-wider">Username</label>
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 pr-12"
              />

              <button
                className="absolute right-4 top-3.5 text-slate-500 hover:text-indigo-400 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (loginData.userName.length < 3 || loginData.userName.length > 10) {
                toast.error("Please Enter Your Valid UserName")
                return
              }
              if (!loginData.password) {
                toast.error("Please Enter Your Password")
                return
              }

              axios.post(import.meta.env.VITE_DOMAIN + `/signin`, loginData, { withCredentials: true })
                .then((res) => {
                  console.log(res.data.userData)
                  toast.success("Login SuccessFully")
                  nav("/home")
                })
                .catch((res) => {
                  toast.error(res.response.data.error)
                })

            }}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2">
            Sign In
          </button>

          <p className="text-center text-slate-400 text-sm mt-4">
            Don't have an account? <span onClick={() => nav("/signup")} className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300 hover:underline transition-all">Sign Up</span>
          </p>

        </div>

      </div>
    </div>
  )
}

export default Signin
