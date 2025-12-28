'use client';

import { HistoryEntry } from '@/lib/types';

interface HistoryProps {
  history: HistoryEntry[];
  onRemove?: (timestamp: string) => void;
}

export default function History({ history, onRemove }: HistoryProps) {
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
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 sm:p-6">
      <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Recent Publications</h3>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((entry, index) => (
          <div
            key={`${entry.timestamp}-${index}`}
            className="flex items-center justify-between gap-2 sm:gap-3 bg-gray-900/30 rounded-lg px-3 sm:px-4 py-2 border border-gray-700/20 group hover:bg-gray-900/40 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs sm:text-sm font-medium truncate">{entry.label}</div>
              <div className="text-gray-500 text-[10px] sm:text-xs">
                {formatDate(entry.timestamp)} at {formatTime(entry.timestamp)}
              </div>
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${getFuelColor(entry.fuelValue)} flex-shrink-0`}>
              +{entry.fuelValue}
            </div>
            {onRemove && (
              <button
                onClick={() => onRemove(entry.timestamp)}
                className="flex-shrink-0 text-red-400 hover:text-red-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs px-1.5 sm:px-2 py-1 hover:bg-red-900/20 rounded"
                title="Remove from history"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
