import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast, { Toaster } from 'react-hot-toast';

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY
    const navigate = useNavigate()
    const [user, setUser] = useState(true)
    const [isSeller, setIsSeller] = useState(false)
    const [isShowUserLogin, setIsShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})



    // Fetch all products (dummy data for now)
    // In a real application, this would be replaced with an API call
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }



    useEffect(() => {
        fetchProducts()
    }, [products])

    // Add Product to Cart 
    const addToCart = () => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Added to cart!")
    }

    // Update Cart Item Quantity 
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated!")
    }

    // Remove Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Remove item if quantity is 0
            }
        }

        toast.success("Removed from cart!")
        setCartItems(cartData);
    }





    const value = { navigate, user, setUser, isSeller, setIsSeller, isShowUserLogin, setIsShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart }


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}