# 🔥 Media Fire Tracker

A gamified webapp to track and encourage consistent media publishing. Keep the fire burning by publishing content regularly!

## Overview

This app uses a fire metaphor to gamify content publishing:
- **Add fuel** by publishing different types of content
- **Keep the fire alive** - it decays by 5 points each day
- **Build your streak** - track consecutive days of keeping the fire burning
- **Share progress** - one global fire that the whole team contributes to

## Content Types (Impact Levels)

From least to most impactful:
1. YouTube Community Post (+1)
2. Facebook Post (+2)
3. Instagram Story (+3)
4. Random TikTok (+4)
5. Instagram Reel (+5)
6. YouTube Long Clip (+6)
7. Facebook Reel (+7)
8. Podcast TikTok (+8)
9. Street TikTok (+9)
10. YouTube Street Long (+10)
11. YouTube Podcast Long (+11)

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel KV** - Redis database for shared state

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel KV

You need a Vercel account and a KV (Redis) database:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new KV database (Storage → KV → Create)
3. Copy the environment variables shown
4. Create a `.env.local` file in the project root
5. Paste the KV environment variables:

```bash
KV_URL=your_kv_url
KV_REST_API_URL=your_rest_api_url
KV_REST_API_TOKEN=your_token
KV_REST_API_READ_ONLY_TOKEN=your_read_only_token
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deploy to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Next.js
5. Add your KV database to the project:
   - Go to your project settings
   - Navigate to Storage
   - Connect your existing KV database or create a new one
   - Environment variables will be added automatically
6. Deploy!

### Manual Environment Setup

If you need to manually add environment variables:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the KV variables from your `.env.local`

## How It Works

### Game Mechanics

- **Fire Level**: 0-100 points
- **Starting Fuel**: 10 points
- **Daily Decay**: -5 points per day
- **Streak Tracking**: Days the fire has stayed alive
- **Shared State**: Everyone contributes to the same fire

### Data Persistence

All data is stored in Vercel KV (Redis):
- Current fire level
- Streak count
- Last action timestamp
- Last decay check timestamp

### Daily Decay

The fire automatically decays each day. When you open the app or add fuel, it calculates how many days have passed and applies the decay. If the fire reaches 0, the streak resets.

## Development

### Project Structure

```
├── app/
│   ├── api/fire/          # API routes for fire state
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles & animations
├── components/
│   ├── FireVisualization.tsx   # Fire animation
│   ├── ContentButtons.tsx      # Content type buttons
│   └── Stats.tsx               # Streak & last action display
└── lib/
    ├── types.ts           # TypeScript definitions
    ├── gameLogic.ts       # Game mechanics
    └── kv.ts              # Database helpers
```

### Customization

Want to adjust the game mechanics? Edit these constants in `lib/types.ts`:

```typescript
export const MAX_FIRE_LEVEL = 100;      // Maximum fire level
export const INITIAL_FIRE_LEVEL = 10;   // Starting fuel
export const DECAY_PER_DAY = 5;         // Daily decay amount
```

To change content types or their impact, modify the `CONTENT_TYPES` array in `lib/types.ts`.

## License

MIT
