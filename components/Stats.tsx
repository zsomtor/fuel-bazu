'use client';

interface StatsProps {
  streakDays: number;
  lastActionDate: string | null;
}

export default function Stats({ streakDays, lastActionDate }: StatsProps) {
  const formatDate = (date: string | null) => {
    if (!date) return null;
    const actionDate = new Date(date);
    return actionDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: string | null) => {
    if (!date) return null;
    const actionDate = new Date(date);
    return actionDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatRelativeTime = (date: string | null) => {
    if (!date) return null;

    const actionDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - actionDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} min ago`;
    return 'Just now';
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center mb-6 sm:mb-8">
      {/* Streak Counter */}
      <div className="flex flex-col items-center bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-amber-700/30">
        <div className="text-4xl sm:text-5xl font-bold text-amber-400 mb-1">
          {streakDays}
        </div>
        <div className="text-xs sm:text-sm text-amber-200 uppercase tracking-wider">
          Day Streak 🔥
        </div>
      </div>

      {/* Last Action */}
      <div className="flex flex-col items-center bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-gray-700/30 flex-1 sm:flex-none sm:min-w-[200px]">
        {lastActionDate ? (
          <>
            <div className="text-base sm:text-lg font-semibold text-gray-200">
              {formatDate(lastActionDate)}
            </div>
            <div className="text-lg sm:text-xl font-bold text-white mb-1">
              {formatTime(lastActionDate)}
            </div>
            <div className="text-xs text-gray-500">
              {formatRelativeTime(lastActionDate)}
            </div>
          </>
        ) : (
          <div className="text-lg sm:text-xl font-semibold text-gray-400 py-2">
            Never
          </div>
        )}
        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
          Last Published
        </div>
      </div>
    </div>
  );
}
