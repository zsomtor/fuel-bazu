'use client';

import { getFireIntensity } from '@/lib/gameLogic';

interface FireVisualizationProps {
  fireLevel: number;
}

export default function FireVisualization({ fireLevel }: FireVisualizationProps) {
  const intensity = getFireIntensity(fireLevel);

  const getFlameColors = () => {
    if (intensity === 0) return 'bg-gray-700';
    if (intensity === 1) return 'fire-tiny';
    if (intensity === 2) return 'fire-small';
    if (intensity === 3) return 'fire-medium';
    if (intensity === 4) return 'fire-large';
    return 'fire-huge';
  };

  const getFlameHeight = () => {
    if (intensity === 0) return 'h-4';
    if (intensity === 1) return 'h-16';
    if (intensity === 2) return 'h-24';
    if (intensity === 3) return 'h-32';
    if (intensity === 4) return 'h-40';
    return 'h-48';
  };

  return (
    <div className="flex flex-col items-center justify-end h-96">
      {/* Fire Level Indicator */}
      <div className="mb-4 text-center">
        <div className="text-6xl font-bold text-white mb-2">
          {Math.round(fireLevel)}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wider">
          Fire Level
        </div>
      </div>

      {/* Fire Visualization */}
      <div className="relative flex items-end justify-center">
        {intensity > 0 ? (
          <div className="relative">
            {/* Main flame */}
            <div
              className={`${getFlameHeight()} w-32 ${getFlameColors()} rounded-t-full blur-sm`}
              style={{
                animation: 'flicker 1s infinite alternate',
              }}
            />
            {/* Inner flame glow */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${getFlameHeight()} w-20 opacity-80`}
              style={{
                background: 'radial-gradient(ellipse at bottom, #ffff00 0%, #ff6600 50%, transparent 70%)',
                animation: 'flicker 0.8s infinite alternate-reverse',
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">💀</div>
            <div className="text-gray-500 text-lg font-semibold">Fire Died</div>
          </div>
        )}

        {/* Wood/Coal base */}
        <div className="absolute -bottom-8 w-40 h-12 bg-gradient-to-b from-amber-900 to-amber-950 rounded-lg" />
        <div className="absolute -bottom-10 w-44 h-4 bg-gray-800 rounded-full blur-sm opacity-50" />
      </div>
    </div>
  );
}
