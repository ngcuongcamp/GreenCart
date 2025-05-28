import { useAppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { categories } from "../assets/assets"

const ProductsCategoryPage = () => {

    const { products } = useAppContext()
    const { categoryName } = useParams()

    const searchCategory = categories.find((item) => item.path.toLowerCase() === categoryName);

    const filteredProducts = products.filter((product) => product.category.toLowerCase() === categoryName);


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

                    {filteredProducts.length > 0 ?
                        (<div className='grid grid-cols-2  gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 :grid-cols-5   mt-6'>
                            {filteredProducts.filter((product) => product.inStock).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>)
                        : (
                            <div className="flex items-center justify-center h-[60vh]">
                                <p>No products found in this category</p>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default ProductsCategoryPage