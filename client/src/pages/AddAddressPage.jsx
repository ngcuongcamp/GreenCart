import React from 'react';
import { assets } from '../assets/assets';
import { useForm } from "react-hook-form";
import { useAppContext } from '../context/AppContext';

const AddAddressPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { navigate } = useAppContext();

    const onSubmit = (data) => {
        console.log("New address:", data);
        navigate("/cart");
    };

    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>
                Add Shipping
                <span className='font-semibold text-primary'> Address</span>
            </p>

            <div className="flex flex-col-reverse lg:flex-row justify-between mt-10 items-center gap-6">
                <div className='flex-1 max-w-[700px] min-w-[50%]'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">First Name</label>
                                <input
                                    {...register("firstName", { required: "First name is required" })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.firstName && <p className="text-secondary text-sm">{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-1">Last Name</label>
                                <input
                                    {...register("lastName", { required: "Last name is required" })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.lastName && <p className="text-secondary text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.email && <p className="text-secondary text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block mb-1">Street Address</label>
                            <input
                                {...register("street", { required: "Street is required" })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.street && <p className="text-secondary text-sm">{errors.street.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">City</label>
                                <input
                                    {...register("city", { required: "City is required" })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.city && <p className="text-secondary text-sm">{errors.city.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-1">State</label>
                                <input
                                    {...register("state")}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.state && <p className="text-secondary text-sm">{errors.state.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Zip Code</label>
                                <input
                                    {...register("zipcode", {
                                        required: "Zip code is required",
                                        pattern: {
                                            value: /^[0-9]{4,10}$/,
                                            message: "Invalid zip code"
                                        }
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.zipcode && <p className="text-secondary text-sm">{errors.zipcode.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-1">Country</label>
                                <input
                                    {...register("country", { required: "Country is required" })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {errors.country && <p className="text-secondary text-sm">{errors.country.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Phone</label>
                            <input
                                {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^[0-9]{10,11}$/,
                                        message: "Phone number is invalid"
                                    }
                                })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {errors.phone && <p className="text-secondary text-sm">{errors.phone.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-primary text-white py-3 rounded hover:bg-primary-dull transition"
                        >
                            Save Address
                        </button>
                    </form>
                </div>

                <img
                    src={assets.add_address_image}
                    alt="addr-img"
                    className="md:mr-16 mb-16 md:mt-0 max-w-[60%]"
                />
            </div>
        </div>
    );
};

export default AddAddressPage;
