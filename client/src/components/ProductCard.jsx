import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext()

    return product && (
        <div
            className=" max-w-xs bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary/40  hover:shadow-lg transition">

            <div className='px-2 cursor-pointer'
                onClick={() => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`,)
                    scrollTo({ top: 0, behavior: 'smooth' })
                }}
            >

                <div className='group cursor-pointer flex items-center justify-center '>

                    <img
                        className="group-hover:scale-105 transition max-w-26 md:max-w-36 cursor-pointer  duration-300 ease-in-out hover:scale-105"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>
                <h3 className="text-lg font-semibold select-none text-gray-800 h-6 line-clamp-2">{product.name}</h3>
                <p className="text-sub-text text-sm mb-1 h-10 line-clamp-2">{product['description'][0]}</p>

            </div>

            <div className="px-2 pb-2">

                <NavLink to={`/products?category=${product.category.toLowerCase()}`} className="text-white text-sm mb-1 flex bg-primary/80 py-0.5 ">
                    <span>#</span>
                    {product['category']}
                </NavLink>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    {Array(5).fill("").map((_, i) => {
                        return (
                            <img
                                key={i}
                                className='md:w-3.5 w-3 '
                                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                alt="rating-icon"
                            />
                        )
                    })}
                    {/* <span className="text-sm text-gray-500 ml-1">({product.rating || "NA"} )</span> */}
                    <span className="text-sm text-gray-500 ml-1">({product.rating || 167 || "NA"})</span>
                </div>

                <div className="flex items-center justify-between">
                    <p className='flex gap-1.5'>
                        <span className="md:text-xl text-base font-medium text-primary">{currency}{product.offerPrice || "NA"} </span>

                        <span className="text-sub-text  md:text-sm text-xs line-through">{currency}{product.price || "NA"} </span>
                    </p>

                    {!cartItems[product._id] ? (
                        <button
                            onClick={() => {
                                addToCart(product._id)
                            }}
                            className="flex gap-1 px-4 py-1.5 text-white text-sm  transition  bg-primary/20 border-1  cursor-pointer select-none md:w-[80px] w-[64px] justify-center rounded-md"
                        >
                            <img src={assets.cart_icon} alt="cart_icon" />
                            <span className='text-sm text-primary font-bold'>
                                Add
                            </span>
                        </button>
                    ) : (
                        <div className=" flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded-md">
                            <button
                                onClick={() => {
                                    removeFromCart(product._id)
                                }}
                                className="cursor-pointer text-md px-2 h-full text-primary"
                            >
                                −
                            </button>

                            <span className="w-5 text-center">{cartItems[product._id]}</span>

                            <button
                                onClick={() => {
                                    addToCart(product._id)
                                }}
                                className="cursor-pointer text-md px-2 h-full text-primary"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
