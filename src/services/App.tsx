import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Leaf, ShieldAlert, Scroll, Droplets, Utensils, Waves, Zap, Flame, Trash2, Wind, Loader2 } from 'lucide-react';
import { generateCleaningGuidance } from './services/geminiService';
import { CleaningGuidance } from './types';

export default function App() {
  const [query, setQuery] = useState('');
  const [guidance, setGuidance] = useState<CleaningGuidance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateCleaningGuidance(query);
      setGuidance(result);
    } catch (err) {
      setError('I couldn\'t find a solution for that. Try describing it differently!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setGuidance(null);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-ninja-white font-sans text-ninja-black selection:bg-ninja-green selection:text-white">
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ninja-green text-white">
              <Zap size={24} className="fill-current" />
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight text-ninja-green">
              Ninja Home <span className="text-gray-400">Cleaner</span>
            </h1>
          </div>
          {guidance && (
            <button
              onClick={clearResults}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-500"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-10">
        {/* Search Hero */}
        {!guidance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-display text-4xl font-bold md:text-6xl">
              Tackle any stain, <br />
              <span className="text-ninja-green">the natural way.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-500">
              Ancient wisdom meets modern natural cleaning. Enter a problem 
              and let the Master Ninja guide you.
            </p>
            
            <form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl">
              <input
                type="text"
                placeholder="Example: Kitchen grease, rust, mold..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-100 bg-white px-6 py-5 pr-16 text-lg tracking-tight shadow-xl shadow-gray-100 outline-none transition-all focus:border-ninja-green focus:ring-4 focus:ring-ninja-green/10"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-ninja-green text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Search size={24} />}
              </button>
            </form>
          </motion.div>
        )}

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-ninja-green/10 text-ninja-green">
                <Leaf size={40} />
              </div>
              <h3 className="font-display text-2xl font-bold">Consulting Ancient Scrolls...</h3>
              <p className="text-gray-500">The Ninja is brewing a natural solution for you.</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-2xl bg-red-50 p-6 text-center text-red-600"
            >
              <ShieldAlert className="mx-auto mb-2" size={32} />
              <p className="font-medium">{error}</p>
              <button onClick={() => setError(null)} className="mt-4 text-sm underline">Try again</button>
            </motion.div>
          )}

          {guidance && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Header Info */}
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ninja-green">
                    <Droplets size={14} /> Problem Analysis
                  </div>
                  <h3 className="font-display text-3xl font-bold capitalize">{query}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-gray-600">
                    {guidance.problemAnalysis}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    <Leaf size={12} /> 100% Eco-Friendly
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    <Zap size={12} /> Pro-Grade Results
                  </span>
                </div>
              </div>

              {/* Natural Methods Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-full mb-2">
                  <h4 className="flex items-center gap-2 font-display text-2xl font-bold">
                    <Droplets className="text-ninja-green" />
                    5 Natural Methods
                  </h4>
                </div>
                {guidance.naturalMethods.map((method, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/50"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ninja-green/10 font-display font-bold text-ninja-green">
                        0{i + 1}
                      </div>
                    </div>
                    <h5 className="mb-3 font-display text-xl font-bold text-ninja-green">
                      {method.title}
                    </h5>
                    
                    <div className="mb-4 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ingredients</div>
                      <div className="flex flex-wrap gap-1">
                        {method.ingredients.map((ing, idx) => (
                          <span key={idx} className="rounded-md bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 flex-grow space-y-3">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Steps</div>
                      <ul className="space-y-2">
                        {method.instructions.map((step, idx) => (
                          <li key={idx} className="flex gap-2 text-sm leading-snug text-gray-600">
                            <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-ninja-green/30" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto rounded-xl bg-ninja-green/5 p-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ninja-green">
                        <Zap size={10} /> Ninja Tip
                      </div>
                      <p className="text-xs font-medium italic text-gray-500">{method.tip}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ancient Secrets Section */}
              <div className="rounded-[2.5rem] bg-ninja-black p-8 text-white md:p-12 shadow-2xl">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="flex items-center gap-2 font-display text-2xl font-bold sm:text-3xl text-ninja-white">
                      <Scroll className="text-ninja-green" />
                      Ancient Cleaning Secrets
                    </h4>
                    <p className="text-gray-400">Timeless wisdom from grand civilizations.</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {guidance.ancientSecrets.map((secret, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative overflow-hidden rounded-3xl bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                      <div className="mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-ninja-green">Civilization</div>
                        <h5 className="font-display text-2xl font-bold">{secret.civilization}</h5>
                      </div>

                      <div className="mb-6 space-y-4">
                        <div>
                          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">Method</div>
                          <p className="text-sm border-l-2 border-ninja-green pl-3 leading-relaxed text-gray-300">
                            {secret.howToUse}
                          </p>
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">Key Material</div>
                          <p className="text-sm font-medium text-white">{secret.ingredients}</p>
                        </div>
                        <div>
                          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">The "Why"</div>
                          <p className="text-sm text-gray-400 italic">"{secret.whyItWorked}"</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Safety Section */}
              <div className="rounded-3xl bg-orange-50 p-6 border-2 border-orange-100 flex items-start gap-4">
                <div className="rounded-xl bg-orange-400 p-2 text-white">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h5 className="font-display font-bold text-orange-800">Safety Warning</h5>
                  <p className="text-sm text-orange-700 leading-relaxed font-medium">
                    {guidance.safetyTip}
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pb-12 text-center">
                <button
                  onClick={clearResults}
                  className="rounded-full border-2 border-gray-200 px-8 py-3 font-bold transition-all hover:border-ninja-green hover:text-ninja-green active:scale-95"
                >
                  New Cleaning Quest?
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Categories / Quick Suggestions if no results */}
      {!guidance && !loading && (
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 text-center">Popular Ninja Requests</div>
          <div className="flex flex-wrap justify-center gap-3">
             {[
               { icon: <Droplets size={14}/>, text: 'Bathroom Mold' },
               { icon: <Flame size={14}/>, text: 'Burnt Stainless Pan' },
               { icon: <Trash2 size={14}/>, text: 'Smelly Fridge' },
               { icon: <Waves size={14}/>, text: 'Toilet Stains' },
               { icon: <Wind size={14}/>, text: 'Wall Dirt' },
               { icon: <Utensils size={14}/>, text: 'Kitchen Grease' }
             ].map((tag, i) => (
               <button
                 key={i}
                 onClick={() => { setQuery(tag.text); }}
                 className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-ninja-green hover:bg-ninja-green/5 hover:text-ninja-green hover:-translate-y-0.5"
               >
                 {tag.icon}
                 {tag.text}
               </button>
             ))}
          </div>
        </section>
      )}

      {/* Mini Footer */}
      <footer className="border-t border-gray-100 py-10 text-center text-xs font-medium text-gray-400">
        &copy; {new Date().getFullYear()} Ninja Home Cleaner. Master the art of the natural shine.
      </footer>
    </div>
  );
}
