import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';
import { connectToDatabase } from './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ message: 'Users list', items: users });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json({ message: 'Teams list', items: teams });
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json({ message: 'Activities list', items: activities });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort('rank').lean();
  res.json({ message: 'Leaderboard', items: leaderboard });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ message: 'Workout suggestions', items: workouts });
});

app.get('/', (_req, res) => {
  res.json({
    service: 'octofit-tracker-backend',
    status: 'ok',
    apiUrl,
    endpoints: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend API listening on ${apiUrl}`);
      console.log(`Local URL: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
