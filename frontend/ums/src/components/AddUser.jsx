import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const AddUser = () => {

    const [employees, setEmployees] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        joinDate: ''

    });
    const [modal, setModal] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!employees.name || !employees.email) {
            alert("Please fill in both name and email");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.post('http://localhost:4000/adduser', employees, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('user added', response.data)
            setModal(false)
            window.location.reload();
            setEmployees({
                name: "", email: "", position: "",
                department: "",
                joinDate: ""
            });
        } catch (error) {
            console.log('error while fetching :', error.response?.data || error.message)
        }
    }


    return (
        <div>
            <span>
                <button
                    onClick={() => setModal(true)}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                >
                    + Add Employee
                </button>
            </span>
            {modal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg transform transition-transform duration-900 ease-in-out scale-100 opacity-100">
                        <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
                        <div className="space-y-3">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="name" onChange={(e) => setEmployees({ ...employees, [e.target.name]: e.target.value })} value={employees.name} placeholder='name' className="w-full px-3 py-2 border rounded" />
                                <input type="email" name="email" onChange={(e) => setEmployees({ ...employees, [e.target.name]: e.target.value })} value={employees.email} placeholder='email' className="w-full px-3 py-2 border rounded" />
                                <input type="text" onChange={(e) => setEmployees({ ...employees, [e.target.name]: e.target.value })} value={employees.position} placeholder='position' className="w-full px-3 py-2 border rounded" name='position' />
                                <input type="text" onChange={(e) => setEmployees({ ...employees, [e.target.name]: e.target.value })} value={employees.department} placeholder='department' className="w-full px-3 py-2 border rounded" name='department' />
                                <input type="date" onChange={(e) => setEmployees({ ...employees, [e.target.name]: e.target.value })} value={employees.joinData} placeholder='joining date' className="w-full px-3 py-2 border rounded" name='joinDate' />
                                <input type="file" />
                                {/* multipart */}
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        onClick={() => setModal(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button type='submit'

                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            )}



        </div>
    )
}

export default AddUser