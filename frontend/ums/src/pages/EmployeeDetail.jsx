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
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-100 rounded ${className}`} />
);

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
        const response = await axios.get(`http://localhost:4000/employeedetail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
            aria-label="Go back"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* Container */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header area */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            {/* Profile compact card (left) */}
            <div className="flex items-center gap-5 w-full sm:w-auto">
              {loading ? (
                <Skeleton className="w-28 h-28 rounded-full" />
              ) : (
                <img
                  src={userData?.images?.secure_url || "https://via.placeholder.com/200x200?text=User"}
                  alt={userData?.name || "Employee avatar"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm"
                />
              )}

              <div className="min-w-0">
                {loading ? (
                  <>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-28" />
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-semibold text-slate-900 truncate">
                        {userData?.name || "Unnamed"}
                      </h1>
                      {/* Edit inline: keep your EditEmployee component */}
                      
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{userData?.position || "Position not set"}</p>
                  </>
                )}
              </div>
            </div>

            {/* Header actions & status (right) */}
            <div className="ml-auto flex items-center gap-3">
              {loading ? (
                <Skeleton className="h-8 w-20 rounded-full" />
              ) : (
                <span
                  className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
                    (userData?.status || "active").toLowerCase() === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  aria-live="polite"
                >
                  {(userData?.status || "Active").toString()}
                </span>
              )}

              <button
                className="inline-flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50"
                title="Edit"
                aria-label="Edit employee"
              >
                <EditEmployee />
              <h6>Edit</h6>
              </button>

              <button
                className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700"
                title="Delete"
                aria-label="Delete employee"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 px-6 sm:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column: large profile summary */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500">Profile</h2>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-3 w-full mb-2" />
                      <Skeleton className="h-3 w-7/12" />
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-800">
                        <User size={16} className="text-gray-400" />
                        <span className="font-medium">{userData?.name || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-800">
                        <Mail size={16} className="text-gray-400" />
                        <span>{userData?.email || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-800">
                        <Briefcase size={16} className="text-gray-400" />
                        <span>{userData?.position || "—"}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">About</h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {loading ? (
                      <>
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-11/12 mb-2" />
                        <Skeleton className="h-3 w-9/12" />
                      </>
                    ) : (
                      <p>
                        {userData?.about ||
                          "No additional information provided. You can update this via the edit button."}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle column: details */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold text-gray-500">Work details</h2>
                  <div className="bg-white border border-gray-100 rounded-lg p-4">
                    {loading ? (
                      <>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-10/12" />
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Building2 size={16} className="text-gray-400" />
                            <div>
                              <div className="text-sm text-gray-500">Department</div>
                              <div className="font-medium">{userData?.department || "—"}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Calendar size={16} className="text-gray-400" />
                            <div>
                              <div className="text-sm text-gray-500">Join Date</div>
                              <div className="font-medium">{formatDate(userData?.joinDate)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Briefcase size={16} className="text-gray-400" />
                            <div>
                              <div className="text-sm text-gray-500">Role / Team</div>
                              <div className="font-medium">{userData?.team || userData?.role || "—"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact & actions */}
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold text-gray-500">Contact</h2>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col gap-4">
                    {loading ? (
                      <>
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-full" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <Mail size={16} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div className="font-medium truncate">{userData?.email || "—"}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          <User size={16} className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Employee ID</div>
                            <div className="font-medium">{userData?._id || "—"}</div>
                          </div>
                        </div>

                     
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / meta */}
            <div className="mt-8 text-sm text-gray-500">
              <span>Last updated: </span>
              <span className="font-medium">{loading ? "—" : formatDate(userData?.updatedAt || userData?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
