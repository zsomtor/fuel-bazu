'use client';

interface StatsProps {
  streakDays: number;
  lastActionDate: string | null;
}

export default function Stats({ streakDays, lastActionDate }: StatsProps) {
  const formatLastAction = (date: string | null) => {
    if (!date) return 'Never';

    const actionDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - actionDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="flex gap-8 justify-center items-center mb-8">
      {/* Streak Counter */}
      <div className="flex flex-col items-center bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm px-8 py-4 rounded-lg border border-amber-700/30">
        <div className="text-5xl font-bold text-amber-400 mb-1">
          {streakDays}
        </div>
        <div className="text-sm text-amber-200 uppercase tracking-wider">
          Day Streak 🔥
        </div>
      </div>

      {/* Last Action */}
      <div className="flex flex-col items-center bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm px-8 py-4 rounded-lg border border-gray-700/30">
        <div className="text-2xl font-semibold text-gray-300 mb-1">
          {formatLastAction(lastActionDate)}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wider">
          Last Published
        </div>
      </div>
    </div>
  );
}
