import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppContext } from "../context/AppContext";

const AuthModal = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { setIsShowUserLogin, isShowUserLogin, user, setUser } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        setUser(data);
        setIsShowUserLogin(false); // Close modal after submit
    };

    if (!isShowUserLogin) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 relative max-h-[80vh] mx-4 ">
                {/* Close button */}
                <button
                    onClick={() => setIsShowUserLogin(false)}
                    className="cursor-pointer absolute top-2 right-2 text-2xl transition text-sub-text hover:text-primary"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                    {isLogin ? (
                        <div className="flex items-center justify-center gap-1 tracking-wider">
                            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                GreenCart
                            </span>
                            <span className="text-primary">Login</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-1 tracking-wider">
                            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                GreenCart
                            </span>
                            <span className="text-green-600">Register</span>
                        </div>
                    )}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {isLogin ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    className="w-full border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="example@email.com"
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
                                    className="w-full border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-primary pr-10 outline-none"
                                    placeholder="••••••••"
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-8.5 right-3 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={18} />
                                    ) : (
                                        <AiOutlineEye size={18} />
                                    )}
                                </span>
                                <div className="min-h-[20px] mt-1">
                                    {errors.password && (
                                        <p className="text-error text-sm">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("fullName", { required: "Full name is required" })}
                                        className="w-full border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Green Cart"
                                    />
                                    <div className="min-h-[20px] mt-1">
                                        {errors.fullName && (
                                            <p className="text-error text-sm">{errors.fullName.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        {...register("username", {
                                            required: "Username is required",
                                            pattern: {
                                                value: /^\S+$/,
                                                message: "Username must not contain spaces",
                                            },
                                        })}
                                        className="w-full border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="john_doe"
                                    />
                                    <div className="min-h-[20px] mt-1">
                                        {errors.username && (
                                            <p className="text-error text-sm">{errors.username.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="greencart@example.com"
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
                                    className="w-full border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-primary pr-10 outline-none"
                                    placeholder="••••••••"
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-8.5 right-3 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={18} />
                                    ) : (
                                        <AiOutlineEye size={18} />
                                    )}
                                </span>
                                <div className="min-h-[20px] mt-1">
                                    {errors.password && (
                                        <p className="text-error text-sm">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-dull text-white font-medium py-2 rounded-md transition tracking-widest cursor-pointer"
                    >
                        {isLogin ? "LOGIN" : "REGISTER"}
                    </button>
                </form>

                <p className="text-sm text-center mt-2">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="cursor-pointer text-primary font-semibold hover:underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;