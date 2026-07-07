import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Plus, LogOut, FileText, Calendar, Trash2, Edit3, CheckCircle, 
  UserCheck, ShieldAlert, Award, FileCode, CheckSquare, PlusCircle, PenTool
} from 'lucide-react';

export default function ClientArea() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Dashboard Nav: 'home' | 'pets' | 'medical' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // Pets & Bookings States
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Modal States
  const [showAddPet, setShowAddPet] = useState(false);
  const [showReschedule, setShowReschedule] = useState(null); // appointment id
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // New Pet Form State
  const [newPet, setNewPet] = useState({
    name: '', species: 'Cachorro', breed: '', sex: 'Macho', weight: '', birth: '', vaccines: '', illnesses: '', allergies: '', medicines: '', notes: ''
  });

  // Prepopulate mock data on initial load if empty
  useEffect(() => {
    // Session check
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      const cachedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      setName(cachedUser.name || 'Ana Silva');
      setEmail(cachedUser.email || 'ana.silva@email.com');
      setPhone(cachedUser.phone || '(11) 99999-9888');
    }

    // Default Pets
    const savedPets = JSON.parse(localStorage.getItem('pets') || '[]');
    if (savedPets.length === 0) {
      const defaultPets = [
        {
          id: 1,
          name: 'Pipoca',
          species: 'Cachorro',
          breed: 'Golden Retriever',
          sex: 'Macho',
          weight: '32',
          birth: '2022-03-15',
          vaccines: 'V10 (Jan/2026), Antirrábica (Fev/2026)',
          illnesses: 'Nenhuma',
          allergies: 'Alergia a picada de pulga',
          medicines: 'Simparic (Mensal)',
          tutor: 'Ana Silva',
          phone: '(11) 99999-9888',
          notes: 'Muito dócil e brincalhão, adora petiscos de frango.'
        }
      ];
      localStorage.setItem('pets', JSON.stringify(defaultPets));
      setPets(defaultPets);
    } else {
      setPets(savedPets);
    }

    // Default Bookings
    const savedBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    if (savedBookings.length === 0) {
      const defaultBookings = [
        {
          id: 101,
          petName: 'Pipoca',
          species: 'Cachorro',
          breed: 'Golden Retriever',
          service: 'Consulta Clínica',
          price: 'R$ 150,00',
          vet: 'Dr. Bruno Silva',
          date: '2026-07-15',
          time: '14:00',
          paymentMethod: 'Pix',
          status: 'Confirmado'
        }
      ];
      localStorage.setItem('appointments', JSON.stringify(defaultBookings));
      setAppointments(defaultBookings);
    } else {
      setAppointments(savedBookings);
    }
  }, []);

  // Sync state with localStorage changes
  const updateLocalStoragePets = (updatedPets) => {
    localStorage.setItem('pets', JSON.stringify(updatedPets));
    setPets(updatedPets);
  };

  const updateLocalStorageAppointments = (updatedAppts) => {
    localStorage.setItem('appointments', JSON.stringify(updatedAppts));
    setAppointments(updatedAppts);
  };

  // Auth Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ name: name || 'Ana Silva', email, phone }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password && name) {
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ name, email, phone }));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  // Add Pet Handler
  const handleAddPetSubmit = (e) => {
    e.preventDefault();
    if (newPet.name) {
      const petToAdd = {
        ...newPet,
        id: Date.now(),
        tutor: name || 'Ana Silva',
        phone: phone || '(11) 99999-9888'
      };
      const updated = [...pets, petToAdd];
      updateLocalStoragePets(updated);
      setShowAddPet(false);
      setNewPet({
        name: '', species: 'Cachorro', breed: '', sex: 'Macho', weight: '', birth: '', vaccines: '', illnesses: '', allergies: '', medicines: '', notes: ''
      });
    }
  };

  // Delete Pet Handler
  const handleDeletePet = (id) => {
    if (window.confirm("Deseja realmente remover este pet?")) {
      const updated = pets.filter(p => p.id !== id);
      updateLocalStoragePets(updated);
    }
  };

  // Appointment Actions
  const handleCancelAppointment = (id) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      const updated = appointments.map(appt => 
        appt.id === id ? { ...appt, status: 'Cancelado' } : appt
      );
      updateLocalStorageAppointments(updated);
    }
  };

  const handleOpenReschedule = (appt) => {
    showReschedule ? setShowReschedule(null) : setShowReschedule(appt.id);
    setRescheduleDate(appt.date);
    setRescheduleTime(appt.time);
  };

  const handleRescheduleSubmit = (e, id) => {
    e.preventDefault();
    const updated = appointments.map(appt => 
      appt.id === id ? { ...appt, date: rescheduleDate, time: rescheduleTime, status: 'Reagendado' } : appt
    );
    updateLocalStorageAppointments(updated);
    setShowReschedule(null);
  };

  // Pre-login interface
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center transition-colors duration-300">
        <div className="max-w-md w-full px-4">
          
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl space-y-6">
            
            {/* Title / Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-vida-blue text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                {authMode === 'login' && 'Área do Cliente'}
                {authMode === 'register' && 'Criar Conta'}
                {authMode === 'forgot' && 'Recuperar Senha'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {authMode === 'login' && 'Acesse suas consultas, carteira de vacinas e exames'}
                {authMode === 'register' && 'Cadastre-se para gerenciar seus pets e agendamentos'}
                {authMode === 'forgot' && 'Insira seu e-mail para enviarmos instruções de recuperação'}
              </p>
            </div>

            {/* Login Mode */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Senha</label>
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('forgot')}
                      className="text-xs text-vida-blue dark:text-vida-green hover:underline font-semibold"
                    >
                      Esqueceu?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-vida-blue hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md transition-all duration-300"
                >
                  Entrar no Portal
                </button>
                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">Não tem conta? </span>
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('register')}
                    className="text-xs text-vida-blue dark:text-vida-green font-bold hover:underline"
                  >
                    Cadastre-se
                  </button>
                </div>
              </form>
            )}

            {/* Register Mode */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Telefone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Senha</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-vida-blue hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md transition-all duration-300"
                >
                  Registrar e Entrar
                </button>
                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">Já tem conta? </span>
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-vida-blue dark:text-vida-green font-bold hover:underline"
                  >
                    Faça login
                  </button>
                </div>
              </form>
            )}

            {/* Forgot Mode */}
            {authMode === 'forgot' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">E-mail Cadastrado</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => {
                    alert("Se o e-mail estiver cadastrado, enviaremos o link de recuperação.");
                    setAuthMode('login');
                  }}
                  className="w-full py-3.5 bg-vida-blue hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md transition"
                >
                  Enviar E-mail de Recuperação
                </button>
                <div className="text-center pt-2">
                  <button 
                    onClick={() => setAuthMode('login')}
                    className="text-xs text-slate-500 font-bold hover:underline"
                  >
                    Voltar para o Login
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // Dashboard Interface
  return (
    <div className="min-h-screen py-10 bg-slate-50 dark:bg-slate-950/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Olá, {name}!</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Seja bem-vindo ao portal Vida Pet.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveTab('pets');
                setShowAddPet(true);
              }}
              className="px-4 py-2.5 bg-vida-blue hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Pet</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'home', label: 'Dashboard', icon: '🏠' },
              { id: 'pets', label: 'Meus Pets', icon: '🐶' },
              { id: 'medical', label: 'Prontuários & Vacinas', icon: '📄' },
              { id: 'profile', label: 'Meus Dados', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-4 text-left font-bold text-sm rounded-2xl flex items-center space-x-3 transition border ${
                  activeTab === tab.id
                    ? 'bg-vida-blue text-white border-vida-blue shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:border-vida-blue'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Dashboard Area */}
          <div className="lg:col-span-3">
            
            {/* HOME TAB: Summary & Appointments */}
            {activeTab === 'home' && (
              <div className="space-y-8">
                
                {/* Statistics banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pets Cadastrados</p>
                    <p className="text-3xl font-black text-vida-blue mt-1">{pets.length}</p>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Consultas Futuras</p>
                    <p className="text-3xl font-black text-vida-blue mt-1">
                      {appointments.filter(a => a.status !== 'Cancelado').length}
                    </p>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Último Atendimento</p>
                    <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-2.5">
                      Consulta Geral (Dr. Bruno)
                    </p>
                  </div>
                </div>

                {/* Upcoming Appointments List */}
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-6">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-vida-blue" />
                    <span>Próximas Consultas</span>
                  </h2>

                  {appointments.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Nenhum agendamento ativo.</p>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map((appt) => (
                        <div 
                          key={appt.id}
                          className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-black text-slate-800 dark:text-white">{appt.service}</span>
                              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                appt.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' :
                                appt.status === 'Reagendado' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                              }`}>
                                {appt.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Pet: <span className="font-semibold text-vida-blue">{appt.petName}</span> • Veterinário: <span className="font-semibold">{appt.vet}</span>
                            </p>
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              {new Date(appt.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {appt.time}
                            </p>
                          </div>

                          {appt.status !== 'Cancelado' && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenReschedule(appt)}
                                className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl text-slate-700 dark:text-white hover:border-vida-blue transition"
                              >
                                Reagendar
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appt.id)}
                                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition"
                                title="Cancelar Consulta"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          {/* Inline Reschedule form */}
                          {showReschedule === appt.id && (
                            <div className="w-full md:w-auto md:col-span-3 border-t border-slate-200/50 dark:border-slate-800 pt-4 mt-2">
                              <form onSubmit={(e) => handleRescheduleSubmit(e, appt.id)} className="flex flex-wrap gap-3 items-end">
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Nova Data</label>
                                  <input
                                    type="date"
                                    required
                                    value={rescheduleDate}
                                    onChange={(e) => setRescheduleDate(e.target.value)}
                                    className="bg-white dark:bg-slate-855 border border-slate-200 dark:border-slate-700 text-xs rounded-lg p-2"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Novo Horário</label>
                                  <select
                                    value={rescheduleTime}
                                    onChange={(e) => setRescheduleTime(e.target.value)}
                                    className="bg-white dark:bg-slate-855 border border-slate-200 dark:border-slate-700 text-xs rounded-lg p-2"
                                  >
                                    {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((h) => (
                                      <option key={h} value={h}>{h}</option>
                                    ))}
                                  </select>
                                </div>
                                <button type="submit" className="px-4 py-2.5 bg-emerald-500 text-white font-bold text-xs rounded-lg">Salvar</button>
                                <button type="button" onClick={() => setShowReschedule(null)} className="px-3 py-2.5 bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg">Voltar</button>
                              </form>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* PETS TAB: List and Add pets */}
            {activeTab === 'pets' && (
              <div className="space-y-8">
                
                {showAddPet ? (
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 sm:p-8 rounded-[2rem] shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Cadastrar Novo Pet</h2>
                    <form onSubmit={handleAddPetSubmit} className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nome do Pet</label>
                          <input
                            type="text"
                            required
                            value={newPet.name}
                            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Espécie</label>
                          <select
                            value={newPet.species}
                            onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white"
                          >
                            <option>Cachorro</option>
                            <option>Gato</option>
                            <option>Ave</option>
                            <option>Coelho</option>
                            <option>Roedor</option>
                            <option>Réptil</option>
                            <option>Outro</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Raça</label>
                          <input
                            type="text"
                            value={newPet.breed}
                            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Peso (kg)</label>
                          <input
                            type="text"
                            value={newPet.weight}
                            onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Data de Nascimento</label>
                          <input
                            type="date"
                            value={newPet.birth}
                            onChange={(e) => setNewPet({ ...newPet, birth: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Vacinas Tomadas</label>
                          <input
                            type="text"
                            value={newPet.vaccines}
                            onChange={(e) => setNewPet({ ...newPet, vaccines: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                            placeholder="Ex: V10, Antirrábica"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Alergias</label>
                          <input
                            type="text"
                            value={newPet.allergies}
                            onChange={(e) => setNewPet({ ...newPet, allergies: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                            placeholder="Ex: Ração com frango, picada de pulga"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Medicamentos Contínuos / Observações</label>
                        <textarea
                          rows={3}
                          value={newPet.notes}
                          onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm resize-none"
                          placeholder="Algum comportamento ou cuidado especial?"
                        />
                      </div>

                      <div className="flex gap-3 justify-end border-t border-slate-100 dark:border-slate-700/50 pt-6">
                        <button
                          type="button"
                          onClick={() => setShowAddPet(false)}
                          className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-white font-semibold rounded-xl text-xs"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-vida-blue text-white font-bold rounded-xl text-xs"
                        >
                          Salvar Pet
                        </button>
                      </div>

                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pets.map((pet) => (
                      <div
                        key={pet.id}
                        className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-3xl shadow-sm flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                              <span>🐾</span>
                              <span>{pet.name}</span>
                            </h3>
                            <span className="bg-vida-blue/15 text-vida-blue px-2.5 py-0.5 rounded-lg text-xs font-bold">
                              {pet.species}
                            </span>
                          </div>
                          
                          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 border-t border-slate-50 dark:border-slate-700/50 pt-3">
                            <p><strong>Raça:</strong> {pet.breed || 'Não informada'}</p>
                            <p><strong>Nascimento:</strong> {pet.birth ? new Date(pet.birth + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não informado'}</p>
                            <p><strong>Peso:</strong> {pet.weight ? `${pet.weight} kg` : 'Não informado'}</p>
                            <p><strong>Alergias:</strong> {pet.allergies || 'Nenhuma'}</p>
                            <p><strong>Vacinas:</strong> {pet.vaccines || 'Nenhuma registrada'}</p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 mt-4 border-t border-slate-50 dark:border-slate-750">
                          <button
                            onClick={() => handleDeletePet(pet.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-xs font-bold">Remover</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* MEDICAL TAB: Vaccines, Exams and Prescriptions */}
            {activeTab === 'medical' && (
              <div className="space-y-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 sm:p-8 rounded-[2rem] shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Ficha Médica & Exames</h2>
                
                {/* Vacinas */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Carteira de Vacinação</h3>
                  <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    <div className="flex p-4 bg-slate-50 dark:bg-slate-900 font-bold text-slate-600 dark:text-slate-400">
                      <div className="w-1/3">Vacina</div>
                      <div className="w-1/3">Data de Aplicação</div>
                      <div className="w-1/3 text-right">Lote / Status</div>
                    </div>
                    <div className="flex p-4 items-center">
                      <div className="w-1/3 font-semibold text-slate-800 dark:text-white">Raiva</div>
                      <div className="w-1/3 text-slate-500">10/02/2026</div>
                      <div className="w-1/3 text-right text-emerald-500 font-bold">Aplicada (Lote R901)</div>
                    </div>
                    <div className="flex p-4 items-center">
                      <div className="w-1/3 font-semibold text-slate-800 dark:text-white">Óctupla (V10)</div>
                      <div className="w-1/3 text-slate-500">15/01/2026</div>
                      <div className="w-1/3 text-right text-emerald-500 font-bold">Aplicada (Lote O21)</div>
                    </div>
                  </div>
                </div>

                {/* Exames */}
                <div className="space-y-4 pt-6 border-t border-slate-150 dark:border-slate-700/50">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resultados de Exames</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Hemograma Completo - Pipoca', date: '10/02/2026', size: '184 KB' },
                      { name: 'Perfil Bioquímico Renal/Hepático', date: '10/02/2026', size: '202 KB' }
                    ].map((doc, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">📄</span>
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-white">{doc.name}</p>
                            <p className="text-[10px] text-slate-500">{doc.date} • PDF</p>
                          </div>
                        </div>
                        <button
                          onClick={() => alert("Exame em formato demonstrativo. Download simulado!")}
                          className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-vida-blue text-[10px] font-bold rounded-lg transition"
                        >
                          Visualizar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Receitas */}
                <div className="space-y-4 pt-6 border-t border-slate-150 dark:border-slate-700/50">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receitas Digitais</h3>
                  <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/50 rounded-2xl">
                    <p className="text-xs font-bold text-slate-800 dark:text-white mb-2">Prescrição - Pós Consulta (10/02/2026)</p>
                    <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li>Simparic 20-40kg: 1 comprimido mastigável mensalmente.</li>
                      <li>Prednisolona 10mg: 1 comprimido ao dia por 5 dias.</li>
                    </ul>
                  </div>
                </div>

              </div>
            )}

            {/* PROFILE TAB: User Details */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 sm:p-8 rounded-[2rem] shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Dados Cadastrais</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert("Dados atualizados com sucesso!"); }} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nome</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400">E-mail</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Celular / Telefone</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Senha de Acesso</label>
                      <input
                        type="password"
                        placeholder="Alterar senha"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-700/50 pt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-vida-blue text-white font-bold text-xs rounded-xl"
                    >
                      Salvar Alterações
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
