import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Tag, ChevronDown, ChevronUp, CheckCircle, ShieldAlert } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    name: "Consulta Clínica",
    category: "Consultas",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    desc: "Avaliação completa da saúde do seu animal de estimação. Realizada por veterinários experientes, engloba verificação de peso, temperatura, auscultação cardiopulmonar e exame físico detalhado de orelhas, olhos, boca, pele e pelos.",
    benefits: [
      "Check-up preventivo completo",
      "Orientações nutricionais e comportamentais",
      "Diagnósticos precoces de patologias",
      "Veterinários gerais e especialistas disponíveis"
    ],
    time: "30 a 50 min",
    price: "R$ 150,00",
    faq: {
      q: "Com que frequência meu pet deve ir ao veterinário para consulta?",
      a: "Recomendamos que filhotes e idosos visitem a cada 6 meses, enquanto adultos saudáveis devem realizar consultas preventivas anualmente."
    }
  },
  {
    id: 2,
    name: "Vacinação Importada",
    category: "Vacinas",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
    desc: "Aplicação de vacinas éticas (importadas) essenciais para cães e gatos, protegendo contra doenças graves como Raiva, Cinomose, Parvovirose, Hepatite Infecciosa, Panleucopenia, Rinotraqueíte e Calicivirose.",
    benefits: [
      "Vacinas originais de laboratórios internacionais conceituados",
      "Carteira de vacinação digital atualizada",
      "Imunidade garantida para seu companheiro",
      "Triagem prévia à vacinação inclusa"
    ],
    time: "15 a 20 min",
    price: "R$ 90,00",
    faq: {
      q: "O pet pode tomar vacina se estiver com sintomas de resfriado?",
      a: "Não. Antes de qualquer vacinação, o veterinário realiza uma triagem. Animais com febre, apatia ou em tratamento médico não devem ser imunizados até a total recuperação."
    }
  },
  {
    id: 3,
    name: "Cirurgias Gerais",
    category: "Cirurgias",
    img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600",
    desc: "Procedimentos cirúrgicos realizados em centro cirúrgico estéril por cirurgião qualificado, com monitoramento anestésico ininterrupto (anestesia inalatória e monitor multiparamétrico).",
    benefits: [
      "Anestesia inalatória de última geração",
      "Sala cirúrgica com pressão positiva",
      "Equipe de suporte dedicada no pós-operatório",
      "Monitoramento constante de sinais vitais"
    ],
    time: "1 a 3 horas",
    price: "Sob Consulta",
    faq: {
      q: "Como funciona a preparação para uma cirurgia?",
      a: "É obrigatório jejum alimentar de 8 a 12 horas e hídrico de 2 a 4 horas. Exames pré-operatórios de sangue e eletrocardiograma também são solicitados."
    }
  },
  {
    id: 4,
    name: "Castração",
    category: "Cirurgias",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    desc: "Cirurgia eletiva recomendada para cães e gatos de ambos os sexos. Evita ninhadas indesejadas, reduz comportamentos territoriais agressivos e previne cânceres (de mama, útero, próstata e testículos).",
    benefits: [
      "Prevenção de doenças reprodutivas",
      "Aumento da expectativa de vida do animal",
      "Procedimento rápido e alta no mesmo dia",
      "Suturas cirúrgicas com técnicas minimamente invasivas"
    ],
    time: "45 a 90 min",
    price: "R$ 350,00",
    faq: {
      q: "Qual a melhor idade para castrar meu pet?",
      a: "Geralmente a partir dos 6 meses de idade, antes do primeiro cio em fêmeas e no início da puberdade em machos, mas o veterinário pode avaliar o momento ideal."
    }
  },
  {
    id: 5,
    name: "Exames de Sangue e Clínicos",
    category: "Exames",
    img: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=600",
    desc: "Coleta e análise rápida em laboratório interno para exames hematológicos (hemograma completo), bioquímicos (função renal e hepática) e exames de urina e fezes.",
    benefits: [
      "Laboratório interno para agilizar diagnósticos",
      "Resultados digitais enviados direto para o WhatsApp/E-mail",
      "Indispensável para prevenção e antes de cirurgias",
      "Coleta rápida por profissionais experientes em manejo cat-friendly"
    ],
    time: "20 min (coleta)",
    price: "R$ 80,00",
    faq: {
      q: "Quanto tempo demora para saírem os resultados dos exames?",
      a: "Exames básicos como hemograma completo ficam prontos em até 2 horas. Bioquímicos e outros específicos podem levar de 24h a 48h."
    }
  },
  {
    id: 6,
    name: "Ultrassom e Raio-X",
    category: "Exames",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    desc: "Exames de imagem precisos para avaliação de órgãos internos, ossos e articulações. Essencial para diagnósticos abdominais, gestacionais ou avaliação de fraturas.",
    benefits: [
      "Equipamentos digitais de alta definição",
      "Laudo emitido por especialistas em imagem",
      "Método seguro, indolor e não invasivo",
      "Acompanhamento em tempo real para os tutores"
    ],
    time: "30 a 40 min",
    price: "R$ 180,00",
    faq: {
      q: "O animal precisa ser sedado para fazer raio-x ou ultrassom?",
      a: "A maioria dos pets não precisa de sedação. Ela só é recomendada se o animal estiver com muita dor ou for extremamente agitado, impossibilitando a captura de imagens de qualidade."
    }
  },
  {
    id: 7,
    name: "Banho e Tosa",
    category: "Banho e Tosa",
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600",
    desc: "Serviço de estética animal premium com shampoos adequados ao tipo de pele e pelo, secagem cuidadosa, tosa higiênica, tosa da raça (tesoura ou máquina), corte de unhas e limpeza de ouvidos.",
    benefits: [
      "Produtos hipoalergênicos e profissionais capacitados",
      "Toalhas esterilizadas individualmente",
      "Secagem em temperatura controlada",
      "Tosa especializada para cada padrão de raça"
    ],
    time: "1 a 2 horas",
    price: "R$ 70,00",
    faq: {
      q: "Vocês atendem cães de grande porte e gatos para banho?",
      a: "Sim, atendemos animais de todos os portes e raças. Para felinos, oferecemos horários reservados em salas separadas e silenciosas para reduzir o estresse."
    }
  },
  {
    id: 8,
    name: "Emergência 24 Horas",
    category: "Emergência",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
    desc: "Pronto-atendimento veterinário ininterrupto para casos graves como atropelamentos, intoxicações, convulsões, obstrução urinária, partos difíceis e sangramentos abundantes.",
    benefits: [
      "Médico veterinário intensivista de plantão permanente",
      "UTI moderna equipada com suporte de oxigênio",
      "Triagem de emergência rápida",
      "Acesso imediato a exames de sangue e cirurgia"
    ],
    time: "Atendimento Imediato",
    price: "R$ 250,00 (Plantão)",
    faq: {
      q: "O que é considerado uma emergência?",
      a: "Animais com dificuldades respiratórias severas, perda de consciência, sangramentos que não param, ingestão de veneno ou convulsões recorrentes são emergências críticas e devem ser trazidos imediatamente."
    }
  }
];

