import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isOpen]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

            {/* DARK BLUR BACKGROUND */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
                onClick={onClose}
            ></div>

            {/* MODAL CARD */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-[fadeIn_.25s_ease]">

                {/* TOP GREEN BAR */}
                <div className="h-1.5 bg-green-500 rounded-t-2xl"></div>

                <div className="p-8">

                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-black text-xl"
                    >
                        ✕
                    </button>

                    {/* LOGO */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold">
                            <span className="text-gray-900">CART</span>
                            <span className="text-green-600">NET</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Welcome back! Please enter your details
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Enter password"
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            />
                        </div>

                        {/* TERMS */}
                        <p className="text-xs text-gray-500 text-center">
                            By signing in you agree to our{" "}
                            <Link className="text-green-600 font-semibold">Terms</Link> &
                            <Link className="text-green-600 font-semibold"> Privacy</Link>
                        </p>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 
              rounded-xl shadow-lg shadow-green-500/30 transition"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* SIGNUP */}
                    <p className="text-center text-sm mt-5 text-gray-600">
                        Don't have an account?
                        <Link className="text-green-600 font-bold ml-1">Sign Up</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default LoginModal;
