import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Briefcase,
  Calendar,
  Building2,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditEmployee from "../components/EditEmployee";

const formatDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EmployeeDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/employeedetail/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (mounted) setUserData(response.data.data || {});
      } catch (error) {
        console.error("Error while fetching user:", error);
        if (mounted) setUserData({});
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUser();
    return () => (mounted = false);
  }, [id, token]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <img
              src={
                userData?.images?.secure_url ||
                "https://via.placeholder.com/150x150?text=User"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {loading ? "Loading..." : userData?.name || "Unnamed"}
              </h1>
              <p className="opacity-90 text-sm">
                {userData?.position || "Position not set"}
              </p>
              <p className="text-sm opacity-75">{userData?.email || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                (userData?.status || "Active").toLowerCase() === "active"
                  ? "bg-white text-indigo-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {userData?.status || "Active"}
            </span>

            <button className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-indigo-50 transition">
              <EditEmployee id={id} />
              <span>Edit</span>
            </button>

            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition">
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<User className="text-indigo-600" />}
            title="Name"
            value={userData?.name || "—"}
          />
          <StatCard
            icon={<Briefcase className="text-purple-600" />}
            title="Position"
            value={userData?.position || "—"}
          />
          <StatCard
            icon={<Building2 className="text-blue-600" />}
            title="Department"
            value={userData?.department || "—"}
          />
          <StatCard
            icon={<Calendar className="text-yellow-500" />}
            title="Join Date"
            value={formatDate(userData?.joinDate)}
          />
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: About */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {userData?.about ||
                "No additional information provided. Update via Edit."}
            </p>
          </div>

          {/* Middle: Work Info */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Work Details</h2>
            <div className="space-y-4 text-gray-700">
              <InfoRow icon={<Building2 />} label="Department" value={userData?.department} />
              <InfoRow icon={<Briefcase />} label="Role / Team" value={userData?.team || userData?.role} />
              <InfoRow icon={<Calendar />} label="Join Date" value={formatDate(userData?.joinDate)} />
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <div className="space-y-4 text-gray-700">
              <InfoRow icon={<Mail />} label="Email" value={userData?.email} />
              <InfoRow icon={<User />} label="Employee ID" value={userData?._id} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-sm text-gray-500">
          <span>Last updated: </span>
          <span className="font-medium">
            {formatDate(userData?.updatedAt || userData?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-xl">{icon}</div>
    <div>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-gray-400">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value || "—"}</div>
    </div>
  </div>
);

export default EmployeeDetail;
