import React from 'react'
import { Edit } from "lucide-react";

const EditEmployee = () => {
    return (
        <div>
            <button className="p-2 rounded hover:bg-gray-100">
                <Edit size={18} />
            </button>
        </div>
    )
}

export default EditEmployee