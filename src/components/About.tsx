import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, HeartHandshake, UserCheck } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Direct Sourced Co-ops', value: '14+' },
    { label: 'In-House Roast Batches', value: '1,200+' },
    { label: 'Sourdough Slices Served', value: '45,000+' },
    { label: 'Happy Regulars', value: '4.9★ (3k+)' }
  ];

  const team = [
    {
      name: 'Elena Rostova',
      role: 'Master Coffee Roaster',
      bio: 'Elena has spent 12 years analyzing roasting curves across Latin America and East Africa. She profiles each micro-lot to preserve original floral and fruit notes.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Thomas Mercier',
      role: 'Head Artisan Baker',
      bio: 'Trained in Paris, Thomas brought his family wild-yeast culture dating back to 1994. He manages our 36-hour slow-fermentation sourdough cycle.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Aiden Chen',
      role: 'Chief Latte Barista',
      bio: 'Aiden is an award-winning latte artist who focuses on pouring the perfect micro-foam texture. He hosts public pour-over masterclasses on Saturdays.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="bg-[#0F0F0F] py-16 text-stone-300">
      {/* Hero Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
        <span className="font-serif text-sm italic text-[#C5A059]">Our Heritage</span>
        <h1 className="mt-2 font-serif text-4xl tracking-wide text-white sm:text-6xl">For the Love of Craft</h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-xs uppercase tracking-widest leading-relaxed">
          A look into how we source, roast, and serve. Built on sustainability, patience, and direct relationships.
        </p>
      </div>

      {/* Main Narrative */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[480px] overflow-hidden border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800"
              alt="Pouring freshly roasted beans"
              className="h-full w-full object-cover filter grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-2xl tracking-wide text-white">A Journey of Terroir and Tenacity</h2>
            <p className="text-stone-400 text-sm leading-relaxed font-sans">
              L'Aroma was founded in 2021 by a small circle of passionate roasters, baristas, and bakers who believed the neighborhood deserved coffee without compromise. We realized that true quality isn't just about high-end equipment—it is about honoring the incredible journey from soil to cup.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed font-sans">
              Every bean we procure is treated as an individual story. We trace our beans back to the specific hillside plot they grew on, paying higher premiums than standard fair-trade demands. We believe that supporting organic soil health and fair wages for local co-operatives is the only way to ensure the future of premium coffee.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <Leaf className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-[10px] uppercase tracking-widest">100% Organic Sourcing</h4>
                  <p className="text-[11px] text-stone-500 mt-1 font-sans leading-relaxed">No pesticide crops. Grown entirely via natural shades and compost fertilizers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-[10px] uppercase tracking-widest">Award Winning Blends</h4>
                  <p className="text-[11px] text-stone-500 mt-1 font-sans leading-relaxed">Voted best local espresso profiles and organic cold brew blends 3 years running.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="bg-[#141414] border-t border-b border-white/5 py-16 mb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <p className="font-serif text-4xl text-[#C5A059]">{stat.value}</p>
                <p className="font-mono text-[9px] uppercase text-white/50 tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Commitments */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="font-serif text-sm italic text-[#C5A059]">Our Promises</span>
          <h2 className="mt-2 font-serif text-2xl tracking-wide text-white sm:text-4xl">Pillars of Our Daily Operation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#141414] border border-white/5 p-8 space-y-4 hover:border-[#C5A059]/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base text-white tracking-wide">Zero Waste Packaging</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              Every coffee bag, takeaway cup, straw, and sandwich sleeve is 100% biodegradable and compostable. Bring a reusable tumbler and get 10% off any drink.
            </p>
          </div>

          <div className="bg-[#141414] border border-white/5 p-8 space-y-4 hover:border-[#C5A059]/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base text-white tracking-wide">Ethical Compensation</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              We pay our growers on average 45% above Fairtrade standards. We also ensure our full barista and kitchen staff are paid comprehensive wages and provided health-wellness programs.
            </p>
          </div>

          <div className="bg-[#141414] border border-white/5 p-8 space-y-4 hover:border-[#C5A059]/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5">
              <UserCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base text-white tracking-wide">Neighborhood Hub</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              We actively support local creators, designers, and students by providing accessible workspaces, high-speed charging stations, and hosting monthly open-mic and art nights.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership/Team Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-serif text-sm italic text-[#C5A059]">The Experts</span>
          <h2 className="mt-2 font-serif text-2xl tracking-wide text-white sm:text-4xl">Meet the Roasters & Bakers</h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-500 text-xs uppercase tracking-widest leading-relaxed">
            Passionate craftspeople working behind the scenes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((person) => (
            <div key={person.name} className="flex flex-col bg-[#141414] border border-white/5 overflow-hidden group hover:border-[#C5A059]/30 transition-all">
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-full w-full object-cover filter grayscale brightness-75 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col">
                <div>
                  <h3 className="font-serif text-base tracking-wide text-white">{person.name}</h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] mt-0.5">{person.role}</p>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed flex-grow font-sans">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
