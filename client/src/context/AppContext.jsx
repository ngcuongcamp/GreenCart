import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from 'react-hot-toast';

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [isShowUserLogin, setIsShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})


    // Fetch all products (dummy data for now)
    // In a real application, this would be replaced with an API call
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }



    useEffect(() => {
        fetchProducts()
    }, [products])

    // Add Product to Cart 
    const addToCart = (itemId) => {
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

    // Delete Product from Cart
    const deleteFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            delete cartData[itemId]; // Xóa sản phẩm khỏi cart hoàn toàn
            toast.success("Item removed from cart!");
        }

        setCartItems(cartData);
    }

    // Update Cart Item Quantity 
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated!")
    }





    // Get cart item count 
    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }

        return totalCount;
    }


    // Get Cart Total Amount
    const getCartAmount = () => {

        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => String(product._id) === itemId);

            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100; // làm tròn 2 chữ số
    };


    // place order 
    const placeOrder = async () => {

    }

    const value = { navigate, user, setUser, isSeller, setIsSeller, isShowUserLogin, setIsShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, deleteFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, placeOrder }


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}