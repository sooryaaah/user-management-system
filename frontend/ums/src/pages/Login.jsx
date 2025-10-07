import React from 'react'
import { LogIn, AtSign, Lock } from "lucide-react";
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div>
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
                {/* Login Card Container */}
                <div className="
                w-full max-w-sm sm:max-w-md 
                bg-white 
                p-8 md:p-10 
                rounded-2xl 
                shadow-2xl 
                border-t-4 border-indigo-500 
                transform transition duration-300 hover:shadow-indigo-500/50
            ">

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <LogIn className="w-10 h-10 mx-auto text-indigo-600 mb-3" />
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            User dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Sign in to manage your system users
                        </p>
                    </div>



                    {/* Login Form */}
                    <form>

                        {/* Email Input */}
                        <div className="mb-5 relative">
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                                Email Address
                            </label>
                            <AtSign className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                                required
                                placeholder="user@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400"

                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-8 relative">
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                                Password
                            </label>
                            <Lock className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400"

                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"

                            className="
                            w-full flex justify-center py-3 px-4 
                            border border-transparent rounded-xl 
                            text-base font-bold text-white 
                            bg-indigo-600 hover:bg-indigo-700 
                            shadow-lg shadow-indigo-500/50
                            focus:outline-none focus:ring-4 focus:ring-indigo-300 
                            transition duration-300 ease-in-out 
                            transform hover:scale-[1.01] active:scale-95 
                            disabled:opacity-60 disabled:cursor-not-allowed
                        "
                        >
                            Log in
                        </button>
                    </form>

                    {/* Footer Links */}
                   

                    <div className="mt-4 text-center text-xs text-gray-400">
                        Need a new account?
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out ml-1">
                            Register Here
                        </a>
                    </div>

                </div> {/* End of Login Card */}
            </div>
        </div>
    )
}

export default Login