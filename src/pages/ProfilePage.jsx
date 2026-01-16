import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { getAvatarUrl } from "../utils/avatarUtils";

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newProfilePic, setNewProfilePic] = useState("");
    const [updating, setUpdating] = useState(false);

    const handleEditClick = () => {
        setNewProfilePic(user.profilePic || "");
        setIsEditing(true);
    };

    const handleSave = async () => {
        setUpdating(true);
        try {
            const res = await api.put("/auth/profile", { profilePic: newProfilePic });
            updateUser(res.data.user);
            toast.success("Profile picture updated!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile picture");
        } finally {
            setUpdating(false);
        }
    };

    if (!user) return <div className="text-center p-10">Please log in to view profile.</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="flex-grow container mx-auto p-4 flex justify-center items-center">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">

                    {/* Header / Avatar Section */}
                    <div className="pt-10 pb-6 flex flex-col items-center relative">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                                <img
                                    src={getAvatarUrl(user)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={handleEditClick}
                                className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow hover:bg-yellow-500 transition text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold mt-4 text-gray-900">{user.fullName}</h2>
                        <div className="mt-1 text-center">
                            <span className="text-gray-500 text-sm">Account Status : </span>
                            <span className="text-gray-700 font-semibold text-sm">Awaiting Document Upload</span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="px-6 pb-8">
                        <div className="border rounded-2xl overflow-hidden shadow-sm">
                            {/* Phone */}
                            <div className="flex items-center justify-between p-4 border-b bg-white hover:bg-gray-50 transition">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </span>
                                    <span className="font-semibold text-gray-700">{user.phoneNumber}</span>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="flex items-center justify-between p-4 border-b bg-white hover:bg-gray-50 transition">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </span>
                                    <span className="font-semibold text-gray-700">{user.fullName}</span>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Update Profile Picture</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter a direct URL to an image. <br />
                            <span className="text-xs text-blue-500">Leaving it empty will use your default avatar.</span>
                        </p>

                        <input
                            type="text"
                            placeholder="https://example.com/my-photo.jpg"
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={newProfilePic}
                            onChange={(e) => setNewProfilePic(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition"
                                disabled={updating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow disabled:opacity-50 flex items-center gap-2"
                                disabled={updating}
                            >
                                {updating ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ProfilePage;
