import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getallProducts = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/products/getAllProducts');
                const data = await res.json();
                if (!data.success) {
                    toast.error(data.error)
                } else {
                    setAll_Product(data.data)
                }
            } catch (error) {
                toast.error(error)
            }
        };
        getallProducts();
    }, [])
    const addToCart = (item) => {
        console.log(item)
        const isItemInCart = cartItems.find((cartItem) => cartItem?._id === item._id); // check if the item is already in the cart
        console.log(cartItems)
        if (isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem // otherwise, return the cart item
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
        }


        if (localStorage.getItem('auth-token')) {
            const res = fetch('http://localhost:4000/api/products/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": item._id })
            });
            const data = res.json();
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
