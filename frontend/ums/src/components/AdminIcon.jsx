import React from 'react'
import { useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const AdminIcon = () => {
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false)

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className='relative'>
            
                <FaUserShield onClick={() => setPopup(!popup)} size={24} color="black" />
            
            {popup && (
                <div className='absolute'>
                    <div className="absolute right-2 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                        <button
                            onClick={logOut}
                            className="w-full text-center px-4 py-2 hover:bg-red-100 text-red-600 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )

            }
        </div>
    )
}

export default AdminIcon