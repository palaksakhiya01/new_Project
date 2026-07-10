import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { MenuItem } from '../types';
import { Search, X, Star, Leaf, Award, ShieldAlert, Coffee, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Menu() {
  const { menuItems } = useCafe();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { value: 'all', label: 'All Offerings' },
    { value: 'coffee', label: 'Coffee & Espresso' },
    { value: 'tea', label: 'Teas & Elixirs' },
    { value: 'bakery', label: 'Artisan Bakery' },
    { value: 'brunch', label: 'All-Day Brunch' },
    { value: 'dessert', label: 'Desserts' },
  ];

  const filterTags = [
    { value: 'signature', label: 'Chef Signature' },
    { value: 'vegan', label: 'Vegan Friendly' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'organic', label: 'Organic' },
    { value: 'contains-nuts', label: 'Contains Nuts' },
  ];

  const handleTagToggle = (tagValue: string) => {
    if (selectedTags.includes(tagValue)) {
      setSelectedTags(selectedTags.filter(t => t !== tagValue));
    } else {
      setSelectedTags([...selectedTags, tagValue]);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // 2. Search Query Filter
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      if (!matchName && !matchDesc) return false;
    }

    // 3. Tag Filters
    if (selectedTags.length > 0) {
      const matchesAllTags = selectedTags.every(tag => item.tags.includes(tag as any));
      if (!matchesAllTags) return false;
    }

    return true;
  });

  return (
    <div className="bg-[#0F0F0F] py-16 text-stone-300">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-12">
        <span className="font-serif text-sm italic text-[#C5A059]">Taste the Aroma</span>
        <h1 className="mt-2 font-serif text-4xl tracking-wide text-white sm:text-6xl">Our Culinary Menu</h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-xs uppercase tracking-widest leading-relaxed">
          Fresh ingredients, house-roasted organic beans, and freshly baked artisanal loaves. Filter to see specialized diets.
        </p>
      </div>

      {/* Filters Panel */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between bg-[#141414] border border-white/10 p-6">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search coffee, tea, croissants, waffles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-white/10 focus:border-[#C5A059] pl-11 pr-4 py-3 text-xs text-white placeholder-[#0F0F0F]/60 outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-stone-400 hover:text-[#C5A059]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Categories select (Scrollable on mobile) */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#C5A059] text-black shadow-sm'
                    : 'bg-[#0F0F0F] text-white/70 hover:bg-white/5 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Tag Badges */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-[9px] text-stone-500 uppercase mr-2 tracking-widest">Dietary Needs:</span>
          {filterTags.map((tag) => {
            const isActive = selectedTags.includes(tag.value);
            return (
              <button
                key={tag.value}
                onClick={() => handleTagToggle(tag.value)}
                className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-1.5 border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]'
                    : 'bg-[#141414] text-white/60 border-white/10 hover:bg-[#1f1f1f]'
                }`}
              >
                {tag.value === 'signature' && <Award className="h-3.5 w-3.5 text-[#C5A059]" />}
                {tag.value === 'vegan' && <Leaf className="h-3.5 w-3.5 text-emerald-500" />}
                <span>{tag.label}</span>
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-[10px] uppercase tracking-widest text-rose-400 hover:text-rose-300 font-bold underline underline-offset-4 ml-2"
            >
              Clear Diet Filters
            </button>
          )}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#141414] border border-white/5 p-10 max-w-md mx-auto">
            <Ban className="h-10 w-10 text-stone-600 mx-auto mb-4" />
            <h3 className="text-base font-serif text-white">No items matched your search</h3>
            <p className="text-xs text-stone-500 mt-2 font-sans">Try adjusting your filters, selecting a different category, or shortening your search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedTags([]);
              }}
              className="mt-6 bg-[#C5A059] text-black font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[#b08e4d]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className="flex flex-col bg-[#141414] border border-white/5 hover:border-[#C5A059]/30 cursor-pointer transition-all hover:translate-y-[-2px]"
                >
                  {/* Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 filter brightness-90"
                    />
                    <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                      {item.popular && (
                        <span className="bg-[#C5A059] text-black text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 flex items-center space-x-1 shadow-sm">
                          <Star className="h-2.5 w-2.5 fill-black text-black" />
                          <span>Popular</span>
                        </span>
                      )}
                      {item.tags.includes('signature') && (
                        <span className="bg-[#0F0F0F] text-[#C5A059] border border-[#C5A059]/30 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm">
                          Signature
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-grow flex-col">
                    <span className="font-mono text-[9px] uppercase text-[#C5A059] tracking-widest">{item.category}</span>
                    <div className="mt-1.5 flex items-baseline justify-between">
                      <h3 className="font-serif text-base font-semibold tracking-wide text-white group-hover:text-[#C5A059]">{item.name}</h3>
                      <span className="font-serif text-[#C5A059] text-base font-medium">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-2.5 text-stone-400 text-xs leading-relaxed flex-grow line-clamp-2 font-sans">{item.description}</p>
                    
                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {item.tags.filter(tag => tag !== 'signature').map(tag => (
                        <span key={tag} className="border border-white/5 bg-white/5 px-2 py-0.5 text-[8px] font-mono text-white/55 uppercase tracking-widest">
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden bg-[#0F0F0F] border border-white/10 max-h-[90vh] flex flex-col text-stone-300"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-[#0F0F0F]/80 border border-white/10 text-white hover:text-[#C5A059]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto flex-grow">
                {/* Banner Photo */}
                <div className="relative h-64 md:h-72 w-full bg-stone-900">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="h-full w-full object-cover filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="font-mono text-[9px] uppercase text-[#C5A059] tracking-[0.2em] font-semibold">{selectedItem.category}</span>
                    <h2 className="text-2xl md:text-3xl font-serif mt-1 tracking-wide text-white">{selectedItem.name}</h2>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Price Row */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-500 uppercase font-mono tracking-widest">Price per serving</span>
                      <span className="text-xl font-serif text-[#C5A059] font-mono">${selectedItem.price.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="border border-[#C5A059]/20 text-[#C5A059] bg-[#C5A059]/5 px-3 py-1 text-[8px] font-mono uppercase tracking-widest">
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold text-stone-500 uppercase tracking-widest font-mono">Culinary Narrative</h4>
                    <p className="text-stone-300 text-xs leading-relaxed font-sans">{selectedItem.description}</p>
                  </div>

                  {/* Specialty Section based on category */}
                  {selectedItem.category === 'coffee' && (
                    <div className="bg-[#141414] border border-white/5 p-4 space-y-3">
                      <div className="flex items-center space-x-2 text-[#C5A059]">
                        <Coffee className="h-4 w-4 shrink-0" />
                        <h5 className="font-bold text-[9px] uppercase tracking-widest font-mono">Roaster Profile Notes</h5>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center pt-1 font-mono text-[10px]">
                        <div className="bg-[#0F0F0F] p-2 border border-white/5">
                          <p className="text-[8px] text-stone-500 uppercase">Elevation</p>
                          <p className="font-bold text-white mt-0.5">1,850m</p>
                        </div>
                        <div className="bg-[#0F0F0F] p-2 border border-white/5">
                          <p className="text-[8px] text-stone-500 uppercase">Acidity</p>
                          <p className="font-bold text-white mt-0.5">Vibrant</p>
                        </div>
                        <div className="bg-[#0F0F0F] p-2 border border-white/5">
                          <p className="text-[8px] text-stone-500 uppercase">Flavor Body</p>
                          <p className="font-bold text-white mt-0.5">Delicate</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedItem.category === 'brunch' && (
                    <div className="bg-[#141414] border border-white/5 p-4 space-y-2">
                      <div className="flex items-center space-x-2 text-[#C5A059]">
                        <Leaf className="h-4 w-4 shrink-0" />
                        <h5 className="font-bold text-[9px] uppercase tracking-widest font-mono">Farm-To-Table Sourcing</h5>
                      </div>
                      <p className="text-stone-400 text-xs leading-relaxed font-sans">
                        Eggs and dairy are sourced from local family pastures daily. All produce is certified 100% organic, hand-washed and dressed with cold-pressed virgin olive oil.
                      </p>
                    </div>
                  )}

                  {/* Nutrition & Allergens Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    {/* Nutritional mock information */}
                    <div className="space-y-3">
                      <h4 className="text-[9px] font-bold text-stone-500 uppercase tracking-widest font-mono">Estimated Values</h4>
                      <div className="grid grid-cols-2 gap-3 text-[10px] font-sans">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-stone-500">Calories:</span>
                          <span className="font-medium text-white">{selectedItem.category === 'coffee' || selectedItem.category === 'tea' ? '15 - 180 kcal' : '220 - 580 kcal'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-stone-500">Fats:</span>
                          <span className="font-medium text-white">{selectedItem.category === 'coffee' ? '0g' : '8g - 24g'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-stone-500">Carbs:</span>
                          <span className="font-medium text-white">{selectedItem.category === 'coffee' ? '2g' : '15g - 42g'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-stone-500">Proteins:</span>
                          <span className="font-medium text-white">{selectedItem.category === 'coffee' ? '0.5g' : '4g - 18g'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Allergens warning */}
                    <div className="space-y-3 bg-[#141414] border border-white/5 p-4">
                      <div className="flex items-center space-x-1.5 text-white">
                        <ShieldAlert className="h-4 w-4 text-[#C5A059] shrink-0" />
                        <h4 className="text-[9px] font-bold uppercase tracking-widest font-mono">Allergens Guidance</h4>
                      </div>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-sans">
                        {selectedItem.tags.includes('contains-nuts') 
                          ? 'WARNING: This product contains walnuts, pistachios, or almond flour. Not suitable for individuals with tree-nut allergies.'
                          : 'Prepared in a kitchen that handles wheat flour, gluten, dairy, eggs, and tree-nuts.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 p-6 flex justify-end bg-[#141414]">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-[#C5A059] text-black font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[#b08e4d]"
                >
                  Close Culinary View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
