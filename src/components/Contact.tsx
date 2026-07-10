import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Info } from 'lucide-react';

export default function Contact() {
  const { addContactMessage } = useCafe();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const subjects = [
    'General Inquiry',
    'Private Catering Event',
    'Career Opportunities',
    'Feedback & Suggestion',
    'Roastery Bean Partnership'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    addContactMessage({
      name,
      email,
      subject,
      message
    });

    // Reset fields
    setName('');
    setEmail('');
    setSubject('General Inquiry');
    setMessage('');
  };

  return (
    <div className="bg-[#0F0F0F] py-16 text-stone-300">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
        <span className="font-serif text-sm italic text-[#C5A059]">Get In Touch</span>
        <h1 className="mt-2 font-serif text-4xl tracking-wide text-white sm:text-6xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-xs uppercase tracking-widest leading-relaxed">
          Want to discuss private events, wholesale roasts, or simply share some coffee feedback? Reach our baristas and manager directly.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-7 bg-[#141414] border border-white/5 p-6 md:p-8">
            <h2 className="font-serif text-xl text-white tracking-wide flex items-center gap-2 mb-6">
              <Send className="h-5 w-5 text-[#C5A059]" />
              <span>Send Us a Direct Message</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Subject / Topic *</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub} className="bg-[#141414] text-white">{sub}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Message / Content *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you're thinking..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C5A059] hover:bg-[#B38F4B] text-[#0F0F0F] font-bold text-xs py-4 rounded-none transition-all tracking-widest uppercase"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Details & Location Map Section */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact cards */}
            <div className="bg-[#141414] border border-white/5 p-6 space-y-6">
              <h3 className="text-lg font-serif text-white pb-2 border-b border-white/5">
                Contact Details
              </h3>

              <ul className="space-y-5 text-sm text-stone-400">
                <li className="flex items-start space-x-4">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Call Bar Counter</h4>
                    <p className="text-stone-300 mt-0.5 font-medium font-sans">+1 (555) 349-4321</p>
                    <p className="text-[10px] text-stone-500 font-sans">Available during operating hours</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Write Email</h4>
                    <p className="text-stone-300 mt-0.5 font-medium font-sans font-sans">hello@laromacafe.com</p>
                    <p className="text-[10px] text-stone-500 font-sans">Response guaranteed in 24 hours</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="flex h-9 w-9 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[10px] uppercase tracking-widest font-mono">Visit Us</h4>
                    <p className="text-stone-300 mt-0.5 leading-relaxed font-medium font-sans">
                      456 Brew Street, Coffee District, CA 90210
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Vector Map */}
            <div className="bg-[#141414] border border-white/5 p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase tracking-widest font-mono text-stone-400">Neighborhood Map</h4>
                <span className="text-[10px] text-[#C5A059] font-mono font-semibold flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-[#C5A059] inline-block animate-ping mr-1" />
                  Open Now
                </span>
              </div>

              {/* Styled Mock Vector Map */}
              <div className="relative h-44 w-full bg-[#0F0F0F] border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Horizontal Road */}
                <div className="absolute left-0 right-0 h-4 bg-white/5 flex items-center">
                  <div className="w-full border-t border-dashed border-white/10" />
                </div>
                {/* Vertical Road */}
                <div className="absolute top-0 bottom-0 w-4 bg-white/5 left-1/3 flex flex-col justify-between">
                  <div className="h-full border-l border-dashed border-white/10" />
                </div>

                {/* Grid blocks */}
                <div className="absolute right-8 top-4 w-12 h-10 bg-white/5 border border-white/10 text-center text-[7px] text-stone-500 pt-1">
                  Park
                </div>
                <div className="absolute left-4 bottom-4 w-16 h-12 bg-white/5 border border-white/10 text-center text-[7px] text-stone-500 pt-1">
                  Subway
                </div>

                {/* Marker */}
                <div className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C5A059] border border-[#0F0F0F]" />
                  </div>
                  <span className="bg-[#141414] text-stone-300 border border-white/10 text-[8px] px-1.5 py-0.5 mt-1 font-bold whitespace-nowrap shadow-md tracking-wider uppercase font-mono">
                    L'Aroma Cafe
                  </span>
                </div>
              </div>

              <div className="text-center font-mono text-[9px] uppercase tracking-wider text-stone-500 pt-1">
                LAT: 34.0522° N &nbsp;|&nbsp; LNG: 118.2437° W
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
