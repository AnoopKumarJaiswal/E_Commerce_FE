import axios from "axios"
import { useEffect, useRef, useState } from "react"
import  toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const SignUp = () =>
  { 
   const [formData, setFormdata] = useState({firstName : "", lastName: "", userName : "", mobile : "", password :"" , role : "",profilePicture: ""})
  const [tempIMg, setTempImg] = useState("")
  const [dummyImg , setDummyImg] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showBtn, setShowBtn] = useState(true)
  const ipref = useRef()
  const nav = useNavigate()
   function handleChange(e)
   {
    setFormdata({...formData , [e.target.name] : e.target.value})
   }

   useEffect(() =>{
     if(tempIMg)
    {
     let url =   URL.createObjectURL(tempIMg)
     setDummyImg(url)
     setShowBtn(false)
     const imgUrl = new FormData()
     imgUrl.append("file", tempIMg)
     imgUrl.append("upload_preset", import.meta.env.VITE_PRESET)
     axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload` , imgUrl)
     .then((res) =>{
      setFormdata( {...formData, profilePicture : res.data.secure_url})
      setShowBtn(true)
     })
    }
     
   }, [tempIMg])


 

   return (
    <div className="max-h-screen max-w-screen flex justify-center items-center bg-gray-100">
      
      <div className="w-[420px] bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Join us to start shopping
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-10">
          <input
             onChange={handleChange}
             value={formData.firstName}
             id="firstName"
             name="firstName"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
            type="text"
          />

          <input
          value={formData.lastName}
           onChange={handleChange}
            name = "lastName"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
            type="text"
          />

          <input
            value={formData.userName}
            onChange={handleChange}
            name = "userName"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            type="text"
          />

          <input
            value={formData.mobile}
            name = "mobile"
            onChange={handleChange}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mobile Number"
            type="text"
          />
          <div className="flex relative" >

          <input
           value={formData.password}
           name="password"
           onChange={handleChange}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100%] "
            placeholder="Password"
            type={showPassword ? "text" : "password"}
          />
          <button onClick={() =>{
            setShowPassword(!showPassword)
          }} className="absolute right-1 top-1">{showPassword ? "🔒" : "🔓"}</button>
         </div>
          <select
          name="role"
           value={formData.value}
           onChange={handleChange}
            className="border rounded-md px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option >Please select your role</option>
            <option>buyer</option>
            <option>seller</option>
          </select>


          <div className="flex justify-center items-center">
            <div >
             <img
             className="rounded-full h-[150px] w-[150px]" 
             onClick={() =>{
                ipref.current.click()
             }} src={dummyImg || "data:image/png;base64,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"}/>
            </div>
            <input ref={ipref} onChange={e => setTempImg(e.target.files[0])} type="file" className="hidden" />
          </div>
        
        
        </div>

        {/* Button */}
      { showBtn && <button 
        onClick={() =>{
               if(formData.firstName.length < 2 || formData.firstName.length > 10)
               {
                toast.error("First Name Sholud be 2 to 8 chaeracter")
                return
               }
               if(formData.lastName.length < 3 || formData.lastName.length > 10)
               {
                toast.error("Last Name Shoud be 3 to 10 chaeracter")
                return
               }

               if(formData.userName.length < 3 || formData.userName.length > 10)
               {
                toast.error("User Name Shoud be 3 to 10 chaeracter")
                return
               }
               if(!formData.mobile)
               {
                toast.error("Please Enter your Mobile number")
                return
               }
               if(!formData.password)
               {
                toast.error("Please Enter Password")
                return
               }
               if(!formData.role)
               {
                toast.error("Please Select Role")
                return
               }
               if(!formData.profilePicture)
               {
                toast.error("Please select your profile picture")
                return
               }


                 axios.post(import.meta.env.VITE_DOMAIN + "/signup", formData)
                .then((res) =>{
                  toast.success("Account Created Successfully")
                  nav("/signin")
                })
                .catch((error) =>{
                  toast.error(error.response.data.error)
                })
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition">
          Sign Up
        </button>}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?
          <span 
          onClick={() => nav("/signin")}
          className="text-blue-600 cursor-pointer hover:underline ml-1">
            Login
          </span>
        </p>

      </div>
    </div>
  )

}
export default SignUp
