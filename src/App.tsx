import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from './contexts/ThemeContext';

// Layout components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import StylistsPage from './pages/StylistsPage';
import StylistDetailPage from './pages/StylistDetailPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AboutPage from './pages/AboutPage';
import CreateStylistPage from './pages/CreateStylistPage';
import BookAppointmentPage from './pages/BookAppointmentPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stylists" element={<StylistsPage />} />
            <Route path="/stylists/new" element={<CreateStylistPage />} />
            <Route path="/stylists/:id" element={<StylistDetailPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/book-appointment/:stylistId?" element={<BookAppointmentPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;