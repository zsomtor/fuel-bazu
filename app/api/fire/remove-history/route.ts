import { NextRequest, NextResponse } from 'next/server';
import { getFireState, saveFireState } from '@/lib/kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { timestamp } = body;

    if (!timestamp) {
      return NextResponse.json(
        { error: 'Timestamp is required' },
        { status: 400 }
      );
    }

    // Get current state
    const state = await getFireState();

    // Remove the history entry with the matching timestamp
    const newHistory = state.history.filter(
      (entry) => entry.timestamp !== timestamp
    );

    const newState = {
      ...state,
      history: newHistory,
    };

    // Save the new state
    await saveFireState(newState);

    return NextResponse.json(newState);
  } catch (error) {
    console.error('Error removing history entry:', error);
    return NextResponse.json(
      { error: 'Failed to remove history entry' },
      { status: 500 }
    );
  }
}
