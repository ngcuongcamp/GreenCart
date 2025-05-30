import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProductPage = () => {
    const { productId } = useParams();

    const { products, navigate, currency, addToCart } = useAppContext();

    const product = products.find((item) => item._id === productId);


    const [relatedProducts, setRelatedProducts] = useState([]);
    // const [thumbnail, setThumbnail] = useState(product?.image[0]);

    const [thumbnail, setThumbnail] = useState(null);



    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => product.category === item.category && item._id !== productId && item.inStock);

            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products])


    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null)
    }, [product])


    if (!product) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-lg text-gray-500">Product not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl w-full mx-auto px-6 mt-20">
            <p className="text-sm text-gray-500 mb-2">
                <Link to={"/"} className="hover:underline cursor-pointer">Home</Link> /
                <Link to={"/products"} className="hover:underline cursor-pointer"> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline cursor-pointer"> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-12 mt-6">
                <div className="flex gap-4 flex-col-reverse">
                    <div className="flex  gap-4 flex-row">
                        {product.image.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(img)}
                                className={`border ${thumbnail === img ? 'border-primary' : 'border-gray-300'} rounded-md overflow-hidden cursor-pointer`}
                            >
                                <img src={product.image[index]} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-300 rounded-md overflow-hidden max-w-[400px]">
                        <img src={thumbnail} alt="Selected product" className="w-full h-auto object-cover" />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

                    <div className="flex items-center gap-1 mt-2">
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
                            <span className="text-sm text-gray-500 ml-1">({product.rating || 167 || "NA"})</span>
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-400 line-through text-sm">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-semibold text-primary">Now: {currency}{product.offerPrice}</p>
                        <span className="text-xs text-gray-500">(inclusive of all taxes)</span>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg font-medium text-gray-800 mb-2">About Product</p>
                        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                            {product.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button
                            onClick={() => {
                                addToCart(product._id);
                            }}
                            className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded transition cursor-pointer">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {
                                addToCart(product._id);
                                navigate('/cart');
                                scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full py-3 bg-primary text-white hover:bg-primary-dull font-medium rounded transition cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* relative product */}
            <div className="mt-26">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl md:text-3xl font-medium text-center">
                        Relative products
                    </p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2 text-center"></div>
                </div>
                <div className='grid grid-cols-2  gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5   mt-6 '>
                    {relatedProducts.filter((product) => product.inStock).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div className='mt-10 text-center'>
                    <Link
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        to="/products"
                        className="text-sm md:text-xl text-primary font-medium transition-colors duration-300 hover:text-primary-dull border px-3 py-1 rounded-sm cursor-pointer"
                    >
                        See more
                    </Link>

                </div>


            </div>
        </div>
    );
};

export default SingleProductPage;
