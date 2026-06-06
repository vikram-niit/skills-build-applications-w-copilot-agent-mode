import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log(`Connected to ${mongoUri}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava.chen@example.com', level: 'advanced', points: 420 },
    { name: 'Noah Rivera', email: 'noah.rivera@example.com', level: 'intermediate', points: 390 },
    { name: 'Mia Patel', email: 'mia.patel@example.com', level: 'beginner', points: 310 },
  ]);

  const teams = await Team.insertMany([
    { name: 'Trail Blazers', members: 6, points: 120, captain: 'Ava Chen' },
    { name: 'Power Pace', members: 5, points: 98, captain: 'Noah Rivera' },
  ]);

  await Activity.insertMany([
    { user: 'Ava Chen', type: 'run', minutes: 30, calories: 240, date: '2026-06-01' },
    { user: 'Noah Rivera', type: 'strength', minutes: 45, calories: 180, date: '2026-06-02' },
    { user: 'Mia Patel', type: 'walk', minutes: 25, calories: 110, date: '2026-06-03' },
  ]);

  await LeaderboardEntry.insertMany([
    { rank: 1, name: 'Ava Chen', points: 420 },
    { rank: 2, name: 'Noah Rivera', points: 390 },
    { rank: 3, name: 'Mia Patel', points: 310 },
  ]);

  await Workout.insertMany([
    { title: 'Morning Run', difficulty: 'easy', duration: 20, focus: 'endurance' },
    { title: 'Core & Cardio', difficulty: 'medium', duration: 35, focus: 'strength' },
    { title: 'Interval Sprint', difficulty: 'hard', duration: 15, focus: 'speed' },
  ]);

  console.log('Seeded collections:', {
    users: users.length,
    teams: teams.length,
    activities: 3,
    leaderboard: 3,
    workouts: 3,
  });

  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
