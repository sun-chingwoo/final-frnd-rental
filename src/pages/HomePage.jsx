import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data.filter(v => !v.isDeleted));
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      setVehicles([]); // Ensure state is cleared on error
      toast.error("Could not load vehicles");
    }
  };

  const handlesearch = (e) => {
    e.preventDefault();
    navigate(`/filter?search=${search}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section - Royal Brothers Style */}
      <div className="relative h-[600px] w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-2xl text-white mb-10">
            <h1 className="text-6xl font-extrabold mb-4 leading-tight tracking-tight">
              Vehicle Rentals <br /> <span className="text-yellow-400">Made Easy</span>
            </h1>
            <p className="text-xl text-gray-200 font-light mb-8">
              Choose from a wide range of vehicles for your daily commute or weekend getaway.
              Standard rates, no hidden charges.
            </p>
          </div>

          {/* Search Widget Overlay */}
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Search City or Vehicle</label>
              <div className="flex items-center border border-gray-300 rounded p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-400">
                <span className="text-gray-400 mr-2">📍</span>
                <input
                  type="text"
                  placeholder="Search for vehicles (e.g. Classic 350)"
                  className="bg-transparent w-full focus:outline-none text-gray-800 font-semibold"
                  onChange={(e) => setsearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlesearch(e)}
                />
              </div>
            </div>

            <button
              onClick={handlesearch}
              className="bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 transition-colors shadow-md h-[50px] flex items-center justify-center uppercase tracking-wide"
            >
              Search Rides
            </button>
          </div>
        </div>
      </div>

      {/* Featured Fleet Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex justify-between items-end mb-10 border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Fleet</h2>
            <p className="text-gray-500 mt-2">Choose from our diverse collection of well-maintained vehicles</p>
          </div>
          <Link to="/filter" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
            View All <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.slice(0, 4).map((vehicle, index) => (
            <div
              key={vehicle._id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group 
                ${index > 0 ? 'hidden md:block' : ''} 
                ${index > 1 ? 'md:hidden lg:block' : ''}
              `}
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={vehicle.images[0] || "https://via.placeholder.com/400x250"}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow">
                  {vehicle.location}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{vehicle.name}</h3>
                <p className="text-gray-500 text-xs mb-4">By {vehicle.ownerId?.fullName}</p>

                <div className="flex justify-between items-end mt-4">
                  <div>
                    <span className="text-gray-400 text-xs block">Daily Rate</span>
                    <span className="text-xl font-bold text-gray-900">₹{vehicle.price}</span>
                  </div>

                  <Link
                    to={`/${vehicle._id}`}
                    className="bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed">
            <p className="text-gray-500 text-lg">No vehicles available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later or try a different search.</p>
          </div>
        )}
      </div>

      {/* Features / Why Choose Us */}
      {/* Features / Why Choose Us */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-5xl mb-6">🛡️</div>
            <h3 className="text-xl font-bold mb-3 text-white">Safe & Sanitized</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              All vehicles are sanitized before every ride for your safety. We prioritize hygiene standards.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-xl font-bold mb-3 text-white">Fast Booking</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Book your ride in less than 2 minutes with our seamless process. No paperwork hassles.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:-translate-y-2 transition-transform duration-300">
            <div className="text-5xl mb-6">🎧</div>
            <h3 className="text-xl font-bold mb-3 text-white">24x7 Service</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are available round the clock to assist you with your queries and road side assistance.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

