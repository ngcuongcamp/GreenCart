import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProductListPage = () => {
    const { products, currency } = useAppContext();

    return (
        <div className="flex-1 pb-10 flex flex-col justify-between bg-gray-50 overflow-x-scroll">
            <div className="w-full pt-10  max-w-5xl px-4">

                <div className="flex flex-col items-start mb-8 px-10">
                    <h2 className="text-2xl font-semibold uppercase text-gray-800">All Products</h2>
                    <div className="w-16 h-0.5 bg-primary mt-1 rounded-full"></div>
                </div>
                <div className="w-full overflow-x-auto rounded-xl bg-white shadow-lg border border-gray-200">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 text-gray-700 text-sm text-left">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wide whitespace-nowrap">
                                    Product
                                </th>
                                <th className="px-6 py-4 font-semibold tracking-wide max-sm:hidden whitespace-nowrap">
                                    Category
                                </th>
                                <th className="px-6 py-4 font-semibold tracking-wide whitespace-nowrap max-[500px]:hidden">
                                    Selling Price
                                </th>
                                <th className="px-6 py-4 font-semibold tracking-wide whitespace-nowrap">
                                    In Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className={`border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200 animate-fadeIn ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <td className="px-6 py-4 flex items-center space-x-4 whitespace-nowrap">
                                        <div className="border border-gray-200 rounded-lg p-2 shadow-sm">
                                            <img
                                                src={product.image[0]}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </div>
                                        <span className="truncate font-medium text-gray-700">
                                            {product.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 max-sm:hidden whitespace-nowrap">
                                        <Link
                                            to={`/products/category/${product.category.toLowerCase()}`}
                                            className="text-white bg-primary hover:bg-primary-dull px-1 py-1.5 rounded-md cursor-pointer transition "
                                            onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
                                        >
                                            #{product.category}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap max-[500px]:hidden">
                                        {currency}
                                        {product.offerPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <label className="relative inline-flex items-center cursor-pointer gap-3">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                defaultChecked={product.inStock}
                                            />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-colors duration-300 ease-in-out flex items-center"></div>
                                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5 shadow-sm"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;