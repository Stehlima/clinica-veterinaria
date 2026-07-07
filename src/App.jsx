import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Booking from './pages/Booking';
import ClientArea from './pages/ClientArea';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/clinica-veterinaria/">
        <div className="flex flex-col min-h-screen">
          {/* Automatically scrolls to top on navigation, and shows go-to-top floating button */}
          <ScrollToTop />
          
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/equipe" element={<Team />} />
              <Route path="/agendamento" element={<Booking />} />
              <Route path="/cliente" element={<ClientArea />} />
              <Route path="/contato" element={<Contact />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Floating WhatsApp button */}
          <WhatsAppButton />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
