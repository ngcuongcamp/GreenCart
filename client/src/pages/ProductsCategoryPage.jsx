import { useAppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const ProductsCategoryPage = () => {

    const { products } = useAppContext()
    const { categoryName } = useParams()

    const searchCategory = products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase())

    const filteredProducts = searchCategory.length > 0 ? searchCategory : products.filter(product => product.category.toLowerCase().includes(categoryName.toLowerCase()))


    console.log(categoryName)


    return (
        <div className="mt-16 flex flex-col">
            {searchCategory && (
                <div>
                    <div className="flex flex-col items-end w-max">
                        <p className="text-2xl font-medium uppercase tracking-wider">
                            {categoryName}
                        </p>
                        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                    </div>
                    <div className='grid grid-cols-2  gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 :grid-cols-5   mt-6'>
                        {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsCategoryPage