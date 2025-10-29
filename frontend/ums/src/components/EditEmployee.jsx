import React, { useState } from 'react'
import { Edit, X } from "lucide-react";
import axios from 'axios';
import { useParams } from 'react-router-dom';




const EditEmployee = () => {
    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        department: ""
    })
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");
        try {

            const response = await axios.patch(`http://localhost:4000/edituser/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
               
                setModal(false);
                window.location.reload();
            }
        } catch (error) {
            console.log("error while fetching..", error)
        }
    }


    return (
        <div>

            <Edit onClick={() => setModal(!modal)} size={30} className="p-2 rounded hover:bg-gray-100" />

            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Edit Employee
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 text-left">Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 text-left">Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 text-left">Position</label>
                                <input
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 text-left">Department</label>
                                <input
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>


                            <div className="flex justify-end mt-6 gap-3">
                                <button
                                    onClick={() => setModal(false)}
                                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
        </div>
    )
}

export default EditEmployee