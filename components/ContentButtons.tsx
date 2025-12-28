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
    <div className="w-full">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">Publish Content</h2>
        <p className="text-gray-400 text-xs sm:text-sm">Select what you published</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CONTENT_TYPES.map((contentType) => (
          <button
            key={contentType.id}
            onClick={() => onAddFuel(contentType.fuelValue, contentType.label)}
            disabled={disabled}
            className={`
              relative px-3 py-3 rounded-xl font-medium text-white
              bg-gradient-to-br ${getButtonColor(contentType.fuelValue)}
              border border-white/10
              shadow-md hover:shadow-lg transform hover:scale-105
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:scale-100
            `}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">{getFuelEmoji(contentType.fuelValue)}</span>
              <span className="text-xs text-center leading-tight">
                {contentType.label}
              </span>
              <span className="text-[10px] opacity-60 font-normal">+{contentType.fuelValue}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
