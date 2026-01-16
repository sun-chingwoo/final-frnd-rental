import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const UpdateListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        image: ''
    });

    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch allowed locations
        api.get('/vehicles/locations')
            .then(res => setLocations(res.data))
            .catch(err => console.error("Failed to fetch locations", err));

        // Fetch vehicle details
        const fetchVehicle = async () => {
            try {
                const res = await api.get(`/vehicles/${id}`);
                const vehicle = res.data;
                setFormData({
                    name: vehicle.name,
                    location: vehicle.location,
                    price: vehicle.price,
                    image: vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : ''
                });
            } catch (error) {
                toast.error("Failed to load vehicle details");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [id, navigate]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Vehicle name is required";
        if (!formData.location) newErrors.location = "Please select a location";
        if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Enter a valid daily price";
        if (formData.image && !formData.image.match(/^https?:\/\/.+/)) {
            newErrors.image = "Please enter a valid image URL (starting with http:// or https://)";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: formData.image ? [formData.image] : []
            };
            delete payload.image;

            await api.put(`/vehicles/${id}`, payload);
            toast.success('Vehicle updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update listing');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-xl font-semibold text-gray-500">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <div className="flex-grow flex items-center justify-center p-6">
                <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                    {/* Header */}
                    <div className="bg-gray-900 p-8 text-center text-white">
                        <h1 className="text-3xl font-bold mb-2">Update Listing</h1>
                        <p className="text-gray-400 text-sm">Edit your vehicle details below.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="e.g. Royal Enfield Classic 350"
                                className={`w-full border-2 rounded-xl p-3 outline-none transition-all focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                                value={formData.name}
                                onChange={e => {
                                    setFormData({ ...formData, name: e.target.value });
                                    if (errors.name) setErrors({ ...errors, name: null });
                                }}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                        </div>

                        {/* Location Dropdown */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    className={`w-full border-2 rounded-xl p-3 outline-none appearance-none bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 cursor-pointer ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                    value={formData.location}
                                    onChange={e => {
                                        setFormData({ ...formData, location: e.target.value });
                                        if (errors.location) setErrors({ ...errors, location: null });
                                    }}
                                >
                                    <option value="">Select a City</option>
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                            {errors.location && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.location}</p>}
                        </div>

                        {/* Price Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Daily Rate (₹) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-bold">₹</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    min="0"
                                    className={`w-full border-2 rounded-xl p-3 pl-8 outline-none transition-all focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                                    value={formData.price}
                                    onChange={e => {
                                        setFormData({ ...formData, price: e.target.value });
                                        if (errors.price) setErrors({ ...errors, price: null });
                                    }}
                                />
                            </div>
                            {errors.price && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.price}</p>}
                        </div>

                        {/* Image URL Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className={`w-full border-2 rounded-xl p-3 outline-none transition-all focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${errors.image ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                                value={formData.image}
                                onChange={e => {
                                    setFormData({ ...formData, image: e.target.value });
                                    if (errors.image) setErrors({ ...errors, image: null });
                                }}
                            />
                            {errors.image ? (
                                <p className="text-red-500 text-xs mt-1 font-semibold">{errors.image}</p>
                            ) : (
                                <p className="text-gray-400 text-xs mt-1">Provide a direct link to a JPG/PNG image of your vehicle.</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform duration-200 flex items-center justify-center gap-2 ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                : 'bg-yellow-400 text-black hover:bg-yellow-500 hover:-translate-y-1 hover:shadow-xl'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                "Update Listing"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* No footer as requested for focus */}
        </div>
    );
};

export default UpdateListing;
