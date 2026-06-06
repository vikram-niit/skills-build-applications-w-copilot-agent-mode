import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  level: string;
  points?: number;
}

export interface ITeam extends mongoose.Document {
  name: string;
  members: number;
  points: number;
  captain?: string;
}

export interface IActivity extends mongoose.Document {
  user: string;
  type: string;
  minutes: number;
  calories: number;
  date?: string;
}

export interface ILeaderboardEntry extends mongoose.Document {
  rank: number;
  name: string;
  points: number;
}

export interface IWorkout extends mongoose.Document {
  title: string;
  difficulty: string;
  duration: number;
  focus?: string;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    points: { type: Number, default: 0 },
    captain: { type: String },
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    date: { type: String, default: new Date().toISOString().slice(0, 10) },
  },
  { timestamps: true }
);

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
