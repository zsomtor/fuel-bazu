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
        body: JSON.stringify({ fuelValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setFireState(data);

        // Show a little celebration message
        const message = `🔥 Added ${label}! +${fuelValue} fuel`;
        console.log(message);
      }
    } catch (error) {
      console.error('Error adding fuel:', error);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            🔥 Media Fire Tracker
          </h1>
          <p className="text-gray-400 text-lg">
            Keep the fire burning by publishing content!
          </p>
        </div>

        {/* Stats */}
        <Stats
          streakDays={fireState.streakDays}
          lastActionDate={fireState.lastActionDate}
        />

        {/* Fire Visualization */}
        <div className="mb-12">
          <FireVisualization fireLevel={fireState.fireLevel} />
        </div>

        {/* Content Buttons */}
        <div className="flex justify-center">
          <ContentButtons onAddFuel={handleAddFuel} disabled={adding} />
        </div>

        {/* Info Box */}
        <div className="mt-12 max-w-2xl mx-auto bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg p-6">
          <h3 className="text-white font-semibold text-lg mb-3">How It Works:</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>• Each content type adds fuel to the fire</li>
            <li>• The fire decays by 5 points each day</li>
            <li>• If the fire dies (reaches 0), your streak resets</li>
            <li>• Bigger content = more fuel = longer burn time</li>
            <li>• Keep publishing to maintain your streak!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
