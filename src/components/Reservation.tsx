import React, { useState, useEffect } from 'react';
import { useCafe, ActivePage } from '../context/CafeContext';
import { SeatingArea, Reservation } from '../types';
import { CalendarCheck, Users, HelpCircle, AlertCircle, Info, Sofa, MapPin, Trash2, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReservationView() {
  const { 
    currentUser, 
    reservations, 
    addReservation, 
    cancelReservation, 
    setActivePage,
    showAlert 
  } = useCafe();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('indoor');
  const [occasion, setOccasion] = useState('Casual Meetup');
  const [notes, setNotes] = useState('');

  // Auto-populate logged-in user info
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [currentUser]);

  // Set min date to today's date
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00'
  ];

  const seatingAreas: { value: SeatingArea; label: string; desc: string; icon: string }[] = [
    { value: 'indoor', label: 'Cozy Roastery Booths', desc: 'Warm seating adjacent to the live roasting machine.', icon: '☕' },
    { value: 'terrace', label: 'Sunny Garden Terrace', desc: 'Patio under natural olive trees and fresh air.', icon: '🌿' },
    { value: 'window', label: 'Street-Side Window', desc: 'Tall bar stools overlooking the quiet brick walkway.', icon: '🪟' },
    { value: 'lounge', label: 'Velvet Lounge Corner', desc: 'Extremely soft cushions, quiet, perfect for reading.', icon: '🛋️' }
  ];

  const occasions = [
    'Casual Meetup',
    'Remote Work Focus',
    'Coffee Date',
    'Birthday Celebration',
    'Anniversary',
    'Business Discussion'
  ];

  // Filter reservations made by current user or guest reservations stored in local list
  const userReservations = reservations.filter(r => {
    if (currentUser) {
      return r.userId === currentUser.id || r.email.toLowerCase() === currentUser.email.toLowerCase();
    }
    // If not logged in, show guest reservations made with whatever guest email was filled in current session,
    // or just show recent reservations for this guest
    return r.userId === null;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) {
      showAlert('error', 'Please fill in all required fields.');
      return;
    }

    addReservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea,
      occasion,
      notes
    });

    // Reset some fields (keep user data)
    setDate('');
    setNotes('');
  };

  return (
    <div className="bg-[#0F0F0F] py-16 text-stone-300">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
        <span className="font-serif text-sm italic text-[#C5A059]">Join Our Tables</span>
        <h1 className="mt-2 font-serif text-4xl tracking-wide text-white sm:text-6xl">Book a Table</h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-xs uppercase tracking-widest leading-relaxed">
          Reserve your preferred seating zone instantly. Log in to your account to review and update your active bookings at any time.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#141414] border border-white/5 p-6 md:p-8">
            <h2 className="font-serif text-xl text-white tracking-wide flex items-center gap-2 mb-6">
              <CalendarCheck className="h-5.5 w-5.5 text-[#C5A059]" />
              <span>Table Reservation Request</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Date, Time & Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Date *</label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors color-scheme-dark"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Arrival Time *</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-[#141414] text-white">{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Number of Guests *</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none pl-9 pr-4 py-2.5 text-sm outline-none transition-colors appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num} className="bg-[#141414] text-white">{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Seating preference interactive diagram */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Seating Preference Zone *</label>
                  <span className="text-[8px] text-[#C5A059] font-mono font-medium border border-[#C5A059]/20 bg-[#C5A059]/5 px-2 py-0.5 uppercase tracking-wider">Interactive Selection</span>
                </div>
                
                {/* Simulated table interactive map */}
                <div className="bg-[#1A1A1A] border border-white/5 rounded-none p-5 text-white space-y-4">
                  <div className="text-center font-mono text-[9px] uppercase text-stone-500 tracking-widest">
                    - L'Aroma Interactive Table Layout -
                  </div>
                  
                  {/* Visual Tables Matrix */}
                  <div className="grid grid-cols-4 gap-3">
                    {seatingAreas.map((area) => {
                      const isSelected = seatingArea === area.value;
                      return (
                        <button
                          key={area.value}
                          type="button"
                          onClick={() => setSeatingArea(area.value)}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-none border transition-all text-center group ${
                            isSelected 
                              ? 'bg-[#C5A059] border-[#C5A059] text-[#0F0F0F] font-semibold' 
                              : 'bg-[#0F0F0F] border-white/5 text-stone-400 hover:border-[#C5A059]/30 hover:text-[#C5A059]'
                          }`}
                        >
                          <span className="text-lg mb-1">{area.icon}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider truncate max-w-full">{area.value}</span>
                          <span className={`text-[7px] uppercase mt-0.5 ${isSelected ? 'text-[#0F0F0F]/60' : 'text-stone-600 group-hover:text-stone-400'}`}>Selected</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="text-center py-1.5 border-t border-white/5 text-[11px] text-stone-300 font-sans">
                    <span className="font-serif italic text-[#C5A059]">Selected Area: </span>
                    <span className="font-medium text-white">{seatingAreas.find(a => a.value === seatingArea)?.label}</span> — <span className="text-stone-400 text-xs">{seatingAreas.find(a => a.value === seatingArea)?.desc}</span>
                  </div>
                </div>
              </div>

              {/* Occasion & Special Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o} className="bg-[#141414] text-white">{o}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Special Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Wheelchair access, high chair..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#C5A059] hover:bg-[#B38F4B] text-[#0F0F0F] font-bold text-xs py-4 rounded-none transition-all tracking-widest uppercase mt-4"
              >
                Confirm Table Reservation
              </button>
            </form>
          </div>

          {/* List Side */}
          <div className="lg:col-span-5 space-y-6">
            {/* Session notice */}
            {!currentUser && (
              <div className="bg-[#141414] border border-[#C5A059]/20 p-5 flex items-start space-x-3.5">
                <Info className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-serif text-white text-xs uppercase tracking-wider">Book as Member for Full History</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    You are currently booking as a guest. Your reservation will still save, but to easily manage, cancel, or modify your bookings later, please click below.
                  </p>
                  <button
                    onClick={() => setActivePage('login')}
                    className="text-xs font-serif italic text-[#C5A059] underline underline-offset-4 hover:text-white pt-1 block"
                  >
                    Login / Sign Up
                  </button>
                </div>
              </div>
            )}

            {/* Existing reservations list */}
            <div className="bg-[#141414] border border-white/5 p-6">
              <h3 className="text-lg font-serif text-white flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <span>Your Reservations</span>
                <span className="border border-white/10 bg-white/5 text-[#C5A059] text-[9px] px-2.5 py-0.5 font-mono tracking-widest uppercase">
                  {userReservations.length} total
                </span>
              </h3>

              {userReservations.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <CalendarCheck className="h-8 w-8 mx-auto mb-3 text-stone-600" />
                  <p className="text-xs font-serif italic">No reservations booked yet</p>
                  <p className="text-[10px] text-stone-500 mt-1 max-w-[200px] mx-auto font-sans leading-relaxed">Fill in the table request form to schedule your next dining experience.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {userReservations.map((res) => (
                    <div 
                      key={res.id} 
                      className={`border p-4.5 space-y-3.5 transition-all rounded-none ${
                        res.status === 'cancelled'
                          ? 'bg-[#1A1A1A]/40 border-white/5 opacity-65 text-stone-500'
                          : 'bg-[#1A1A1A] border-white/5 hover:border-[#C5A059]/30 text-white'
                      }`}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif text-sm text-white">Table for {res.guests}</span>
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                              res.status === 'confirmed' 
                                ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/20' 
                                : 'bg-white/5 text-stone-500 border-white/10'
                            }`}>
                              {res.status}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] uppercase text-[#C5A059] tracking-widest block mt-1">
                            {res.seatingArea.replace('-', ' ')} Zone
                          </span>
                        </div>

                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => cancelReservation(res.id)}
                            className="text-stone-500 hover:text-[#C5A059] p-1 border border-transparent hover:border-white/5 transition-colors"
                            title="Cancel booking"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Detail row */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs text-stone-400">
                        <div className="flex items-center space-x-1.5 font-sans">
                          <Clock className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                          <span>{res.date} @ {res.time}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 justify-end text-right font-sans">
                          <Sofa className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                          <span className="truncate">{res.occasion}</span>
                        </div>
                      </div>

                      {res.notes && (
                        <p className="text-[10px] text-stone-400 italic bg-[#0F0F0F] p-2 border border-white/5 mt-1 font-sans">
                          Note: "{res.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
