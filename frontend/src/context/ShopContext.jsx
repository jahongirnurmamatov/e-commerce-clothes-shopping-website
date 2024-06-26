import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = [];
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product]=useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    useEffect(()=>{
        const getallProducts = async ()=>{
            try {
                const res=await fetch('http://localhost:4000/api/products/getAllProducts');
                const data = await res.json();
                if(!data.success){
                    toast.error(data.error)
                }else{
                    setAll_Product(data.data)
                }
            } catch (error) {
                toast.error(error)
            }
        };
        getallProducts();
    },[])
    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems)
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = ()=>{
        let totalItem=0;
        for( const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { all_product, cartItems,addToCart, removeFromCart,getTotalCartAmount, getTotalCartItems };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
