import React from 'react';
import { useCafe } from '../context/CafeContext';
import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, Flame, ShieldCheck, HelpCircle, Compass, Sparkles } from 'lucide-react';

export default function Home() {
  const { setActivePage, menuItems, reviews } = useCafe();

  const featuredItems = menuItems.filter(item => item.popular).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="overflow-hidden bg-[#0F0F0F] text-stone-350">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#0F0F0F] px-6 py-20 lg:px-8">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1500"
            alt="Cozy Cafe Atmosphere"
            className="h-full w-full object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-[#0F0F0F]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-1.5 border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium"
          >
            <Sparkles className="h-3 w-3" />
            Slow Down & Savor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-5xl tracking-normal text-white sm:text-7xl md:text-8xl leading-[1.05]"
          >
            Slow Down.<br />
            <span className="text-[#C5A059] italic block mt-2">Savor the Moment.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-8 max-w-2xl text-sm text-stone-400 md:text-base leading-relaxed font-sans"
          >
            Nestled in the heart of the historic district, L'Aroma brings artisanal roasting and slow-brew traditions to your morning ritual. We believe coffee is not just a drink, but an art form.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <button
              onClick={() => setActivePage('reservation')}
              className="flex items-center space-x-2 bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-4 hover:bg-[#b08e4d] transition-all cursor-pointer"
            >
              <span>Book a Table</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setActivePage('menu')}
              className="flex items-center space-x-2 border border-white/10 hover:border-[#C5A059] text-white text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-4 bg-transparent transition-all cursor-pointer"
            >
              <span>Explore Our Menu</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 border-t border-white/5">
        <div className="text-center">
          <span className="font-serif text-sm italic text-[#C5A059]">Established 1984</span>
          <h2 className="mt-2 font-serif text-3xl tracking-wide text-white sm:text-5xl">The Roastery Experience</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-xs uppercase tracking-widest leading-relaxed">
            Meticulous sourcing, craft preparation, and authentic neighborhood hospitality.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Pillar 1 */}
          <motion.div variants={itemVariants} className="group relative bg-[#0F0F0F] p-8 transition-all hover:bg-[#141414]">
            <div className="flex h-11 w-11 items-center justify-center border border-[#C5A059]/30 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xs uppercase tracking-widest font-bold text-white">Ethical Direct Sourcing</h3>
            <p className="mt-3 text-stone-400 text-xs leading-relaxed font-sans">
              We buy directly from organic small-batch farms in Sidamo, Antigua, and Tarrazú, ensuring premium margins for farming co-ops.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div variants={itemVariants} className="group relative bg-[#0F0F0F] p-8 transition-all hover:bg-[#141414]">
            <div className="flex h-11 w-11 items-center justify-center border border-[#C5A059]/30 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xs uppercase tracking-widest font-bold text-white">Artisan Micro-Roasting</h3>
            <p className="mt-3 text-stone-400 text-xs leading-relaxed font-sans">
              Every batch of beans is light-to-medium roasted in-house using computerized roasting profiles to highlight regional terroir notes.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div variants={itemVariants} className="group relative bg-[#0F0F0F] p-8 transition-all hover:bg-[#141414]">
            <div className="flex h-11 w-11 items-center justify-center border border-[#C5A059]/30 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xs uppercase tracking-widest font-bold text-white">Slow-Ferment Bakery</h3>
            <p className="mt-3 text-stone-400 text-xs leading-relaxed font-sans">
              Our bakers utilize a 36-hour slow fermentation technique on our house wild sourdough starter. No shortcuts, just crisp crusts.
            </p>
          </motion.div>

          {/* Pillar 4 */}
          <motion.div variants={itemVariants} className="group relative bg-[#0F0F0F] p-8 transition-all hover:bg-[#141414]">
            <div className="flex h-11 w-11 items-center justify-center border border-[#C5A059]/30 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xs uppercase tracking-widest font-bold text-white">Guaranteed Booking</h3>
            <p className="mt-3 text-stone-400 text-xs leading-relaxed font-sans">
              Skip the long weekend lineups. Our easy reservation portal lets you lock in quiet study booths or sunlit terrace tables instantly.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. FEATURED PREVIEW */}
      <section className="bg-[#141414] py-24 border-t border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#C5A059] tracking-[0.25em]">From Our Kitchen & Bar</span>
              <h2 className="mt-2 font-serif text-3xl tracking-wide text-white sm:text-5xl">Signature Brews & Bakery</h2>
            </div>
            <button
              onClick={() => setActivePage('menu')}
              className="mt-4 md:mt-0 text-[10px] uppercase tracking-widest text-[#C5A059] underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
            >
              Explore Full Menu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="flex flex-col overflow-hidden bg-[#0F0F0F] border border-white/5 hover:border-white/10 transition-all">
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 filter brightness-90"
                  />
                  <div className="absolute top-4 right-4 bg-[#C5A059] px-3 py-1 text-[8px] font-bold text-black uppercase tracking-widest flex items-center space-x-1">
                    <Star className="h-2.5 w-2.5 fill-black" />
                    <span>Featured</span>
                  </div>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <span className="font-mono text-[9px] uppercase text-[#C5A059] tracking-widest">{item.category}</span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold tracking-wide uppercase text-white">{item.name}</h3>
                    <span className="font-serif text-[#C5A059] text-base font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="mt-3 text-stone-400 text-xs leading-relaxed flex-grow font-sans">{item.description}</p>
                  
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="border border-white/5 bg-white/5 px-2.5 py-0.5 text-[8px] font-mono text-white/50 uppercase tracking-widest">
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AMBIENCE SHOWCASE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase text-[#C5A059] tracking-[0.25em]">The Spaces</span>
            <h2 className="font-serif text-3xl tracking-wide text-white sm:text-5xl">Formed for Every Occasion</h2>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              Whether you need a quiet corner for a morning flow-state coding session, a relaxed sunlit patio for brunch with friends, or a velvet lounge booth for an intimate evening chat, we've designed L'Aroma with versatile zones.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center border border-white/10 text-[#C5A059] shrink-0 font-mono text-xs font-bold bg-[#141414]">01</div>
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-widest">Sun-Drenched Garden Terrace</h4>
                  <p className="text-stone-400 text-xs mt-1 font-sans">Surrounded by organic herbs and olive trees. Fully covered during rain, catching the perfect gentle breeze during hot days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center border border-white/10 text-[#C5A059] shrink-0 font-mono text-xs font-bold bg-[#141414]">02</div>
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-widest">Quiet Focus Booths</h4>
                  <p className="text-stone-400 text-xs mt-1 font-sans">Equipped with reliable fiber internet, silent power points, sound-absorbing walls, and gentle overhead ambient light.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center border border-white/10 text-[#C5A059] shrink-0 font-mono text-xs font-bold bg-[#141414]">03</div>
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-widest">The Roaster's Lounge</h4>
                  <p className="text-stone-400 text-xs mt-1 font-sans">Sits right adjacent to our vintage cast-iron roasting machine. Experience the incredible fresh roasting aroma of coffee beans.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400"
                alt="Cafe bar counter"
                className="h-64 w-full object-cover filter brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400"
                alt="Roasting beans"
                className="h-44 w-full object-cover filter brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400"
                alt="Latte pouring"
                className="h-44 w-full object-cover filter brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <img
                src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=400"
                alt="Cozy interior seating"
                className="h-64 w-full object-cover filter brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS TESTIMONIALS */}
      <section className="bg-[#0B0B0B] text-white py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase text-[#C5A059] tracking-[0.25em]">Neighborhood Voices</span>
            <h2 className="mt-2 font-serif text-3xl tracking-wide sm:text-5xl">Loved by the Coffee Community</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="flex flex-col justify-between bg-[#141414] border border-white/5 p-8 shadow-sm">
                <div>
                  <div className="flex items-center space-x-1 text-[#C5A059]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#C5A059]" />
                    ))}
                  </div>
                  <p className="mt-4 text-white/70 text-xs italic leading-relaxed font-sans">
                    "{review.comment}"
                  </p>
                </div>
                
                <div className="mt-8 flex items-center space-x-4 border-t border-white/5 pt-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-9 w-9 rounded-full object-cover border border-[#C5A059]/20"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{review.name}</h4>
                    <span className="text-[9px] text-[#C5A059]/60 font-mono block mt-0.5">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RESERVATION CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="relative overflow-hidden bg-[#141414] border border-[#C5A059]/20 px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute inset-0 -z-10 bg-[#141414]" />
          <div className="absolute inset-0 -z-10 opacity-10 filter grayscale brightness-50">
            <img
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=1200"
              alt="Pouring glass coffee"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="font-mono text-[10px] uppercase text-[#C5A059] tracking-[0.25em]">Reserve an Experience</span>
          <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl tracking-normal text-white sm:text-5xl">
            Reserve a Table
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60 text-xs leading-relaxed font-sans">
            Avoid wait times. Lock in your preferred table area (Terrace, Window-Side, quiet Lounges) in seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setActivePage('reservation')}
              className="bg-[#C5A059] text-black text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-4 hover:bg-[#b08e4d] transition-all cursor-pointer"
            >
              Book a Table Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
