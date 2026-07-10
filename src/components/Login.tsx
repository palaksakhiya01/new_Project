import React, { useState } from 'react';
import { useCafe, ActivePage } from '../context/CafeContext';
import { User, LogIn, UserPlus, ShieldAlert, Star, Sofa, CalendarCheck, Clock, Trash2, LogOut, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginView() {
  const { 
    currentUser, 
    login, 
    register, 
    logout, 
    reservations, 
    cancelReservation, 
    addReview,
    setActivePage,
    showAlert 
  } = useCafe();

  const [isSignUp, setIsSignUp] = useState(false);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  
  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Review state (For logged in users)
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Handle Form Actions
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    
    const success = login(loginEmail);
    if (success) {
      setLoginEmail('');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      showAlert('error', 'Name and email are required.');
      return;
    }

    const success = register(regName, regEmail, regPhone);
    if (success) {
      setRegName('');
      setRegEmail('');
      setRegPhone('');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (currentUser) {
      addReview(currentUser.name, rating, comment);
      setComment('');
      setRating(5);
    }
  };

  const userReservations = reservations.filter(r => {
    if (!currentUser) return false;
    return r.userId === currentUser.id || r.email.toLowerCase() === currentUser.email.toLowerCase();
  });

  // 1. Authenticated User Profile view
  if (currentUser) {
    return (
      <div className="bg-[#0F0F0F] py-16 text-stone-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Column 1: Account Info & Add Review */}
            <div className="lg:col-span-5 space-y-8">
              {/* Profile Card */}
              <div className="bg-[#141414] border border-white/5 p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-white tracking-wide">{currentUser.name}</h2>
                    <span className="font-mono text-[9px] uppercase text-[#C5A059] tracking-widest font-semibold">Verified Member</span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-stone-400 border-t border-white/5 pt-5">
                  <li className="flex justify-between">
                    <span className="text-stone-500">Account Email:</span>
                    <span className="font-medium text-stone-300">{currentUser.email}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500">Phone Number:</span>
                    <span className="font-medium text-stone-300">{currentUser.phone || 'Not specified'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500">Member Since:</span>
                    <span className="font-medium text-stone-300">
                      {new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </li>
                </ul>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 border border-rose-950 bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 font-bold text-xs py-3 rounded-none transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>

              {/* Leave a Review */}
              <div className="bg-[#141414] border border-white/5 p-6 space-y-4">
                <h3 className="text-base font-serif text-white tracking-wide flex items-center gap-1.5">
                  <Coffee className="h-5 w-5 text-[#C5A059]" />
                  <span>Leave a Review</span>
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  How was your recent pour-over or seating arrangement? Share your experience with the neighborhood.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Rating Selection</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="hover:scale-110 transition-transform cursor-pointer text-[#C5A059]"
                        >
                          <Star className={`h-6 w-6 ${num <= rating ? 'fill-[#C5A059]' : 'text-stone-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Your Feedback *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Loved the artisan flat white and friendly service..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-3.5 py-2.5 text-xs outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C5A059] hover:bg-[#B38F4B] text-[#0F0F0F] font-bold text-xs py-2.5 rounded-none transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>

            {/* Column 2: Booking Management */}
            <div className="lg:col-span-7 bg-[#141414] border border-white/5 p-6 md:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
                <h3 className="font-serif text-lg text-white tracking-wide flex items-center gap-2">
                  <CalendarCheck className="h-5.5 w-5.5 text-[#C5A059]" />
                  <span>My Reservations History</span>
                </h3>
                <span className="border border-white/10 bg-white/5 text-[#C5A059] text-[9px] px-3 py-1 font-mono tracking-widest uppercase">
                  {userReservations.length} total
                </span>
              </div>

              {userReservations.length === 0 ? (
                <div className="text-center py-20 text-stone-500">
                  <CalendarCheck className="h-10 w-10 mx-auto mb-3 text-stone-600" />
                  <p className="text-sm font-serif italic text-white">No active bookings found</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-[240px] mx-auto font-sans leading-relaxed">
                    You can schedule a quiet work booth, terrace, or window-side table in seconds.
                  </p>
                  <button
                    onClick={() => setActivePage('reservation')}
                    className="mt-6 bg-[#C5A059] text-[#0F0F0F] font-bold text-xs px-5 py-3 rounded-none tracking-widest uppercase hover:bg-[#B38F4B] cursor-pointer"
                  >
                    Go Book a Table
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userReservations.map((res) => (
                    <div 
                      key={res.id} 
                      className={`border p-5 space-y-4 transition-all rounded-none ${
                        res.status === 'cancelled'
                          ? 'bg-[#1A1A1A]/40 border-white/5 opacity-65 text-stone-500'
                          : 'bg-[#1A1A1A] border-white/5 hover:border-[#C5A059]/30'
                      }`}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-serif text-base text-white">Table for {res.guests} Guests</h4>
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                              res.status === 'confirmed' 
                                ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/20' 
                                : 'bg-white/5 text-stone-500 border-white/10'
                            }`}>
                              {res.status}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] uppercase text-[#C5A059] tracking-widest block mt-1">
                            {res.seatingArea.replace('-', ' ')} seating Area
                          </span>
                        </div>

                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => cancelReservation(res.id)}
                            className="flex items-center space-x-1.5 border border-white/10 text-stone-400 hover:text-rose-400 hover:border-rose-950 hover:bg-rose-950/20 px-3 py-1.5 rounded-none text-xs transition-colors cursor-pointer"
                            title="Cancel booking"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>

                      {/* Detail row */}
                      <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-white/5 text-xs text-stone-400">
                        <div className="flex items-center space-x-2 font-sans">
                          <Clock className="h-4 w-4 text-stone-500 shrink-0" />
                          <span>{res.date} @ {res.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 justify-end text-right font-sans">
                          <Sofa className="h-4 w-4 text-stone-500 shrink-0" />
                          <span className="truncate">{res.occasion}</span>
                        </div>
                      </div>

                      {res.notes && (
                        <p className="text-[11px] text-stone-400 italic bg-[#0F0F0F] p-2 border border-white/5 font-sans">
                          Special Note: "{res.notes}"
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
    );
  }

  // 2. Unauthenticated Form Switcher (Login or Sign Up)
  return (
    <div className="bg-[#0F0F0F] py-24 px-6 flex items-center justify-center min-h-[calc(100vh-5rem)] text-stone-300">
      <div className="w-full max-w-md bg-[#141414] border border-white/5 p-8">
        
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5 mb-3">
            <Coffee className="h-5.5 w-5.5" />
          </div>
          <h2 className="font-serif text-xl tracking-widest uppercase text-white">L'Aroma</h2>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            {isSignUp ? 'Create your artisan membership account.' : 'Sign in to review and manage table bookings.'}
          </p>
        </div>

        {/* Tab Header */}
        <div className="grid grid-cols-2 border border-white/10 p-1 rounded-none mb-6 bg-[#0F0F0F]">
          <button
            onClick={() => setIsSignUp(false)}
            className={`py-2 text-xs font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer ${
              !isSignUp ? 'bg-[#C5A059] text-[#0F0F0F]' : 'text-stone-500 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`py-2 text-xs font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer ${
              isSignUp ? 'bg-[#C5A059] text-[#0F0F0F]' : 'text-stone-500 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {!isSignUp ? (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            <div className="bg-[#0F0F0F] border border-[#C5A059]/10 p-3.5 flex items-start space-x-2.5">
              <ShieldAlert className="h-4.5 w-4.5 text-[#C5A059] shrink-0 mt-0.5" />
              <p className="text-[10px] text-stone-400 leading-normal font-sans">
                To simplify your access, password inputs are omitted. Any registered member email can log in instantly.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C5A059] hover:bg-[#B38F4B] text-[#0F0F0F] font-bold text-xs py-3 rounded-none transition-all tracking-widest uppercase cursor-pointer"
            >
              Log In
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">Phone Number (Optional)</label>
              <input
                type="tel"
                placeholder="+1 (555) 0199"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#C5A059] text-white rounded-none px-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C5A059] hover:bg-[#B38F4B] text-[#0F0F0F] font-bold text-xs py-3 rounded-none transition-all tracking-widest uppercase cursor-pointer"
            >
              Create Member Account
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-[10px] tracking-wider uppercase text-stone-600 font-mono">
          * Standard email format required. We never share your data.
        </div>
      </div>
    </div>
  );
}
