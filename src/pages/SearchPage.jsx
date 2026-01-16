import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import api from "../api/axios";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router"; // Createcard removed
import Footer from "../components/Footer";

const SearchPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation()
  const query = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchall = async () => {
      try {
        const res = await api.get(`/vehicles?search=${query}`);
        setCards(res.data.filter(card => !card.isDeleted))
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Could not fetch vehicles");
        setCards([]);
      }
      finally {
        setLoading(false)
      }
    }

    fetchall();
  }, [query])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Search Results</h2>

        {loading && <div className="text-center">Loading...</div>}

        {!loading && cards.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p>No vehicles found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(vehicle => {
            return (
              <div key={vehicle._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={vehicle.images?.[0] || vehicle.image || "https://via.placeholder.com/400x250"}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow">
                    {vehicle.location}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{vehicle.name}</h3>
                  <p className="text-gray-500 text-xs mb-4">By {vehicle.ownerId?.fullName || "Owner"}</p>

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
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage
