import { useAppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { assets, categories } from "../assets/assets"

const ProductsCategoryPage = () => {

    const { products } = useAppContext()
    const { categoryName } = useParams()

    const searchCategory = categories.find((item) => item.path.toLowerCase() === categoryName);

    const filteredProducts = products.filter((product) => product.category.toLowerCase() === categoryName);


    // console.log(filteredProducts)



    return (
        <div className="mt-16 flex flex-col">
            {searchCategory && (
                <div>
                    <div className="flex flex-col items-end w-max">
                        <p className="text-2xl font-medium uppercase tracking-wider">
                            {searchCategory.text.toUpperCase()}
                        </p>
                        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                    </div>

                    {filteredProducts.length > 0 &&
                        (<div className='grid grid-cols-2  gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 :grid-cols-5   mt-6'>
                            {filteredProducts.filter((product) => product.inStock).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>)
                    }
                </div>
            )}


            {/* no product filtered */}
            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600 space-y-4">
                    <img src={assets.leaf_icon} className="h-16 w-16 md:h-18 md:w-18" />
                    <p className="text-xl font-semibold tracking-wide">
                        No products found in this category
                    </p>
                    <p className="text-sm text-gray-500 max-w-sm">
                        This category currently has no available products or all items might be out of stock. Please check back later or browse other categories.
                    </p>
                    <a
                        href="/products"
                        className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dull transition"
                    >
                        Back to All Products
                    </a>
                </div>
            )}


        </div>
    )
}

export default ProductsCategoryPage