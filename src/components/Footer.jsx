import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Rental Buddy</h2>
          <div className="w-12 h-1 bg-yellow-400 mb-4 rounded-full"></div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Rent vehicles easily, anywhere, anytime. Your journey, your way.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
          <div className="w-12 h-1 bg-yellow-400 mb-4 rounded-full"></div>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span className="text-yellow-400">›</span> Home</Link></li>
            <li><Link to="/filter" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span className="text-yellow-400">›</span> Vehicles</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span className="text-yellow-400">›</span> About Us</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-400 transition-colors flex items-center gap-2"><span className="text-yellow-400">›</span> Contact Us</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
          <div className="w-12 h-1 bg-yellow-400 mb-4 rounded-full"></div>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition-all duration-300"><FaFacebookF /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition-all duration-300"><FaTwitter /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition-all duration-300"><FaInstagram /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition-all duration-300"><FaLinkedinIn /></a>
          </div>
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Rental Buddy. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
