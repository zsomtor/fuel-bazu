'use client';

import { HistoryEntry } from '@/lib/types';

interface HistoryProps {
  history: HistoryEntry[];
}

export default function History({ history }: HistoryProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getFuelColor = (fuelValue: number) => {
    if (fuelValue <= 3) return 'text-gray-400';
    if (fuelValue <= 6) return 'text-orange-400';
    if (fuelValue <= 9) return 'text-red-400';
    return 'text-purple-400';
  };

  if (history.length === 0) {
    return (
      <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
        <h3 className="text-white font-semibold text-lg mb-3">Recent Publications</h3>
        <p className="text-gray-500 text-sm text-center py-4">
          No publications yet. Start adding fuel to the fire!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
      <h3 className="text-white font-semibold text-lg mb-4">Recent Publications</h3>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((entry, index) => (
          <div
            key={`${entry.timestamp}-${index}`}
            className="flex items-center justify-between bg-gray-900/30 rounded-lg px-4 py-2 border border-gray-700/20"
          >
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{entry.label}</div>
              <div className="text-gray-500 text-xs">
                {formatDate(entry.timestamp)} at {formatTime(entry.timestamp)}
              </div>
            </div>
            <div className={`text-sm font-semibold ${getFuelColor(entry.fuelValue)}`}>
              +{entry.fuelValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
