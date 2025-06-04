import { Link } from "react-router-dom";
import { dummyOrders } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import toast from 'react-hot-toast';


const MyOrdersPage = () => {
    const { currency } = useAppContext();
    const [myOrders, setMyOrders] = useState([]);

    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders);
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    return (
        <div className="mt-16 pb-16 px-4">
            {/* Title */}
            <div className="flex flex-col items-start mb-8">
                <h2 className="text-2xl font-semibold uppercase text-gray-800">My Orders</h2>
                <div className="w-16 h-0.5 bg-primary mt-1 rounded-full"></div>
            </div>

            {/* Orders List */}
            <div className="flex flex-col gap-6">
                {myOrders.map((order, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white space-y-4 w-full max-w-5xl mx-auto"
                    >
                        {/* Order Header */}
                        <div className="flex flex-col md:flex-row md:justify-between text-gray-500 text-sm font-medium w-full max-w-4xl">
                            <span className="flex gap-1 items-center">
                                OrderId:
                                <span className="flex gap-1 items-center text-primary hover:text-primary-dull transition cursor-pointer"
                                    onClick={() => {
                                        navigator.clipboard.writeText(order._id);
                                        toast.success("Order ID copied to clipboard!");
                                    }}
                                >
                                    {order._id}
                                    <FaRegCopy size={18} />
                                </span>
                            </span>
                            <span className="flex gap-1 items-center">Payment: {order.paymentType}</span>
                            <span className="flex gap-1 items-center">Total Amount:
                                <span className="text-primary font-bold ml-1 text-xl">
                                    {currency}{order.amount}
                                </span>
                            </span>
                        </div>

                        {/* Order Items */}
                        {order.items.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                className={`relative bg-white text-gray-500/70 ${order.items.length !== itemIdx + 1 ? "border-b" : ""
                                    } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                            >
                                {/* Left: Image + Info */}
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <img
                                            src={item.product.image[0]}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.product.name}
                                        </h3>
                                        <Link
                                            to={`/products/category/${item.product.category.toLowerCase()}`}
                                            onClick={() => {
                                                scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="text-white text-sm mb-1 flex bg-primary/80 py-0.5 px-1 rounded-md mt-1">
                                            <span className="lg:block hidden lg:mr-1">
                                                Category:
                                            </span>
                                            <span>
                                                #{item.product.category}
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 ">
                                    <p className="text-sub-text"> Quantity:
                                        <span className="text-xl ml-2 text-primary font-bold">x {item.quantity || 1}</span>
                                    </p>
                                    <p className="text-sub-text" >
                                        Status:
                                        <span className="text-primary ml-1">
                                            {order.status}</span>
                                    </p>
                                    <p className="text-sub-text">Date:
                                        <span className="text-primary ml-1">
                                            {new Date(order.createAt).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>

                                {/* Right: Quantity, Status, Date, Amount */}
                                <div className="text-sm font-medium text-primary space-y-1 text-right min-w-[160px]">
                                    <p className="text-primary">
                                        Amount: {currency}
                                        {item.product.offerPrice * (item.quantity || 1)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrdersPage;
