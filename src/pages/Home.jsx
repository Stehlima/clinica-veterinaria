import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Calendar, Award, ShieldAlert, Sparkles, Clock, 
  ChevronDown, ChevronUp, Star, ArrowRight, Activity, Smile, Stethoscope
} from 'lucide-react';

// Unsplash images for the site
const HERO_VET_IMG = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800";

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800"
];

const TESTIMONIALS = [
  {
    name: "Mariana Souza",
    pet: "Pipoca (Golden Retriever)",
    rating: 5,
    comment: "O atendimento na Vida Pet é simplesmente excepcional. O Dr. Bruno tratou o Pipoca com um carinho que nunca vi antes. A estrutura da clínica é impecável!",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Rodrigo Alencar",
    pet: "Frajola (Gato)",
    rating: 5,
    comment: "Precisei de atendimento emergencial de madrugada e fui prontamente atendido. Equipe ágil, atenciosa e muito profissional. Recomendo fortemente a Vida Pet.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Cláudia Santos",
    pet: "Bela (Spitz Alemão)",
    rating: 5,
    comment: "Clínica moderna, profissionais competentes e carinhosos. A Bela faz o tratamento dentário lá e sempre sai feliz. O sistema de agendamento online é muito prático.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  }
];

const FAQS = [
  {
    q: "Preciso agendar consulta ou atendem por ordem de chegada?",
    a: "Para consultas de rotina, vacinas e exames, recomendamos o agendamento prévio para evitar esperas. No entanto, casos de urgência e emergência são atendidos imediatamente, 24 horas por dia, sem necessidade de agendamento."
  },
  {
    q: "Quais espécies de animais vocês atendem?",
    a: "Atendemos cães, gatos, aves, coelhos, roedores, répteis e outros animais silvestres/exóticos. Temos veterinários especialistas para cada grupo."
  },
  {
    q: "Vocês atendem emergências 24 horas?",
    a: "Sim, possuímos uma equipe de plantão e centro de terapia intensiva funcionando 24 horas por dia, 7 dias por semana, inclusive em feriados, prontos para qualquer emergência médica ou cirúrgica."
  },
  {
    q: "Como funciona o esquema de vacinação na clínica?",
    a: "Montamos um calendário vacinal personalizado de acordo com a espécie, idade e estilo de vida do seu pet. Utilizamos apenas vacinas importadas de altíssima qualidade para garantir a máxima proteção."
  },
  {
    q: "Vocês aceitam planos de saúde/convênios veterinários?",
    a: "Sim, aceitamos os principais planos de saúde pet do mercado (como Porto Pet, Nofaro e Amil Pet). Entre em contato para confirmar a cobertura do seu plano específico."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Auto gallery slider
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % GALLERY_IMGS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/90 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-vida-blue/10 dark:bg-vida-green/10 text-vida-blue dark:text-vida-green px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>Cuidado e amor em primeiro lugar</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight">
                Cuidando da saúde do seu <span className="text-vida-blue dark:text-vida-green">melhor amigo</span>.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Na Vida Pet oferecemos atendimento veterinário completo com carinho, tecnologia de ponta e profissionais altamente especializados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/agendamento"
                  className="px-8 py-4 bg-vida-blue hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Agendar Consulta</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/servicos"
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 text-center transition-all duration-300"
                >
                  Conhecer Serviços
                </Link>
              </div>
            </motion.div>

            {/* Hero Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-vida-blue/20 to-vida-green/20 rounded-3xl blur-3xl opacity-60 dark:opacity-40" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 w-full max-w-lg aspect-square">
                <img
                  src={HERO_VET_IMG}
                  alt="Veterinário atendendo pet feliz"
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid de Ícones Rápidos */}
      <section className="py-12 bg-white dark:bg-slate-800 border-y border-slate-100 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: "🐶", title: "Atendimento Humanizado", desc: "Muito amor e carinho" },
              { icon: "🐱", title: "Vet Especialistas", desc: "Equipe de alto nível" },
              { icon: "🏥", title: "Estrutura Moderna", desc: "Equipamentos de ponta" },
              { icon: "📅", title: "Hora Marcada", desc: "Sem filas de espera" },
              { icon: "⭐", title: "8k+ Pets Atendidos", desc: "Confiança comprovada" },
              { icon: "❤️", title: "Emergência 24h", desc: "Sempre prontos" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que escolher a Vida Pet */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16 space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">
              Por que escolher a Vida Pet?
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Oferecemos uma experiência completa com foco na saúde, bem-estar e segurança dos animais que você mais ama.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Activity className="w-8 h-8 text-vida-blue" />, title: "Equipamentos modernos", desc: "Tecnologia de última geração para diagnósticos precisos." },
              { icon: <Clock className="w-8 h-8 text-vida-blue" />, title: "Atendimento rápido", desc: "Minimizamos a espera para dar o máximo conforto ao pet." },
              { icon: <ShieldAlert className="w-8 h-8 text-vida-blue" />, title: "Vacinação completa", desc: "Campanhas e vacinas importadas atualizadas." },
              { icon: <Heart className="w-8 h-8 text-vida-blue" />, title: "Centro cirúrgico", desc: "Infraestrutura estéril e monitoramento completo dos sinais vitais." },
              { icon: <Stethoscope className="w-8 h-8 text-vida-blue" />, title: "Laboratório próprio", desc: "Resultados rápidos para exames de sangue e urgências." },
              { icon: <Smile className="w-8 h-8 text-vida-blue" />, title: "Emergência de plantão", desc: "Profissionais prontos para acolhimento emergencial 24h." }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 bg-vida-blue/10 dark:bg-vida-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{card.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-16"
          >
            Como Funciona o Atendimento
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: "01", title: "Agende pelo site", desc: "Escolha o melhor dia e horário em poucos cliques no celular ou desktop." },
              { step: "02", title: "Escolha o veterinário", desc: "Selecione o profissional especialista ideal para a necessidade do seu pet." },
              { step: "03", title: "Leve seu pet", desc: "Traga-o à clínica com toda segurança e seja acolhido por nossa equipe receptiva." },
              { step: "04", title: "Receba o atendimento", desc: "Exames, orientações e receitas passadas de forma transparente e humanizada." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="text-4xl font-black text-vida-blue/20 dark:text-vida-green/20 mb-4">{step.step}</div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                
                {/* Arrow helper for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-vida-blue dark:text-vida-green font-bold text-xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria da Clínica (Slider Automático) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
              Nossa Clínica
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Conheça nosso espaço aconchegante, limpo e projetado para acalmar os pets e seus tutores.
            </p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryIndex}
                src={GALLERY_IMGS[galleryIndex]}
                alt={`Foto da clinica ${galleryIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {GALLERY_IMGS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    idx === galleryIndex ? 'bg-vida-blue w-7' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos dos Clientes */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-16">
            O que dizem os tutores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm relative text-left flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-vida-blue dark:text-vida-green font-semibold">{t.pet}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-slate-800 dark:text-white hover:text-vida-blue transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/50 pt-4 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-vida-blue to-blue-700 text-white relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Seu pet merece o melhor cuidado.
          </h2>
          <p className="text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Estamos prontos para atender seu pet com toda a segurança, empatia e conhecimento profissional que ele merece.
          </p>
          <div className="pt-4">
            <Link
              to="/agendamento"
              className="inline-flex items-center space-x-2 bg-white text-vida-blue hover:bg-slate-100 font-extrabold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Consulta</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
