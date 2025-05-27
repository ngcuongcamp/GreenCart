import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {

    console.log('desc: ', product)
    const [quantity, setQuantity] = React.useState(0)
    const { currency, addToCart, removeFromCard, cartItems } = useAppContext()



    const handleAdd = () => setQuantity(1)
    const handleIncrease = () => setQuantity(q => q + 1)
    const handleDecrease = () => {
        setQuantity(q => (q > 1 ? q - 1 : 0))
    }

    const rating = 4 // có thể nhận từ props sau này

    return (
        <div className="max-w-xs bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition">
            <img
                className="w-full h-54 object-cover"
                src={product?.image[0]}
                alt={product?.name}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product?.name}</h3>
                <p className="text-gray-500 text-sm mb-1">{product['description'][0]}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    {Array(5).fill("").map((_, i) => {
                        <img key={i} className='md:w-3.5 w-3' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="rating-icon" />
                    }
                    )}
                    <span className="text-sm text-gray-500 ml-1">({product?.rating || "NA"} )</span>
                </div>

                <div className="flex items-center justify-between">
                    <p className='flex gap-3'>
                        <span className="text-primary font-bold text-lg">{currency}${product?.offerPrice || "NA"} </span>

                        <span className="text-sub-text text-md line-through ">{currency}${product?.price || "NA"} </span>
                    </p>

                    {/* {!cartItems[product._id] ? (
                        <button
                            onClick={handleAdd}
                            className="px-4 py-1.5 bg-indigo-500 text-white text-sm rounded-full hover:bg-indigo-600 transition"
                        >
                            <img src={assets.cart_icon} alt="cart_icon" />
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleDecrease}
                                className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full text-lg hover:bg-gray-300 cursor-pointer"
                            >
                                −
                            </button>
                            <span className="text-sm font-medium">{cartItems[product._id]}</span>
                            <button
                                onClick={handleIncrease}
                                className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full text-lg hover:bg-gray-300 cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
