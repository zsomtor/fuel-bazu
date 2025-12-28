import { FireState, DECAY_PER_DAY, MAX_FIRE_LEVEL, INITIAL_FIRE_LEVEL, MAX_HISTORY_ENTRIES } from './types';

/**
 * Calculate how many days have passed between two dates
 */
export function getDaysPassed(fromDate: string, toDate: string): number {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate accelerating decay for N days
 * Day 1: -7, Day 2: -10, Day 3: -13, etc. (+3 increase each day)
 * Formula: 5.5N + 1.5N²
 */
function calculateAcceleratingDecay(days: number): number {
  return Math.floor(5.5 * days + 1.5 * days * days);
}

/**
 * Apply decay to the fire based on days passed
 */
export function applyDecay(state: FireState): FireState {
  if (!state.lastDecayCheck) {
    return {
      ...state,
      lastDecayCheck: new Date().toISOString(),
    };
  }

  const now = new Date().toISOString();
  const daysPassed = getDaysPassed(state.lastDecayCheck, now);

  if (daysPassed === 0) {
    return state;
  }

  // Use accelerating decay: 7, 10, 13, 16, etc.
  const decayAmount = calculateAcceleratingDecay(daysPassed);
  const newFireLevel = Math.max(0, state.fireLevel - decayAmount);

  // If fire died, reset streak
  const newStreakDays = newFireLevel === 0 ? 0 : state.streakDays;

  return {
    ...state,
    fireLevel: newFireLevel,
    streakDays: newStreakDays,
    lastDecayCheck: now,
  };
}

/**
 * Add fuel to the fire
 */
export function addFuel(state: FireState, fuelValue: number, label: string): FireState {
  const now = new Date().toISOString();
  const today = new Date().toDateString();
  const lastActionDay = state.lastActionDate
    ? new Date(state.lastActionDate).toDateString()
    : null;

  // Calculate new fire level (capped at MAX)
  const newFireLevel = Math.min(MAX_FIRE_LEVEL, state.fireLevel + fuelValue);

  // Update streak: increment if fire is alive and we haven't acted today yet
  let newStreakDays = state.streakDays;
  if (state.fireLevel > 0 && lastActionDay !== today) {
    newStreakDays = state.streakDays + 1;
  } else if (state.fireLevel === 0) {
    // Fire was dead, starting fresh
    newStreakDays = 1;
  }

  // Add to history and keep only the last MAX_HISTORY_ENTRIES
  const newHistory = [
    { label, fuelValue, timestamp: now },
    ...(state.history || []),
  ].slice(0, MAX_HISTORY_ENTRIES);

  return {
    fireLevel: newFireLevel,
    streakDays: newStreakDays,
    lastActionDate: now,
    lastDecayCheck: now,
    lastAction: {
      fuelValue,
      label,
      timestamp: now,
      previousFireLevel: state.fireLevel,
      previousStreak: state.streakDays,
    },
    history: newHistory,
  };
}

/**
 * Undo the last action
 */
export function undoLastAction(state: FireState): FireState {
  if (!state.lastAction) {
    return state;
  }

  // Remove the most recent history entry (the one we're undoing)
  const newHistory = state.history.slice(1);

  return {
    ...state,
    fireLevel: state.lastAction.previousFireLevel,
    streakDays: state.lastAction.previousStreak,
    lastAction: null,
    history: newHistory,
  };
}

/**
 * Get initial fire state
 */
export function getInitialState(): FireState {
  return {
    fireLevel: INITIAL_FIRE_LEVEL,
    streakDays: 0,
    lastActionDate: null,
    lastDecayCheck: new Date().toISOString(),
    lastAction: null,
    history: [],
  };
}

/**
 * Get the fire intensity level for visualization (0-5)
 */
export function getFireIntensity(fireLevel: number): number {
  if (fireLevel === 0) return 0;
  if (fireLevel <= 20) return 1;
  if (fireLevel <= 40) return 2;
  if (fireLevel <= 60) return 3;
  if (fireLevel <= 80) return 4;
  return 5;
}
