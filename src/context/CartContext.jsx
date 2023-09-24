import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({children}){
    const [cartShoe, setCartShoe] = useState(JSON.parse(localStorage.getItem("cartShoe")) || []);

    const value ={
        cartShoe,
        setCartShoe
    }

    useEffect(()=>{
        localStorage.setItem('cartShoe', JSON.stringify(cartShoe))

    },[cartShoe]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}