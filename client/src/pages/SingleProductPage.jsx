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
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products
                .slice()
                .filter(
                    (item) =>
                        product?.category === item.category &&
                        item._id !== productId &&
                        item.inStock
                );
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products, productId, product]);

    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null);
    }, [product]);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-lg text-gray-500 animate-fadeIn">Product not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl w-full mx-auto px-6 mt-20 mb-10">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-6 animate-fadeIn">
                <Link to="/" className="hover:underline hover:text-primary transition-colors duration-200">
                    Home
                </Link>{" "}
                /{" "}
                <Link to="/products" className="hover:underline hover:text-primary transition-colors duration-200">
                    Products
                </Link>{" "}
                /{" "}
                <Link
                    to={`/products/category/${product.category.toLowerCase()}`}
                    className="hover:underline hover:text-primary transition-colors duration-200"
                >
                    {product.category}
                </Link>{" "}
                /{" "}
                <span className="text-primary font-medium">{product.name}</span>
            </p>

            {/* Main Product Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-6 animate-fadeIn">
                {/* Image Gallery */}
                <div className="flex gap-4 flex-col-reverse">
                    <div className="flex gap-4 flex-row">
                        {product.image.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(img)}
                                className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${thumbnail === img ? "border-primary shadow-lg" : "border-gray-200"
                                    }`}
                            >
                                <img
                                    src={product.image[index]}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-[400px] transition-transform duration-300 hover:scale-[1.02]">
                        <img
                            src={thumbnail}
                            alt="Selected product"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg ">
                    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-3">
                        <div className="flex items-center gap-1">
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <img
                                        key={i}
                                        className="md:w-4 w-3.5"
                                        src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                        alt="rating-icon"
                                    />
                                ))}
                            <span className="text-sm text-gray-500 ml-2">
                                ({product.rating || 167 || "NA"})
                            </span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="mt-6">
                        <p className="text-gray-400 line-through text-sm">
                            MRP: {currency}
                            {product.price.toLocaleString()}
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            Now: {currency}
                            {product.offerPrice.toLocaleString()}
                        </p>
                        <span className="text-xs text-gray-500">
                            (inclusive of all taxes)
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <p className="text-lg font-medium text-gray-800 mb-2">
                            About Product
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                            {product.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center mt-10 gap-4">
                        <button
                            onClick={() => addToCart(product._id)}
                            className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-lg transition-all duration-300 transform hover:scale-101 cursor-pointer"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {
                                addToCart(product._id);
                                navigate("/cart");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="w-full py-3 bg-primary text-white hover:bg-primary-dull font-medium rounded-lg transition-all duration-300 transform hover:scale-101 cursor-pointer"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-20">
                <div className="flex flex-col justify-center items-center animate-fadeIn">
                    <p className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
                        Related Products
                    </p>
                    <div className="w-20 h-1 bg-primary rounded-full mt-3"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 mt-8">
                    {relatedProducts.map((product, index) => (
                        <div
                            key={product._id}
                            className="animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        to="/products"
                        className="inline-block text-sm md:text-lg text-primary font-medium transition-all duration-300 hover:text-primary-dull border border-primary px-4 py-2 rounded-lg hover:bg-primary/10"
                    >
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;