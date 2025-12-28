import { NextRequest, NextResponse } from 'next/server';
import { getFireState, saveFireState } from '@/lib/kv';
import { applyDecay, addFuel } from '@/lib/gameLogic';
import { ContentType } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fuelValue, label } = body;

    if (typeof fuelValue !== 'number' || fuelValue <= 0) {
      return NextResponse.json(
        { error: 'Invalid fuel value' },
        { status: 400 }
      );
    }

    if (typeof label !== 'string' || !label) {
      return NextResponse.json(
        { error: 'Invalid label' },
        { status: 400 }
      );
    }

    // Get current state and apply decay
    let state = await getFireState();
    state = applyDecay(state);

    // Add fuel
    const newState = addFuel(state, fuelValue, label);

    // Save the new state
    await saveFireState(newState);

    return NextResponse.json(newState);
  } catch (error) {
    console.error('Error adding fuel:', error);
    return NextResponse.json(
      { error: 'Failed to add fuel' },
      { status: 500 }
    );
  }
}