const FILTERS = ["Todos", "Consultas", "Vacinas", "Exames", "Cirurgias", "Banho e Tosa", "Emergência"];

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [expandedCard, setExpandedCard] = useState(null);

  const filteredServices = activeFilter === "Todos" 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeFilter);

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
            Nossos <span className="text-vida-blue dark:text-vida-green">Serviços</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Oferecemos uma gama completa de cuidados médicos, preventivos e estéticos para que seu pet cresça forte, saudável e muito feliz.
          </p>
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setExpandedCard(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-vida-blue text-white border-vida-blue shadow-lg shadow-vida-blue/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-vida-blue dark:hover:border-vida-green'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Services List */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const isExpanded = expandedCard === service.id;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative h-60 overflow-hidden group">
                      <img
                        src={service.img}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {service.category === "Emergência" && (
                        <div className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-md">
                          <ShieldAlert className="w-4 h-4 animate-pulse" />
                          <span>24 Horas</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 rounded-lg text-xs font-bold text-vida-blue dark:text-vida-green shadow-sm">
                        {service.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{service.name}</h3>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {service.desc}
                      </p>

                      {/* Micro details */}
                      <div className="flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 font-semibold border-t border-b border-slate-100 dark:border-slate-700/50 py-3.5">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-vida-blue" />
                          <span>Duração: {service.time}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Tag className="w-4 h-4 text-vida-blue" />
                          <span>A partir de: {service.price}</span>
                        </div>
                      </div>

                      {/* Expandable Section (Benefits and FAQ) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-6 pt-4"
                          >
                            {/* Benefits */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Benefícios Principais:</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {service.benefits.map((b, i) => (
                                  <div key={i} className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-vida-green shrink-0 mt-0.5" />
                                    <span>{b}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* FAQ */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                              <h5 className="text-xs font-bold text-vida-blue dark:text-vida-green uppercase tracking-wider mb-1">Dúvida Frequente:</h5>
                              <p className="font-bold text-slate-800 dark:text-white text-xs mb-1.5">{service.faq.q}</p>
                              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{service.faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-8 pb-8 pt-2 flex items-center justify-between gap-4 border-t border-slate-50 dark:border-slate-700/30">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                      className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-vida-blue flex items-center space-x-1"
                    >
                      <span>{isExpanded ? "Esconder detalhes" : "Ver benefícios e FAQ"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <Link
                      to="/agendamento"
                      className="px-5 py-2.5 bg-vida-blue hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300"
                    >
                      Agendar
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
