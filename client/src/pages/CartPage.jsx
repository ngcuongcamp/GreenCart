import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const CartPage = () => {

    const { currency, cartItems, getCartAmount, getCartCount, navigate, removeFromCart } = useAppContext();
    const [showAddress, setShowAddress] = useState(false);
    const [cartList, setCartList] = useState([])
    const [address, setAddress] = useState(dummyAddress)
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");


    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Running Shoes",
            description: ["Lightweight", "Breathable"],
            offerPrice: 250,
            price: 300,
            quantity: 1,
            size: 42,
            image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
            category: "Footwear",
        },
    ]);

    console.log(cartItems)

    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            product.quantity = cartItems[key];
            tempArray.push(product);
        }

        setCartList(tempArray);

    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }

        console.log(cartList)
    }, [products, cartItems])






    const total = products.reduce((acc, p) => acc + p.offerPrice * p.quantity, 0);
    const tax = +(total * 0.02).toFixed(2);
    const shipping = 0;
    const grandTotal = (total + tax + shipping).toFixed(2);

    const updateQuantity = (id, quantity) => {
        setProducts(prev =>
            prev.map(p => (p.id === id ? { ...p, quantity } : p))
        );
    };

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            {/* Left: Cart */}
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartAmount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p>Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {products.map((product) => (
                    <div key={product.id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 border border-gray-300 rounded overflow-hidden">
                                <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <div className="text-sm text-gray-500/70">
                                    <div className="flex items-center gap-1">
                                        <p>Qty:</p>
                                        <select
                                            className="outline-none"
                                            value={product.quantity}
                                            onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center">
                            {currency}{product.offerPrice * product.quantity}
                        </p>

                        <button className="mx-auto text-secondary hover:text-secondary-dull cursor-pointer">
                            Remove
                        </button>
                    </div>
                ))}

                <button className="group flex items-center mt-8 gap-4 text-primary font-medium hover:text-primary-dull group cursor-pointer "
                    onClick={() => {
                        navigate('/products');
                    }}
                >

                    <img className="translate-x-2 group-hover:translate-x-1 transition-all" src={assets.arrow_right_icon_colored} alt="back-icon" />
                    <span>
                        Continue Shopping
                    </span>
                </button>
            </div>

            {/* Right: Summary */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl font-medium">Order Summary</h2>
                <hr className="my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">No address found</p>
                        <button
                            onClick={() => setShowAddress(!showAddress)}
                            className="text-primary transition cursor-pointer hover:underline "
                        >
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                <p onClick={() => setShowAddress(false)} className="p-2 hover:bg-gray-100">New York, USA</p>
                                <p onClick={() => setShowAddress(false)} className="text-primary text-center p-2 hover:bg-indigo-100">Add address</p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-600 mt-4 space-y-2 text-sm">
                    <p className="flex justify-between"><span>Items Total</span><span>{currency}{total}</span></p>
                    <p className="flex justify-between"><span>Shipping Fee</span><span className="text-secondary-dull">Free</span></p>
                    <p className="flex justify-between"><span>Tax (2%)</span><span>{currency}{tax}</span></p>
                    <p className="flex justify-between text-base font-semibold mt-3">
                        <span>Total:</span><span>{currency}{grandTotal}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition cursor-pointer">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default CartPage;
