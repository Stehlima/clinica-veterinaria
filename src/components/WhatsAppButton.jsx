import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Vida%20Pet."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-md transition-opacity pointer-events-none hidden md:block">
        Fale Conosco
      </span>
    </motion.a>
  );
}
