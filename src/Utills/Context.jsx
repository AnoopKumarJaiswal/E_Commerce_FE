import { Children, createContext, useContext, useState } from "react";

const ProductContext = createContext()

const ProductProvider = ({children}) =>{
    const [temp , setTemp] = useState([])
     const [q, setQ] = useState(0)
    return (
        <ProductContext.Provider value={{temp , setTemp, q , setQ}}>
            {children}
        </ProductContext.Provider>
    )
}


export default ProductProvider


export const UseMyContext = () =>{
    return useContext(ProductContext)
}