import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export const fetchUserData = createAsyncThunk("fetchuser" ,async(_, thunk) =>{
    try {
         const res = await axios.get(import.meta.env.VITE_DOMAIN + "/get-user-data", {withCredentials : true})
            return res.data.data

    } catch (error) {
        toast.error("Please Login First!")
        return thunk.rejectWithValue(error.response.data.error)
    }
 })
const UserSlice = createSlice({
    name :"user",
    initialState : {
        data : null,
        loading : true,
        error: null
    },
    reducers : {
        addCart : (state , action) =>{
           state.data.cart.push(action.payload)            
        },
        removeCart : (state, action) =>{
            const filterCart = state.data.cart.filter(item => item.product._id != action.payload)
            state.data.cart =  filterCart
        }

    },
    extraReducers : (builder) =>{
        builder
        .addCase(fetchUserData.pending , (state,action) =>{
            state.loading = true
        })
        .addCase(fetchUserData.fulfilled, (state, action) =>{
            state.loading = false
            state.data = action.payload
        })
        .addCase(fetchUserData.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default UserSlice.reducer
export const {addCart , removeCart} = UserSlice.actions