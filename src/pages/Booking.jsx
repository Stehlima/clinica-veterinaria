import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Info, DollarSign, CheckCircle2, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

const SERVICES = [
  { id: 'consulta', name: 'Consulta Clínica', price: 150 },
  { id: 'vacina', name: 'Vacinação Importada', price: 90 },
  { id: 'cirurgia', name: 'Cirurgias Gerais', price: 0, label: 'Sob Consulta' },
  { id: 'castracao', name: 'Castração', price: 350 },
  { id: 'exame', name: 'Exame de Sangue', price: 80 },
  { id: 'imagem', name: 'Ultrassom / Raio-X', price: 180 },
  { id: 'estetica', name: 'Banho e Tosa', price: 70 },
];

const VETS = [
  { id: 1, name: 'Dr. Bruno Silva', role: 'Cardiologia & Geral' },
  { id: 2, name: 'Dra. Camila Santos', role: 'Felinos & Silvestres' },
  { id: 3, name: 'Dr. Rafael Costa', role: 'Cirurgião & Ortopedia' },
];

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial step setup
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [species, setSpecies] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  
  const [selectedService, setSelectedService] = useState('');
  const [selectedVet, setSelectedVet] = useState('');
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Handle preset Vet Selection
  useEffect(() => {
    if (location.state?.selectedVetId) {
      setSelectedVet(location.state.selectedVetId);
    }
  }, [location.state]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    const serviceDetails = SERVICES.find(s => s.id === selectedService);
    const vetDetails = VETS.find(v => v.id === Number(selectedVet));

    const newBooking = {
      id: Date.now(),
      petName,
      species,
      breed,
      age,
      weight,
      service: serviceDetails?.name || 'Consulta',
      price: serviceDetails?.price ? `R$ ${serviceDetails.price}` : 'Sob Consulta',
      vet: vetDetails?.name || 'Qualquer profissional',
      date,
      time,
      notes,
      paymentMethod,
      status: 'Confirmado'
    };

    // Save to LocalStorage
    const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
    existing.push(newBooking);
    localStorage.setItem('appointments', JSON.stringify(existing));

    setShowSuccess(true);
  };

  const finishBooking = () => {
    setShowSuccess(false);
    navigate('/cliente');
  };

  // Check validations per step
  const isStepValid = () => {
    if (step === 1) return species && petName.trim() && breed.trim() && age && weight;
    if (step === 2) return selectedService && selectedVet;
    if (step === 3) return date && time && paymentMethod;
    return true;
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            <span>Passo {step} de 4</span>
            <span>
              {step === 1 && "Dados do Pet"}
              {step === 2 && "Serviço & Veterinário"}
              {step === 3 && "Data & Pagamento"}
              {step === 4 && "Resumo & Confirmação"}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-vida-blue"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Card Form container */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-8 sm:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              
              {/* STEP 1: PET INFO */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                    <span className="p-2 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-xl">🐾</span>
                    <span>Conte-nos sobre seu pet</span>
                  </h2>

                  {/* Espécie */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Espécie</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {["Cachorro", "Gato", "Ave", "Coelho", "Roedor", "Réptil", "Outro"].map((spec) => (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => setSpecies(spec)}
                          className={`p-3 text-sm font-semibold rounded-2xl border transition-all ${
                            species === spec
                              ? 'bg-vida-blue text-white border-vida-blue shadow-md'
                              : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-vida-blue'
                          }`}
                        >
                          {spec === "Cachorro" && "🐶 "}
                          {spec === "Gato" && "🐱 "}
                          {spec === "Ave" && "🦜 "}
                          {spec === "Coelho" && "🐰 "}
                          {spec}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Basic fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Nome do Pet</label>
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                        placeholder="Nome do bichinho"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Raça</label>
                      <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                        placeholder="Ex: Poodle, Persa, S/RD"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Idade (anos/meses)</label>
                      <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                        placeholder="Ex: 2 anos ou 6 meses"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Peso Estimado (kg)</label>
                      <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                        placeholder="Ex: 8.5"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 2: SERVICE & VET */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                    <span className="p-2 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-xl">🩺</span>
                    <span>Selecione o Atendimento</span>
                  </h2>

                  {/* Service selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Serviço Desejado</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedService(srv.id)}
                          className={`p-4 text-left rounded-2xl border transition-all flex justify-between items-center ${
                            selectedService === srv.id
                              ? 'bg-vida-blue/15 text-vida-blue border-vida-blue border-2 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-vida-blue'
                          }`}
                        >
                          <div className="font-semibold text-sm">{srv.name}</div>
                          <div className="text-xs font-black text-vida-green">
                            {srv.price ? `R$ ${srv.price}` : (srv.label || 'Sob Consulta')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vet selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Profissional Especialista</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {VETS.map((vet) => (
                        <button
                          key={vet.id}
                          type="button"
                          onClick={() => setSelectedVet(vet.id)}
                          className={`p-4 text-left rounded-2xl border transition-all ${
                            Number(selectedVet) === vet.id
                              ? 'bg-vida-blue/15 text-vida-blue border-vida-blue border-2 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-vida-blue'
                          }`}
                        >
                          <div className="font-semibold text-sm">{vet.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-bold tracking-wider">{vet.role}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 3: DATE, TIME & PAYMENT */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                    <span className="p-2 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-xl">📅</span>
                    <span>Data, Horário e Pagamento</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Data do Atendimento</label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Horário Disponível</label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                      >
                        <option value="">Selecione um horário</option>
                        {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Forma de Pagamento */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Forma de Pagamento (Previsto)</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Pix", "Cartão", "Dinheiro"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPaymentMethod(p)}
                          className={`p-3.5 text-sm font-semibold rounded-2xl border transition-all ${
                            paymentMethod === p
                              ? 'bg-vida-blue text-white border-vida-blue shadow-md'
                              : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-vida-blue'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Obs adicionais */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Informações Adicionais / Sintomas</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white resize-none"
                      placeholder="Relate sintomas, alergias ou observações sobre o pet..."
                    />
                  </div>

                </div>
              )}

              {/* STEP 4: SUMMARY & CONFIRMATION */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
                    <span className="p-2 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-xl">📋</span>
                    <span>Resumo do Agendamento</span>
                  </h2>

                  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4">
                    
                    {/* Pet block */}
                    <div className="flex items-start justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🐾</span>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pet</p>
                          <h4 className="font-extrabold text-slate-800 dark:text-white">{petName} ({species})</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Raça / Peso</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{breed} • {weight}kg</p>
                      </div>
                    </div>

                    {/* Vet block */}
                    <div className="flex items-start justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">👨‍⚕️</span>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Profissional</p>
                          <h4 className="font-extrabold text-slate-800 dark:text-white">
                            {VETS.find(v => v.id === Number(selectedVet))?.name}
                          </h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Serviço</p>
                        <p className="text-xs font-black text-vida-blue dark:text-vida-green">
                          {SERVICES.find(s => s.id === selectedService)?.name}
                        </p>
                      </div>
                    </div>

                    {/* Schedule block */}
                    <div className="flex items-start justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">⏰</span>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Data / Horário</p>
                          <h4 className="font-extrabold text-slate-800 dark:text-white">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')} às {time}</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Valor Estimado</p>
                        <p className="text-xs font-extrabold text-emerald-500">
                          {SERVICES.find(s => s.id === selectedService)?.price 
                            ? `R$ ${SERVICES.find(s => s.id === selectedService)?.price},00` 
                            : 'Sob Consulta'}
                        </p>
                      </div>
                    </div>

                    {/* Payment / notes block */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-400 uppercase tracking-wider">Forma de Pagamento:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{paymentMethod}</span>
                      </div>
                      {notes && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                          <span className="font-bold text-slate-400 block uppercase mb-1">Notas Clínicas:</span>
                          "{notes}"
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-10 flex justify-between gap-4 border-t border-slate-100 dark:border-slate-700/50 pt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white text-sm font-bold rounded-2xl flex items-center space-x-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                disabled={!isStepValid()}
                onClick={handleNext}
                className={`px-6 py-3.5 text-white text-sm font-bold rounded-2xl flex items-center space-x-1.5 transition-all ${
                  isStepValid()
                    ? 'bg-vida-blue hover:bg-blue-600 shadow-md'
                    : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500'
                }`}
              >
                <span>Avançar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center space-x-1.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Agendamento</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl max-w-md w-full text-center space-y-6 border border-slate-100 dark:border-slate-700/50"
            >
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white">Consulta Marcada!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  O agendamento do <span className="font-bold text-vida-blue dark:text-vida-green">{petName}</span> foi concluído com sucesso e já está salvo no seu histórico.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 flex items-center justify-center space-x-2 text-xs font-semibold text-slate-500">
                <Calendar className="w-4 h-4 text-vida-blue" />
                <span>{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')} às {time}</span>
              </div>

              <button
                onClick={finishBooking}
                className="w-full py-3.5 bg-vida-blue hover:bg-blue-600 text-white font-extrabold rounded-2xl transition shadow-md"
              >
                Ver Área do Cliente
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
