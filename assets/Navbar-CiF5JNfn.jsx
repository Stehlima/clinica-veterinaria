import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Equipe', path: '/equipe' },
    { name: 'Contato', path: '/contato' },
    { name: 'Área do Cliente', path: '/cliente' },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 glass shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-vida-blue text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-vida-blue dark:text-vida-green transition-colors duration-300">
                Vida<span className="text-vida-dark dark:text-white">Pet</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-semibold uppercase tracking-wider">
                Clínica Veterinária
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors duration-300 py-2 px-1 ${
                    isActive
                      ? 'text-vida-blue dark:text-vida-green font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-vida-blue dark:hover:text-vida-green'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-vida-blue dark:bg-vida-green rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-vida-blue/10 dark:hover:bg-vida-green/10 hover:text-vida-blue dark:hover:text-vida-green transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Link
              to="/agendamento"
              className="relative overflow-hidden group px-6 py-3 bg-gradient-to-r from-vida-blue to-blue-600 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">Agendar Consulta</span>
              <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-vida-blue dark:hover:text-vida-green transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-vida-blue/10 dark:bg-vida-green/10 text-vida-blue dark:text-vida-green'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <Link
                  to="/agendamento"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full py-3 bg-vida-blue text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition"
                >
                  Agendar Consulta
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
