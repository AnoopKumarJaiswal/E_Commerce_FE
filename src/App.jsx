import { useEffect, useState } from 'react'
import SignUp from './Component/SignUp'
import {Routes , Route} from "react-router-dom"
import  {Toaster}  from 'react-hot-toast'
import Signin from './Component/Signin'
import Home from './Component/Home'
import Navbar from './Component/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from './Utills/Slice'
import ProtectedRoutes from './Component/ProtectedRoutes'
import Profile from './Component/Profile'
import Cart from './Component/Cart'
import Checkout from './Component/CheckOut'
import Ordered from './Component/Ordered'
import ViewOrderHistory from './Component/ViewOrderHistory'
import SellerHome from './Component/SellerHome'
import AddProduct from './Component/AddProduct'
import ViewProductSellorWise from './Component/ViewProductUserWise'
import EditProduct from './Component/EditProduct'

function App() {
  const data = useSelector(store => store.user)

  return (
    <div>
      <Toaster />
      <Routes>

         <Route path='/signup' element = {<SignUp />} />
         <Route path='/signin' element = {<Signin />} />
         

          <Route  element = {<ProtectedRoutes />}>
            <Route  path='/' element =  {data?.data?.role == "seller" ? <SellerHome /> : <Home />}/>
            <Route path='/home' element = {data?.data?.role == "seller" ? <SellerHome /> : <Home />} />
            <Route path='/profile' element = {<Profile />} />
            <Route path='/cart'  element ={<Cart />}/>
            <Route path='/checkout' element = {<Checkout />}/>
            <Route path = "/ordered" element = {<Ordered />} />
            <Route path='/vieworderhistory' element = {<ViewOrderHistory />} />
            <Route path='/addproduct' element = {<AddProduct />} />
            <Route path='/view/product/seller' element = {<ViewProductSellorWise />} />
            <Route path='/edit/product/:id' element = {<EditProduct />} />
         </Route>
      </Routes>
    </div>
  )
}

export default App


// VITE_DOMAIN = https://e-commerce-be-epj4.onrender.com
