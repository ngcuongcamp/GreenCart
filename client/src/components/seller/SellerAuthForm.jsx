import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";

const SellerAuthModal = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const {
        isSeller,
        setIsSeller,
        setUser,
    } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Seller submitted:", data);
        setUser(data); // hoặc setSeller(data)
        setIsSeller(false);
    };


    return !isSeller && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
            <div className="bg-white border-1 border-gray-300 rounded-lg shadow-xl w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={() => setIsSeller(false)}
                    className="cursor-pointer absolute top-3 right-4 text-3xl transition text-sub-text hover:text-primary"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    <div className="flex items-center justify-center gap-1 tracking-wider">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GreenCart</span>
                        <span className="text-primary">{isLogin ? "Seller Login" : "Seller Register"}</span>
                    </div>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Seller Name
                            </label>
                            <input
                                type="text"
                                {...register("sellerName", { required: !isLogin })}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-dull outline-none"
                                placeholder="Your Shop or Brand"
                            />
                            <div className="min-h-[20px] mt-1">
                                {errors.sellerName && (
                                    <p className="text-error text-sm">Seller name is required</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Business Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-dull outline-none"
                            placeholder="business@example.com"
                        />
                        <div className="min-h-[20px] mt-1">
                            {errors.email && (
                                <p className="text-error text-sm">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-primary-dull pr-10 outline-none"
                            placeholder="••••••••"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-9 right-3 cursor-pointer text-sub-text"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible size={20} />
                            ) : (
                                <AiOutlineEye size={20} />
                            )}
                        </span>
                        <div className="min-h-[20px] mt-1">
                            {errors.password && (
                                <p className="text-error text-sm">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dull text-white font-medium py-2 rounded-md transition tracking-widest cursor-pointer"
                        onClick={() => setIsSeller(true)}
                    >
                        {isLogin ? "LOGIN" : "REGISTER"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    {isLogin ? "Don't have a seller account?" : "Already have a seller account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="cursor-pointer text-primary font-semibold hover:underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    )
};

export default SellerAuthModal;
