import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets"; import { IoTrashOutline } from "react-icons/io5";

const CartPage = () => {

    const { currency, cartItems, getCartAmount, getCartCount, navigate, products, deleteFromCart, placeOrder, updateCartItem } = useAppContext();
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress)
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");

    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {

            const product = products.find((item) => {
                return item._id === key;
            })
            product.quantity = cartItems[key]
            tempArray.push(product)
        }
        setCartArray(tempArray);
    }


    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems])


    return products.length > 0 && cartItems ? (
        (
            <div className="flex flex-col lg:flex-row mt-16 lg:gap-10">
                {/* Left: Cart */}
                <div className="flex-1 max-w-4xl">
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium mb-3 py-2 border-b border-primary/50">
                        <p>Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArray.map((product) => (
                        <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium mt-3 border-b border-primary/50 pb-3">
                            <div className="flex items-center gap-4 ">
                                <div
                                    onClick={() => {
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                                        scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="w-24 h-24 border border-gray-300 rounded overflow-hidden">
                                    <img className="w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <div className="text-sm text-gray-500/70">
                                        <p>Weight: <span>
                                            {product.weight || "N/A"}
                                        </span>
                                        </p>
                                        <div className="flex gap-4 sm:flex-row flex-col sm:items-center items-start">
                                            <p className="hidden sm:inline-block">Qty:</p>
                                            <div className="flex items-center gap-2 py-1">
                                                {/* Nút - */}
                                                <button
                                                    onClick={() => {
                                                        const newQty = product.quantity - 1;
                                                        if (newQty >= 1) updateCartItem(product._id, newQty);
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-lg cursor-pointer"
                                                >
                                                    −
                                                </button>

                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === "") {
                                                            updateCartItem(product._id, 0);
                                                            return;
                                                        }
                                                        const newQty = parseInt(value);
                                                        if (!isNaN(newQty) && newQty >= 0) {
                                                            updateCartItem(product._id, newQty);
                                                        }
                                                    }}
                                                    className="w-12 text-center border border-gray-300 rounded px-1 py-0.5"
                                                />

                                                {/* Nút + */}
                                                <button
                                                    onClick={() => {
                                                        const newQty = product.quantity + 1;
                                                        updateCartItem(product._id, newQty);
                                                    }}
                                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-lg cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center">
                                {currency}{product.offerPrice * product.quantity}
                            </p>

                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => deleteFromCart(product._id)}
                                    className=" text-secondary hover:text-secondary-dull cursor-pointer transform transition-transform duration-200 hover:scale-115 p-2 bg-primary/20 rounded-full p"
                                >
                                    <IoTrashOutline size={18} />
                                </button>

                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            navigate('/products');
                            scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group flex items-center mt-8 gap-4 text-primary font-medium hover:text-primary-dull group cursor-pointer mb-20"
                    >
                        <img className="translate-x-2 group-hover:translate-x-1 transition-all" src={assets.arrow_right_icon_colored} alt="back-icon" />
                        <span>
                            Continue Shopping
                        </span>
                    </button>
                </div>

                {/* Right: Summary */}
                {cartArray.length > 0 && (
                    <div className="lg:max-w-[360px] max-w-[460px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-primary/50">
                        <h2 className="text-xl font-medium">Order Summary</h2>
                        <hr className="my-5" />

                        <div className="mb-6">
                            <p className="text-sm font-medium uppercase">Delivery Address</p>
                            <div className="relative flex justify-between items-start mt-2">
                                <p className="text-gray-500 cursor-pointer">
                                    {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}
                                </p>
                                <button
                                    onClick={() => setShowAddress(!showAddress)}
                                    className="text-primary transition cursor-pointer hover:underline "
                                >
                                    Change
                                </button>
                                {showAddress && (
                                    <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                        {addresses.map((address, index) => {
                                            return (
                                                <p key={index}
                                                    onClick={() => {
                                                        setSelectedAddress(address);
                                                        setShowAddress(false)
                                                    }}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer">
                                                    {`${address.street}, ${address.city}, ${address.state} ${address.country}`}
                                                </p>
                                            )
                                        })}
                                        <p onClick={() => {
                                            navigate("/add-address")
                                            scrollTo({ top: 0, behavior: 'smooth' });
                                        }} className="text-primary text-center p-2 hover:bg-indigo-100 cursor-pointer"
                                        >Add address</p>
                                    </div>
                                )}
                            </div>

                            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                            <select
                                onChange={(e) => setPaymentOption(e.target.value)}
                                value={paymentOption}
                                className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                                <option value="COD">Cash On Delivery</option>
                                <option value="Online">Online Payment</option>
                            </select>
                        </div>

                        <hr className="border-gray-300" />

                        <div className="text-gray-600 mt-4 space-y-2 text-sm">
                            <p className="flex justify-between"><span>Items Total</span><span>{currency}{getCartAmount()}</span></p>
                            <p className="flex justify-between"><span>Shipping Fee</span><span className="text-secondary-dull">Free</span></p>
                            <p className="flex justify-between">
                                <span>Tax (2%)</span>
                                <span>{currency}{getCartAmount() * 2 / 100}</span>
                            </p>
                            <p className="flex justify-between text-base font-semibold mt-3">
                                <span>Total:</span><span>{currency} {getCartAmount() + getCartAmount() * 2 / 100}</span>
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                placeOrder();
                            }}
                            className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition cursor-pointer">
                            {paymentOption === "COD" ? "Place Order" : "Checkout"}
                        </button>
                    </div>
                )}
            </div>
        )
    ) : null
};

export default CartPage;
