'use client';

import { useEffect, useState } from 'react';
import FireVisualization from '@/components/FireVisualization';
import ContentButtons from '@/components/ContentButtons';
import Stats from '@/components/Stats';
import { FireState } from '@/lib/types';
import { getInitialState } from '@/lib/gameLogic';

export default function Home() {
  const [fireState, setFireState] = useState<FireState>(getInitialState());
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Fetch initial state
  useEffect(() => {
    fetchFireState();
  }, []);

  const fetchFireState = async () => {
    try {
      const response = await fetch('/api/fire');
      if (response.ok) {
        const data = await response.json();
        setFireState(data);
      }
    } catch (error) {
      console.error('Error fetching fire state:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFuel = async (fuelValue: number, label: string) => {
    setAdding(true);
    try {
      const response = await fetch('/api/fire/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fuelValue, label }),
      });

      if (response.ok) {
        const data = await response.json();
        setFireState(data);
      }
    } catch (error) {
      console.error('Error adding fuel:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleUndo = async () => {
    try {
      const response = await fetch('/api/fire/undo', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setFireState(data);
      }
    } catch (error) {
      console.error('Error undoing action:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Media Fire Tracker
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Keep the fire burning by publishing content
          </p>
        </div>

        {/* Stats */}
        <Stats
          streakDays={fireState.streakDays}
          lastActionDate={fireState.lastActionDate}
        />

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Content Buttons */}
          <div className="order-2 lg:order-1">
            <ContentButtons onAddFuel={handleAddFuel} disabled={adding} />

            {/* Undo Button */}
            {fireState.lastAction && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleUndo}
                  className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  <span>↶</span>
                  <span>Undo: {fireState.lastAction.label}</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Fire Visualization */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
            <FireVisualization fireLevel={fireState.fireLevel} />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 max-w-3xl mx-auto bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
          <h3 className="text-white font-semibold text-lg mb-3">How It Works</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="text-gray-400 text-sm">
              • Each content type adds fuel to the fire
            </div>
            <div className="text-gray-400 text-sm">
              • Fire decays by 5 points each day
            </div>
            <div className="text-gray-400 text-sm">
              • Fire dies at 0, streak resets
            </div>
            <div className="text-gray-400 text-sm">
              • Bigger content = more fuel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
