import { FireState, DECAY_PER_DAY, MAX_FIRE_LEVEL, INITIAL_FIRE_LEVEL } from './types';

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

  const decayAmount = daysPassed * DECAY_PER_DAY;
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
export function addFuel(state: FireState, fuelValue: number): FireState {
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

  return {
    fireLevel: newFireLevel,
    streakDays: newStreakDays,
    lastActionDate: now,
    lastDecayCheck: now,
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
