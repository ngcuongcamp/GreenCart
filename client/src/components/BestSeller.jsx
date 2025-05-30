import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const BestSeller = () => {

    const { products } = useAppContext();
    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-medium">
                Best Seller
            </p>
            <div className='grid  grid-cols-2  gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5   mt-6 '>
                {products.filter((product) => product.inStock).slice(0, 10).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            <div className='mt-10 text-center'>
                <Link
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    to="/products"
                    className="text-xl md:text-xl text-primary font-medium transition-colors duration-300 hover:text-secondary-dull"
                >
                    View All Products
                </Link>

            </div>


        </div>

    )
}

export default BestSeller