import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 px-6">
            <div className="text-center max-w-lg">
                <h1 className="text-8xl font-extrabold text-primary tracking-widest">404</h1>
                <p className="text-xl text-gray-700 mt-4 mb-6">Oops! Page not found.</p>
                <p className="text-gray-500 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>

                <Link
                    to="/"
                    className="inline-block px-6 py-2 bg-primary hover:bg-primary-dull text-white font-medium rounded-md transition"
                >
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
