import React, { useState } from 'react';
import { useCafe, ActivePage } from '../context/CafeContext';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const { setActivePage, showAlert } = useCafe();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showAlert('success', `Thank you! ${email} has been added to our exclusive offers club.`);
    setEmail('');
  };

  const handleLinkClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0B] text-stone-300 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#C5A059] rounded-xs rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 border border-[#0F0F0F] -rotate-45 flex items-center justify-center">
                  <Coffee className="h-2.5 w-2.5 text-[#0F0F0F]" />
                </div>
              </div>
              <span className="font-serif text-lg font-bold tracking-widest uppercase text-white">L'AROMA</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              We specialize in meticulously roasted micro-lot coffees, fresh daily pastries, and hearty brunch. Creating cozy communities one perfect cup at a time.
            </p>
            <div className="flex space-x-3">
              <a href="#instagram" className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#C5A059] hover:bg-white/10 text-stone-400 hover:text-[#C5A059] transition-all" title="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#facebook" className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#C5A059] hover:bg-white/10 text-stone-400 hover:text-[#C5A059] transition-all" title="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#twitter" className="h-8 w-8 flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#C5A059] hover:bg-white/10 text-stone-400 hover:text-[#C5A059] transition-all" title="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-xs font-serif uppercase tracking-[0.2em] text-[#C5A059]">Quick Links</h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => handleLinkClick('home')} className="text-white/60 hover:text-[#C5A059] transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('menu')} className="text-white/60 hover:text-[#C5A059] transition-colors">
                  Our Culinary Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('reservation')} className="text-white/60 hover:text-[#C5A059] transition-colors">
                  Book a Table
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="text-white/60 hover:text-[#C5A059] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="text-white/60 hover:text-[#C5A059] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('login')} className="text-white/60 hover:text-[#C5A059] transition-colors">
                  My Profile / Login
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div className="space-y-5 text-xs">
            <h3 className="text-xs font-serif uppercase tracking-[0.2em] text-[#C5A059]">Cafe Hours</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-white/60">
                <Clock className="h-4 w-4 text-[#C5A059] shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">Mon - Fri: 7:00 AM - 8:00 PM</p>
                  <p className="text-[10px] text-white/40 mt-0.5">Kitchen closes at 7:30 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-white/60">
                <Clock className="h-4 w-4 text-[#C5A059] shrink-0" />
                <div>
                  <p className="text-white/90 font-medium">Sat - Sun: 8:00 AM - 9:00 PM</p>
                  <p className="text-[10px] text-white/40 mt-0.5">Kitchen closes at 8:30 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-white/60">
                <MapPin className="h-4 w-4 text-[#C5A059] shrink-0" />
                <span className="text-white/90">456 Brew Street, Coffee District, CA 90210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Club */}
          <div className="space-y-5">
            <h3 className="text-xs font-serif uppercase tracking-[0.2em] text-[#C5A059]">Join the Roast Club</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Subscribe to receive updates on micro-lot coffee drops, special events, weekend menus, and seasonal reservation bookings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 focus:border-[#C5A059] px-4 py-2.5 text-xs text-white placeholder-stone-600 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold uppercase tracking-widest text-[10px] py-3 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40 font-sans">
          <p>© 2026 L'Aroma Artisan Cafe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <a href="#privacy" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
            <a href="#licensing" className="hover:text-[#C5A059] transition-colors">Sourcing & Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
