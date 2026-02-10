
import React, { useState, useEffect } from 'react';
import HeartBackground from './components/HeartBackground';
import MovingButton from './components/MovingButton';
import { Snack } from './types';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const App: React.FC = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);

  const handleYes = () => {
    setHasAccepted(true);
    // Trigger confetti explosion
    const end = Date.now() + 3 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#fda4af'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const snacks: Snack[] = ['Popcorn 🍿', 'Chocolate 🍫', 'Pizza 🍕', 'Ice Cream 🍦', 'Candy 🍬'];

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeartBackground />

      <main className="z-10 w-full max-w-lg bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-rose-100 flex flex-col gap-6 transform transition-all duration-700">
        {!hasAccepted ? (
          <>
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="text-4xl">🎬</span>
              <h1 className="text-4xl md:text-5xl font-romantic text-rose-600 leading-tight">
                Mi gordita, Will you be my Valentine and have a movie night with me?
              </h1>
              <p className="text-rose-500/80 text-lg font-medium">
                Even if we’re far apart, I want to spend this special night with you. ❤️
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <button
                onClick={handleYes}
                className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg shadow-rose-200 transform hover:scale-110 active:scale-95 transition-all text-xl"
              >
                YES 💖
              </button>
              
              <MovingButton className="px-10 py-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold rounded-full transition-all text-xl">
                NO 🙃
              </MovingButton>
            </div>
          </>
        ) : (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <div className="space-y-4">
              <h2 className="text-4xl font-romantic text-rose-600">
                Yes! I knew it 💕🎬
              </h2>
              <p className="text-rose-500/80 text-lg font-medium">
                Now let's plan the most important gordo part...
              </p>
            </div>

            <div className="space-y-4 bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
              <label htmlFor="snacks" className="block text-xl font-semibold text-rose-700">
                What snacks should we have?
              </label>
              <select
                id="snacks"
                className="w-full p-4 rounded-xl border-2 border-rose-200 bg-white text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-lg appearance-none cursor-pointer"
                defaultValue=""
                onChange={(e) => setSelectedSnack(e.target.value as Snack)}
              >
                <option value="" disabled>Choose our treats...</option>
                {snacks.map((snack) => (
                  <option key={snack} value={snack}>
                    {snack}
                  </option>
                ))}
              </select>
              
              {selectedSnack && (
                <div className="mt-6 animate-in fade-in zoom-in duration-300 bg-white p-4 rounded-xl shadow-inner border border-rose-50">
                  <p className="text-rose-600 font-bold text-lg">
                    Perfect choice! {selectedSnack} will make our movie night even better 💖
                  </p>
                </div>
              )}
            </div>

            
        )}
      </main>

      {/* Floating Sparkles decorative element */}
      <div className="fixed bottom-4 text-rose-300/40 text-sm select-none">
        Made with love for a special someone ✨
      </div>
    </div>
  );
};

export default App;
