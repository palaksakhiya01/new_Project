/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import ReservationView from './components/Reservation';
import Contact from './components/Contact';
import LoginView from './components/Login';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, Info, AlertTriangle } from 'lucide-react';

function CafeAppContent() {
  const { activePage, alert, clearAlert } = useCafe();

  // Auto-dismiss alert after 5 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        clearAlert();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, clearAlert]);

  // Map pages to components
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home id="view-home" />;
      case 'about':
        return <About id="view-about" />;
      case 'menu':
        return <Menu id="view-menu" />;
      case 'reservation':
        return <ReservationView id="view-reservation" />;
      case 'contact':
        return <Contact id="view-contact" />;
      case 'login':
        return <LoginView id="view-login" />;
      default:
        return <Home id="view-home-default" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900" id="cafe-app-root">
      {/* Dynamic Alerts Banner / Toasts */}
      <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full space-y-2 pointer-events-none" id="cafe-alerts-container">
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md ${
                alert.type === 'success'
                  ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
                  : alert.type === 'error'
                  ? 'bg-rose-50/95 border-rose-200 text-rose-900'
                  : 'bg-stone-900/95 border-stone-800 text-stone-100 shadow-stone-950/20'
              }`}
              id="cafe-alert-toast"
            >
              {/* Alert Icons */}
              <div className="shrink-0 mt-0.5" id="alert-icon-wrapper">
                {alert.type === 'success' ? (
                  <Check className="h-5 w-5 text-emerald-600 bg-emerald-100/80 p-0.5 rounded-md" />
                ) : alert.type === 'error' ? (
                  <AlertTriangle className="h-5 w-5 text-rose-600 bg-rose-100/80 p-0.5 rounded-md" />
                ) : (
                  <Info className="h-5 w-5 text-amber-400 bg-stone-800 p-0.5 rounded-md" />
                )}
              </div>

              {/* Message */}
              <div className="flex-grow space-y-0.5" id="alert-text-wrapper">
                <p className="text-xs font-bold uppercase tracking-wider font-mono opacity-80" id="alert-label">
                  {alert.type === 'success' ? 'Confirmed' : alert.type === 'error' ? 'Notification' : 'Notice'}
                </p>
                <p className="text-xs leading-normal font-medium" id="alert-text">{alert.text}</p>
              </div>

              {/* Close button */}
              <button
                onClick={clearAlert}
                className="shrink-0 text-stone-400 hover:text-stone-900 transition-colors p-0.5 rounded-md hover:bg-stone-100/10"
                id="alert-close-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header / Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow" id="cafe-main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CafeProvider>
      <CafeAppContent />
    </CafeProvider>
  );
}
