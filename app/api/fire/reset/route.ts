import { NextResponse } from 'next/server';
import { saveFireState } from '@/lib/kv';
import { getInitialState } from '@/lib/gameLogic';

export async function POST() {
  try {
    // Reset to initial state (fire level 10, streak 0, empty history)
    const initialState = getInitialState();

    // Set fire level to 0 instead of the default 10
    const resetState = {
      ...initialState,
      fireLevel: 0,
    };

    // Save the reset state
    await saveFireState(resetState);

    return NextResponse.json(resetState);
  } catch (error) {
    console.error('Error resetting fire state:', error);
    return NextResponse.json(
      { error: 'Failed to reset fire state' },
      { status: 500 }
    );
  }
}
