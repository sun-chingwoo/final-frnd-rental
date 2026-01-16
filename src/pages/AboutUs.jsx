import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <div className="flex-grow max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Rent. Ride. <span className="text-yellow-400">Repeat.</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8 text-lg text-gray-700 leading-relaxed text-center md:text-left">
                    <p className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        At <span className="font-bold text-black">Rental Buddy</span>, we believe that getting a vehicle on rent should be simple, affordable, and stress-free.
                        Whether you need a bike for daily commuting, a car for a weekend trip, or a reliable ride for longer journeys,
                        we’re here to make mobility easy.
                    </p>

                    <p className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        We connect vehicle owners with renters through a secure and user-friendly platform, giving you access to a
                        wide range of well-maintained cars and bikes at transparent prices.
                        <span className="block mt-4 font-semibold text-gray-900">
                            No hidden charges. No complicated paperwork. Just book, ride, and go.
                        </span>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
