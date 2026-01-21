import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Loader from "./Loder"
import { fetchUserData } from "../Utills/Slice"
import { useEffect } from "react"

const ProtectedRoutes = () =>{
    const nav = useNavigate()
    const userData =  useSelector(store => store.user)
     const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchUserData())
        nav("/home")
    },[]) 

    if(userData.loading)
    {
        return <Loader />
    }
    


    return userData.data ?
       <>
    <Navbar />
    <div className="mt-10">
       <Outlet />
    </div>
    </> : < Navigate  to={"/signin"}/> 
}


export default ProtectedRoutes