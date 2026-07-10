import React, { useState } from 'react';
import { useCafe, ActivePage } from '../context/CafeContext';
import { Coffee, Menu, X, User as UserIcon, LogOut, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { activePage, setActivePage, currentUser, logout } = useCafe();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Reservations', page: 'reservation' },
    { label: 'Our Story', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F0F0F]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex cursor-pointer items-center space-x-3 text-stone-100 group"
        >
          <div className="w-8 h-8 bg-[#C5A059] rounded-xs rotate-45 flex items-center justify-center transition-transform group-hover:rotate-135 duration-500">
            <div className="w-4 h-4 border border-[#0F0F0F] -rotate-45 flex items-center justify-center">
              <Coffee className="h-2.5 w-2.5 text-[#0F0F0F]" id="navbar-logo-icon" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-widest uppercase text-[#C5A059]">L'Aroma</span>
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/50">Artisan Cafe</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`relative py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-[#C5A059] ${
                activePage === item.page ? 'text-[#C5A059]' : 'text-white/70'
              }`}
            >
              {item.label}
              {activePage === item.page && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#C5A059]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('login')}
                className="flex items-center space-x-2 text-white/90 hover:text-[#C5A059] text-[10px] uppercase tracking-wider bg-white/5 hover:bg-white/10 py-2.5 px-4 border border-white/10 transition-colors"
              >
                <UserIcon className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>{currentUser.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={logout}
                title="Sign Out"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/50 hover:text-rose-400 hover:border-rose-500 hover:bg-rose-500/5 transition-all"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="flex items-center space-x-2 border border-[#C5A059]/30 text-[#C5A059] text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-black py-2.5 px-4 transition-colors"
            >
              <UserIcon className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('reservation')}
            className="flex items-center space-x-2 bg-[#C5A059] text-black text-[10px] uppercase tracking-widest font-bold py-2.5 px-5 hover:bg-[#b08e4d] transition-colors"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => handleNavClick('reservation')}
            className="bg-[#C5A059] text-black p-2 rounded-xs transition-colors"
            title="Book a Table"
          >
            <CalendarCheck className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/80 hover:bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#121212] md:hidden"
          >
            <div className="space-y-1 px-6 py-5">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex w-full items-center py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    activePage === item.page ? 'text-[#C5A059] border-l-2 border-[#C5A059] pl-2' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <hr className="my-4 border-white/5" />

              <div className="space-y-3 pt-2">
                {currentUser ? (
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3 bg-white/5 py-2.5 px-3 border border-white/10">
                      <UserIcon className="h-5 w-5 text-[#C5A059]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-white">{currentUser.name}</span>
                        <span className="text-[10px] text-white/55 font-mono">{currentUser.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick('login')}
                      className="flex w-full items-center justify-center space-x-2 py-2.5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-white/80 hover:bg-white/5"
                    >
                      <span>View Account</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center space-x-2 py-2.5 border border-rose-900/40 bg-rose-950/20 text-xs font-semibold uppercase tracking-widest text-rose-400 hover:bg-rose-950/35"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick('login')}
                    className="flex w-full items-center justify-center space-x-2 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold uppercase tracking-widest py-3 hover:bg-[#C5A059] hover:text-black transition-colors"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
