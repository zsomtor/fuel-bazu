'use client';

import { CONTENT_TYPES, ContentTypeConfig } from '@/lib/types';

interface ContentButtonsProps {
  onAddFuel: (fuelValue: number, label: string) => void;
  disabled?: boolean;
}

export default function ContentButtons({ onAddFuel, disabled }: ContentButtonsProps) {
  const getButtonColor = (fuelValue: number) => {
    if (fuelValue <= 3) return 'from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600';
    if (fuelValue <= 6) return 'from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600';
    if (fuelValue <= 9) return 'from-red-600 to-red-700 hover:from-red-500 hover:to-red-600';
    return 'from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600';
  };

  const getFuelEmoji = (fuelValue: number) => {
    if (fuelValue <= 3) return '🪵';
    if (fuelValue <= 6) return '🔥';
    if (fuelValue <= 9) return '💥';
    return '🚀';
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Add Fuel to the Fire</h2>
        <p className="text-gray-400">Click a content type to keep the fire burning!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {CONTENT_TYPES.map((contentType) => (
          <button
            key={contentType.id}
            onClick={() => onAddFuel(contentType.fuelValue, contentType.label)}
            disabled={disabled}
            className={`
              relative px-4 py-3 rounded-lg font-semibold text-white
              bg-gradient-to-br ${getButtonColor(contentType.fuelValue)}
              shadow-lg hover:shadow-xl transform hover:scale-105
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:scale-100
            `}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">{getFuelEmoji(contentType.fuelValue)}</span>
              <span className="text-xs text-center leading-tight">
                {contentType.label}
              </span>
              <span className="text-xs opacity-75">+{contentType.fuelValue}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
