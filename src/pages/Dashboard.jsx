import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('rentals'); // 'listings' or 'rentals'
    const [listings, setListings] = useState([]);
    const [activeRentals, setActiveRentals] = useState([]);
    const [history, setHistory] = useState([]);
    const [incomingBookings, setIncomingBookings] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false); // Toggle for soft-deleted listings

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            if (activeTab === 'listings') {
                const res = await api.get('/vehicles/my-listings');
                setListings(res.data);
                const bookRes = await api.get('/rentals/incoming');
                setIncomingBookings(bookRes.data);
            } else {
                const currentRes = await api.get('/rentals/current');
                setActiveRentals(currentRes.data);
                const historyRes = await api.get('/rentals/history');
                setHistory(historyRes.data);
            }
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Failed to load dashboard data");
            // Clear state on error to prevent stale data
            setListings([]);
            setActiveRentals([]);
            setHistory([]);
            setIncomingBookings([]);
        }
    };

    const handleReturn = async (rentalId) => {
        try {
            await api.put(`/rentals/${rentalId}/return`);
            toast.success("Vehicle returned successfully!");
            fetchData(); // Refresh
        } catch (error) {
            toast.error("Failed to return vehicle");
        }
    };

    const handleDelete = async (vehicleId) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await api.delete(`/vehicles/${vehicleId}`);
            toast.success("Vehicle deleted successfully");
            fetchData();
        } catch (error) {
            toast.error("Failed to delete vehicle");
        }
    };

    const handleRelist = async (vehicleId) => {
        if (!window.confirm("Are you sure you want to relist this vehicle?")) return;
        try {
            await api.put(`/vehicles/${vehicleId}`, { isDeleted: false, isAvailable: true });
            toast.success("Vehicle relisted successfully!");
            fetchData();
        } catch (error) {
            toast.error("Failed to relist vehicle");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            {/* Header / Welcome Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 py-10">
                    <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, {user?.fullName?.split(' ')[0]} 👋</h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage your trips, vehicles, and account details here.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 flex-grow">
                {/* Custom Tab Switcher */}
                <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-xl w-fit mb-10">
                    <button
                        className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'rentals'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('rentals')}
                    >
                        My Rentals
                    </button>
                    <button
                        className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'listings'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('listings')}
                    >
                        My Listings (Owner)
                    </button>
                </div>

                {activeTab === 'rentals' ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Active Rentals Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Active Rentals</h2>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">{activeRentals.length} Active</span>
                            </div>

                            {activeRentals.length === 0 ? (
                                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                                    <div className="text-6xl mb-4">🚗</div>
                                    <h3 className="text-xl font-semibold text-gray-900">No active rentals</h3>
                                    <p className="text-gray-500 mt-1">You aren't renting any vehicles right now.</p>
                                    <Link to="/filter" className="mt-6 inline-block bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
                                        Browse Vehicles
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {activeRentals.map(rental => (
                                        <div key={rental._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col">
                                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                                <img
                                                    src={rental.vehicleId.images?.[0] || "https://via.placeholder.com/400x250"}
                                                    alt={rental.vehicleId.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                                                    Active
                                                </div>
                                            </div>

                                            <div className="p-6 flex-grow flex flex-col">
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{rental.vehicleId.name}</h3>
                                                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                                                        <span>📍 {rental.vehicleId.location}</span>
                                                    </p>

                                                    <div className="space-y-3 bg-gray-50 p-4 rounded-xl mb-4">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Rented From</span>
                                                            <span className="font-semibold text-gray-700">{rental.ownerId.fullName}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Return By</span>
                                                            <span className="font-semibold text-red-600">{new Date(rental.endDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Phone</span>
                                                            <span className="font-semibold text-blue-600">{rental.ownerId.phoneNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleReturn(rental._id)}
                                                    className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                                                >
                                                    Return Vehicle
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Rental History Section */}
                        <section className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Rental History</h2>

                            {history.length === 0 ? (
                                <div className="text-center py-10 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500">No past rental history found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {history.map(rental => (
                                        <div key={rental._id} className="bg-white p-5 rounded-xl border border-gray-200 opacity-75 hover:opacity-100 transition">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                    <img src={rental.vehicleId.images?.[0] || ""} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Completed</span>
                                            </div>
                                            <h4 className="font-bold text-gray-800 line-clamp-1">{rental.vehicleId.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Returned: {new Date(rental.actualReturnDate).toLocaleDateString()}</p>
                                            {rental.vehicleId.isDeleted && <span className="text-[10px] text-red-500 mt-1 block font-semibold">Vehicle unavailable</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">My Listings</h2>
                                <p className="text-gray-500 text-sm mt-1">Manage vehicles you've listed for rent</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center space-x-2 text-sm cursor-pointer select-none bg-white px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                                    <input
                                        type="checkbox"
                                        checked={showDeleted}
                                        onChange={(e) => setShowDeleted(e.target.checked)}
                                        className="checkbox checkbox-sm checkbox-primary"
                                    />
                                    <span className="text-gray-600">Show Deleted</span>
                                </label>
                                <Link to="/create-listing" className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition shadow-sm flex items-center gap-2">
                                    <span>+</span> Add New Vehicle
                                </Link>
                            </div>
                        </div>

                        {listings.filter(v => showDeleted || !v.isDeleted).length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <div className="text-5xl mb-4">🛵</div>
                                <h3 className="text-xl font-semibold text-gray-900">No vehicles listed</h3>
                                <p className="text-gray-500 mt-1">Start earning by listing your vehicle today.</p>
                                <Link to="/create-listing" className="mt-6 inline-block text-blue-600 font-semibold hover:underline">
                                    Create your first listing &rarr;
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {listings.filter(v => showDeleted || !v.isDeleted).map(vehicle => (
                                    <div key={vehicle._id} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group ${vehicle.isDeleted ? 'opacity-60 grayscale' : 'hover:shadow-lg transition-all duration-300'}`}>

                                        <div className="h-40 bg-gray-100 relative">
                                            <img
                                                src={vehicle.images?.[0] || "https://via.placeholder.com/400x250"}
                                                alt={vehicle.name}
                                                className="w-full h-full object-cover"
                                            />
                                            {vehicle.isDeleted && (
                                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">Deleted</span>
                                                </div>
                                            )}
                                            {!vehicle.isDeleted && (
                                                <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded shadow ${vehicle.isAvailable ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                    {vehicle.isAvailable ? 'Available' : 'Rented'}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{vehicle.name}</h3>
                                                <span className="font-bold text-gray-900">₹{vehicle.price}<span className="text-xs text-gray-500 font-normal">/day</span></span>
                                            </div>

                                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                                                {vehicle.isDeleted ? (
                                                    <button
                                                        onClick={() => handleRelist(vehicle._id)}
                                                        className="w-full text-blue-600 font-semibold text-sm hover:underline"
                                                    >
                                                        Relist Vehicle
                                                    </button>
                                                ) : (
                                                    <>
                                                        <Link to={`/edit-listing/${vehicle._id}`} className="text-gray-600 hover:text-black text-sm font-medium">Edit</Link>
                                                        <button onClick={() => handleDelete(vehicle._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {incomingBookings.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Incoming Bookings</h2>
                                <div className="space-y-4">
                                    {incomingBookings.map(rental => (
                                        <div key={rental._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {rental.renterId.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {rental.renterId.fullName} <span className="text-gray-400 font-normal">rented</span> {rental.vehicleId.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">Until {new Date(rental.endDate).toLocaleDateString()} • {rental.renterId.phoneNumber}</p>
                                                </div>
                                            </div>
                                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Active</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
