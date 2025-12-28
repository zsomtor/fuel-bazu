'use client';

import { useEffect, useState } from 'react';
import FireVisualization from '@/components/FireVisualization';
import ContentButtons from '@/components/ContentButtons';
import Stats from '@/components/Stats';
import History from '@/components/History';
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

  const handleRemoveHistory = async (timestamp: string) => {
    try {
      const response = await fetch('/api/fire/remove-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp }),
      });

      if (response.ok) {
        const data = await response.json();
        setFireState(data);
      }
    } catch (error) {
      console.error('Error removing history entry:', error);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset the fire? This will clear all progress and history.')) {
      return;
    }

    try {
      const response = await fetch('/api/fire/reset', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setFireState(data);
      }
    } catch (error) {
      console.error('Error resetting fire:', error);
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

        {/* Info Box and History - Side by Side */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Info Box */}
          <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-3">How It Works</h3>
            <div className="space-y-2">
              <div className="text-gray-400 text-sm">
                • Each content type adds fuel to the fire
              </div>
              <div className="text-gray-400 text-sm">
                • Decay accelerates: Day 1 (-7), Day 2 (-10), Day 3 (-13)...
              </div>
              <div className="text-gray-400 text-sm">
                • Fire dies at 0, streak resets
              </div>
              <div className="text-gray-400 text-sm">
                • Bigger content = more fuel
              </div>
              <div className="text-gray-400 text-sm">
                • History shows last 20 publications
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-6 pt-4 border-t border-gray-700/30">
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/50 text-gray-400 hover:text-gray-300 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Reset Fire
              </button>
            </div>
          </div>

          {/* History */}
          <History history={fireState.history || []} onRemove={handleRemoveHistory} />
        </div>
      </div>
    </div>
  );
}
