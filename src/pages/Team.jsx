import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GraduationCap, Globe, Calendar, Camera, Briefcase, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const TEAM_DATA = [
  {
    id: 1,
    name: "Dr. Bruno Silva",
    role: "Clínico Geral e Cardiologia",
    crmv: "CRMV-SP 12345",
    experience: "9 anos",
    rating: 4.9,
    reviews: 245,
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=350",
    languages: ["Português", "Inglês"],
    courses: [
      "Especialização em Cardiologia Veterinária - USP",
      "Pós-Graduação em Clínica Médica de Pequenos Animais - Anclivepa"
    ],
    bio: "Apaixonado por animais desde a infância, Dr. Bruno é especialista em cuidar do coração dos nossos pets. Ele foca em medicina preventiva e diagnósticos de alta complexidade cardiológica, garantindo que cães e gatos vivam mais e melhor ao lado dos seus tutores.",
    schedule: ["Terça e Quinta: 08:00 - 17:00", "Sábado: 09:00 - 12:00"],
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "Dra. Camila Santos",
    role: "Especialista em Felinos e Silvestres",
    crmv: "CRMV-SP 67890",
    experience: "7 anos",
    rating: 5.0,
    reviews: 312,
    img: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=350",
    languages: ["Português", "Espanhol"],
    courses: [
      "Mestrado em Medicina Felina - UNESP",
      "Curso Avançado de Manejo Cat-Friendly - ISFM (Inglaterra)",
      "Capacitação em Animais Silvestres e Exóticos - USP"
    ],
    bio: "Dra. Camila lidera nossa ala livre de estresse para gatos (Cat-Friendly). Com anos de dedicação à rotina de felinos e animais exóticos/silvestres (coelhos, roedores, répteis e aves), sua abordagem foca na tranquilidade e no bem-estar total durante o atendimento.",
    schedule: ["Segunda, Quarta e Sexta: 09:00 - 18:00"],
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Dr. Rafael Costa",
    role: "Cirurgião Geral e Ortopedia",
    crmv: "CRMV-SP 54321",
    experience: "12 anos",
    rating: 4.8,
    reviews: 189,
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=350",
    languages: ["Português", "Inglês", "Espanhol"],
    courses: [
      "Residência em Cirurgia de Pequenos Animais - UNESP",
      "Pós-Graduação em Ortopedia e Traumatologia Veterinária - ANCLIVEPA",
      "Membro da Associação Brasileira de Ortopedia Veterinária (ABOV)"
    ],
    bio: "Dr. Rafael comanda nosso centro cirúrgico com maestria. Especialista em procedimentos complexos e ortopedia reconstrutiva, sua prioridade absoluta é o controle rigoroso da dor e a reabilitação pós-cirúrgica acelerada dos pacientes.",
    schedule: ["Terça e Sexta: 10:00 - 19:00", "Quinta: 13:00 - 19:00"],
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

export default function Team() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
            Nossa Equipe de <span className="text-vida-blue dark:text-vida-green">Veterinários</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Conheça os profissionais altamente qualificados e carinhosos que estão prontos para oferecer o melhor atendimento ao seu pet.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TEAM_DATA.map((vet) => {
            const isExpanded = expandedId === vet.id;
            return (
              <motion.div
                key={vet.id}
                layout
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo and general */}
                  <div className="relative h-80 overflow-hidden group">
                    <img
                      src={vet.img}
                      alt={vet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                      {vet.crmv}
                    </div>
                    {/* Socials overlay */}
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      <a href={vet.socials.instagram} className="w-8 h-8 rounded-lg bg-slate-900/70 hover:bg-vida-blue text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300">
                        <Camera className="w-4 h-4" />
                      </a>
                      <a href={vet.socials.linkedin} className="w-8 h-8 rounded-lg bg-slate-900/70 hover:bg-vida-blue text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300">
                        <Briefcase className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{vet.name}</h3>
                        <p className="text-xs text-vida-blue dark:text-vida-green font-bold uppercase tracking-wider">{vet.role}</p>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg text-amber-500 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="text-xs font-black">{vet.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 font-semibold border-t border-b border-slate-50 dark:border-slate-700/50 py-3">
                      <span>Exp: {vet.experience}</span>
                      <div className="flex items-center space-x-1">
                        <Globe className="w-3.5 h-3.5 text-vida-blue" />
                        <span>{vet.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-3.5 h-3.5 text-vida-blue" />
                        <span>{vet.reviews} avaliações</span>
                      </div>
                    </div>

                    {/* Bio & Details Toggle */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden space-y-5 pt-3"
                        >
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                            "{vet.bio}"
                          </p>

                          {/* Courses */}
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center space-x-1">
                              <GraduationCap className="w-4 h-4 text-vida-blue" />
                              <span>Formação & Cursos:</span>
                            </h4>
                            <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400 space-y-1 leading-relaxed">
                              {vet.courses.map((course, idx) => (
                                <li key={idx}>{course}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Horários */}
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-vida-blue" />
                              <span>Horários de Plantão:</span>
                            </h4>
                            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                              {vet.schedule.map((time, idx) => (
                                <li key={idx}>{time}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Collapsible button & Action */}
                <div className="px-8 pb-8 pt-2 flex items-center justify-between gap-4 border-t border-slate-50 dark:border-slate-700/30">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : vet.id)}
                    className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-vida-blue flex items-center space-x-1"
                  >
                    <span>{isExpanded ? "Ocultar detalhes" : "Conhecer biografia"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <Link
                    to="/agendamento"
                    state={{ selectedVetId: vet.id }}
                    className="px-4 py-2.5 bg-vida-blue hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300 whitespace-nowrap"
                  >
                    Agendar Consulta
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
