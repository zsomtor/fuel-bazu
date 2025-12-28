import { NextResponse } from 'next/server';
import { getFireState, saveFireState } from '@/lib/kv';
import { undoLastAction } from '@/lib/gameLogic';

export async function POST() {
  try {
    // Get current state
    const state = await getFireState();

    if (!state.lastAction) {
      return NextResponse.json(
        { error: 'No action to undo' },
        { status: 400 }
      );
    }

    // Undo the last action
    const newState = undoLastAction(state);

    // Save the new state
    await saveFireState(newState);

    return NextResponse.json(newState);
  } catch (error) {
    console.error('Error undoing action:', error);
    return NextResponse.json(
      { error: 'Failed to undo action' },
      { status: 500 }
    );
  }
}
