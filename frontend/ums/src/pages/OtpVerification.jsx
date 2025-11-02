import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        otp
      }
      console.log("Sending to backend:", { email, otp });


      const response = await axios.post('http://localhost:4000/otpverification', data);
      alert(response.data.message)
      navigate('/resetpassword', { state: { email } });

    } catch (error) {
      console.log("error in handleSUbmit:", error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
