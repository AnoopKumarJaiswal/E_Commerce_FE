import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const [loginData, setLogindata] = useState({userName : "", password : ""})
    const [showPassword , setShowPassword] = useState(false)
    const nav = useNavigate()

    function handleChange(e)
    {
        setLogindata({...loginData , [e.target.name] : e.target.value})
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      <div className="w-[90%] sm:w-[60%] md:w-[40%] bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Login Your Account
        </h1>

        <div className="w-full space-y-5">
          
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            placeholder="Username or Email"
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          
          <div className="relative">
            <input
                type={showPassword ? "text" : "password" }
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />

            <button
            className="absolute right-1 top-2"
            onClick={() => setShowPassword(!showPassword)}
            >{showPassword ? "🔒" : "🔓"}</button>
        </div>
          <button 
          onClick={() =>{
                 if(loginData.userName.length < 3 || loginData.userName.length > 10 )
                 {
                    toast.error("Please Enter Your Valid UserName")
                    return
                 }
                 if(!loginData.password)
                 {
                    toast.error("Please Enter Your Password")
                    return
                 }
-
                 axios.post(import.meta.env.VITE_DOMAIN + `/signin` , loginData, {withCredentials : true})
                 .then((res) =>{
                    console.log(res.data.userData)
                    toast.success("Login SuccessFully")
                    nav("/home")
                 })
                 .catch((res) =>{
                    toast.error(res.response.data.error)
                 })
            
          }}
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
            Sign In
          </button>

        </div>

      </div>
    </div>
  )
}

export default Signin
