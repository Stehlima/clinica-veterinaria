import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Formulário de contato enviado:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Basic phone mask helper
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 10) {
      // (XX) XXXXX-XXXX
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 5) {
      // (XX) XXXX-XXXX
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)$/, "$1");
    }
    e.target.value = value;
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white">
            Fale Conosco
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Estamos prontos para atender você e seu pet. Mande uma mensagem, agende por WhatsApp ou faça-nos uma visita!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Telefone */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-2xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Telefone</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">(11) 99999-9999</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">(11) 3333-3333</p>
                </div>
              </div>

              {/* Endereço */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Endereço</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Av. Principal, 1000 - Centro</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cidade Pet - SP</p>
                </div>
              </div>

              {/* Email */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-2xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">E-mail</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">contato@vidapet.com.br</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">suporte@vidapet.com.br</p>
                </div>
              </div>

              {/* Horário */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-vida-blue/10 dark:bg-vida-blue/20 text-vida-blue rounded-2xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Funcionamento</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Seg a Sex: 08h às 20h</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-rose-500 dark:text-rose-400 font-bold">Emergências: 24 Horas</p>
                </div>
              </div>

            </div>

            {/* Google Maps Iframe */}
            <div className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-white dark:border-slate-800 h-80 relative">
              <iframe
                title="Google Maps Vida Pet"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.481977797746!2d-46.662497685022375!3d-23.551187484687588!2m3!1f0!2f0!3f0!2m3!1i1025!2i790!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d0b67e2a9b%3A0xcd50f443b71eb243!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1656000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-8 sm:p-10 rounded-[2.5rem] shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Mande uma mensagem</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nome */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Nome Completo</label>
                  <input
                    type="text"
                    {...register("name", { required: "Nome é obrigatório" })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                    placeholder="Seu nome"
                  />
                  {errors.name && <span className="text-xs text-rose-500 font-semibold">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">E-mail</label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "E-mail é obrigatório",
                      pattern: { value: /^\S+@\S+$/i, message: "Insira um e-mail válido" }
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                    placeholder="exemplo@email.com"
                  />
                  {errors.email && <span className="text-xs text-rose-500 font-semibold">{errors.email.message}</span>}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Telefone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Telefone</label>
                  <input
                    type="text"
                    {...register("phone", { required: "Telefone é obrigatório" })}
                    onInput={handlePhoneInput}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && <span className="text-xs text-rose-500 font-semibold">{errors.phone.message}</span>}
                </div>

                {/* Assunto */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Assunto</label>
                  <input
                    type="text"
                    {...register("subject", { required: "Assunto é obrigatório" })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white"
                    placeholder="Qual o motivo do contato?"
                  />
                  {errors.subject && <span className="text-xs text-rose-500 font-semibold">{errors.subject.message}</span>}
                </div>

              </div>

              {/* Mensagem */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Mensagem</label>
                <textarea
                  rows={4}
                  {...register("message", { required: "Mensagem é obrigatória" })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-vida-blue text-slate-800 dark:text-white resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                />
                {errors.message && <span className="text-xs text-rose-500 font-semibold">{errors.message.message}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-vida-blue hover:bg-blue-600 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensagem</span>
              </button>

              {/* Toast de Sucesso */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 rounded-2xl text-sm font-semibold flex items-center space-x-2.5 shadow-sm"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Mensagem enviada com sucesso! Responderemos em breve. 🎉</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
