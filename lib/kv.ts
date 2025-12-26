import { kv } from '@vercel/kv';
import { FireState } from './types';
import { getInitialState } from './gameLogic';

const FIRE_STATE_KEY = 'fire_state';

/**
 * Get the current fire state from KV store
 */
export async function getFireState(): Promise<FireState> {
  try {
    const state = await kv.get<FireState>(FIRE_STATE_KEY);
    return state || getInitialState();
  } catch (error) {
    console.error('Error getting fire state:', error);
    return getInitialState();
  }
}

/**
 * Save the fire state to KV store
 */
export async function saveFireState(state: FireState): Promise<void> {
  try {
    await kv.set(FIRE_STATE_KEY, state);
  } catch (error) {
    console.error('Error saving fire state:', error);
    throw error;
  }
}
