import { NextResponse } from 'next/server';
import { getFireState, saveFireState } from '@/lib/kv';
import { applyDecay } from '@/lib/gameLogic';

export async function GET() {
  try {
    const state = await getFireState();
    const decayedState = applyDecay(state);

    // Save the decayed state back to the store
    if (decayedState.fireLevel !== state.fireLevel) {
      await saveFireState(decayedState);
    }

    return NextResponse.json(decayedState);
  } catch (error) {
    console.error('Error fetching fire state:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fire state' },
      { status: 500 }
    );
  }
}
