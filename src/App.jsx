import './App.css'
import { Routes, Route } from "react-router"
import HomePage from './pages/HomePage.jsx'
import InfoPage from './pages/InfoPage'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import SearchPage from './pages/SearchPage.jsx'
import Chatbot from './components/Chatbot.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import AboutUs from './pages/AboutUs.jsx'
import ContactUs from './pages/ContactUs.jsx'

import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filter" element={<SearchPage />} />
          <Route path="/:id" element={<InfoPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/create-listing" element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          } />

          <Route path="/edit-listing/:id" element={
            <ProtectedRoute>
              <UpdateListing />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path="/users/signup" element={<SignUp />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Chatbot />
      </div>
    </AuthProvider>
  )
}

export default App
