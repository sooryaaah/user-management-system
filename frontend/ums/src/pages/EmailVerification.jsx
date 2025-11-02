import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";


const EmailVerification = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userdata = {
                email
            }
            const response = await axios.post('http://localhost:4000/emailVerification', userdata);
            alert(response.data.message);
            navigate('/otpverification', { state: { email } })
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
            alert(msg);
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Verify Email</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
                >
                    Send OTP
                </button>
            </form>
        </div>
    );
};

export default EmailVerification;
