import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { categories, assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const AddProductPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imagePreviews, setImagePreviews] = useState(
        {
            main: null,
            others: Array(4).fill(null)
        }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (data) => {
        setIsSubmitting(true);
        console.log('Form Data:', { ...data, images: { main: imagePreviews.main, others: imagePreviews.others.filter(Boolean) } });
        setTimeout(() => {
            setIsSubmitting(false);
            reset();
            setImagePreviews({ main: null, others: Array(4).fill(null) });
            toast.success("Product added successfully!")
        }, 1000);
    };

    const handleImageChange = (type, index, e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreviews((prev) => {
                if (type === 'main') {
                    return { ...prev, main: previewUrl };
                } else {
                    const newOthers = [...prev.others];
                    newOthers[index] = previewUrl;
                    return { ...prev, others: newOthers };
                }
            });
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-gray-50 px-4">

            <div className='w-full md:p-10 p-4 max-w-5xl pt-10'>
                <div className="flex flex-col items-start mb-8">
                    <h2 className="text-2xl font-semibold uppercase text-gray-800">Add Product</h2>
                    <div className="w-16 h-0.5 bg-primary mt-1 rounded-full"></div>
                </div>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:p-10 p-4 space-y-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg"
            >
                {/* Main Product Image */}
                <div>
                    <label className="text-base font-medium text-gray-700">Thumnail Product</label>
                    <div className="mt-2">
                        <label htmlFor="main-image">
                            <div className="w-full h-30 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-primary transition-colors">
                                {imagePreviews.main ? (
                                    <img
                                        src={imagePreviews.main}
                                        alt="Main Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <img
                                        src={assets.upload_area}
                                        alt="uploadArea"
                                        className="w-12 h-12 opacity-60 object-cover "
                                    />
                                )}
                            </div>
                            <input
                                accept="image/*"
                                type="file"
                                id="main-image"
                                hidden
                                onChange={(e) => handleImageChange('main', 0, e)}
                            />
                        </label>
                    </div>
                    {errors.mainImage && <p className="text-error text-sm mt-1">{errors.mainImage.message}</p>}
                </div>

                {/* Other Product Images */}
                <div>
                    <label className="text-base font-medium text-gray-700">Other Product Images</label>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <div key={index} className="relative">
                                <label htmlFor={`image${index}`}>
                                    <div className="w-24 h-24 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-primary transition-colors">
                                        {imagePreviews.others[index] ? (
                                            <img
                                                src={imagePreviews.others[index]}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <img
                                                src={assets.upload_area}
                                                alt="uploadArea"
                                                className="w-8 h-8 opacity-60 object-cover"
                                            />
                                        )}
                                    </div>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                        onChange={(e) => handleImageChange('others', index, e)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Name */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="product-name" className="text-base font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Enter product name"
                        className={`outline-none py-2.5 px-3 rounded-lg border ${errors.productName ? 'border-error' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-primary transition-all`}
                        {...register('productName', { required: 'Product name is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
                    />
                    {errors.productName && <p className="text-error text-sm mt-1">{errors.productName.message}</p>}
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="product-description" className="text-base font-medium text-gray-700">
                        Product Description
                    </label>
                    <textarea
                        id="product-description"
                        rows={4}
                        placeholder="Describe your product"
                        className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all"
                        {...register('description')}
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-base font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        className={`outline-none py-2.5 px-3 rounded-lg border ${errors.category ? 'border-error' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-primary transition-all`}
                        {...register('category', { required: 'Category is required' })}
                    >
                        <option value="">Select Category</option>
                        {/* {[{ name: 'Electronics' }, { name: 'Clothing' }, { name: 'Accessories' }].map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))} */}
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.text}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Price and Offer Price */}
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
                        <label htmlFor="product-price" className="text-base font-medium text-gray-700">
                            Product Price
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className={`outline-none py-2.5 px-3 rounded-lg border ${errors.productPrice ? 'border-error' : 'border-gray-300'} focus:ring-2 focus:ring-primary focus:border-primary transition-all`}
                            {...register('productPrice', {
                                required: 'Price is required',
                                min: { value: 0, message: 'Price cannot be negative' },
                            })}
                        />
                        {errors.productPrice && <p className="text-error text-sm mt-1">{errors.productPrice.message}</p>}
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
                        <label htmlFor="offer-price" className="text-base font-medium text-gray-700">
                            Offer Price
                        </label>
                        <input
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            {...register('offerPrice', { min: { value: 0, message: 'Offer price cannot be negative' } })}
                        />
                        {errors.offerPrice && <p className="text-error text-sm mt-1">{errors.offerPrice.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Adding...' : 'ADD PRODUCT'}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;