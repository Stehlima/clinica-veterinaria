import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-vida-blue text-white rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Vida<span className="text-vida-green">Pet</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cuidando da saúde e bem-estar do seu melhor amigo com carinho, tecnologia e muito amor. Nosso foco é oferecer o melhor atendimento veterinário da região.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-vida-blue hover:text-white flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-vida-blue hover:text-white flex items-center justify-center transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-vida-green transition-all duration-200">Home</Link>
              </li>
              <li>
                <Link to="/servicos" className="text-slate-400 hover:text-vida-green transition-all duration-200">Nossos Serviços</Link>
              </li>
              <li>
                <Link to="/equipe" className="text-slate-400 hover:text-vida-green transition-all duration-200">Equipe Médica</Link>
              </li>
              <li>
                <Link to="/contato" className="text-slate-400 hover:text-vida-green transition-all duration-200">Contato</Link>
              </li>
              <li>
                <Link to="/cliente" className="text-slate-400 hover:text-vida-green transition-all duration-200">Área do Cliente</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Informações</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <MapPin className="w-5 h-5 text-vida-blue shrink-0 mt-0.5" />
                <span>Av. Principal, 1000 - Centro, Cidade Pet</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <Phone className="w-5 h-5 text-vida-blue shrink-0" />
                <span>(11) 99999-9999 / (11) 3333-3333</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <Mail className="w-5 h-5 text-vida-blue shrink-0" />
                <span>contato@vidapet.com.br</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Novidades & Dicas</h3>
            <p className="text-sm text-slate-400 mb-4">
              Inscreva-se na nossa newsletter para receber dicas de saúde pet e novidades da clínica.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue border border-slate-700 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 bg-vida-blue text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-vida-green font-medium animate-pulse">
                  Inscrição realizada com sucesso! 🎉
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Vida Pet - Clínica Veterinária. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-400 transition">Política de Privacidade</a>
            <a href="#" className="hover:text-slate-400 transition">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
