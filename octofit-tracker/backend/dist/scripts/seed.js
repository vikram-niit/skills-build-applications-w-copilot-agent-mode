"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const models_1 = require("../models");
// Seed the octofit_db database with test data
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    const { mongoUri } = await Promise.resolve().then(() => __importStar(require('../config/database')));
    await (0, database_1.connectToDatabase)();
    console.log(`Connected to ${mongoUri}`);
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava.chen@example.com', level: 'advanced', points: 420 },
        { name: 'Noah Rivera', email: 'noah.rivera@example.com', level: 'intermediate', points: 390 },
        { name: 'Mia Patel', email: 'mia.patel@example.com', level: 'beginner', points: 310 },
    ]);
    const teams = await models_1.Team.insertMany([
        { name: 'Trail Blazers', members: 6, points: 120, captain: 'Ava Chen' },
        { name: 'Power Pace', members: 5, points: 98, captain: 'Noah Rivera' },
    ]);
    await models_1.Activity.insertMany([
        { user: 'Ava Chen', type: 'run', minutes: 30, calories: 240, date: '2026-06-01' },
        { user: 'Noah Rivera', type: 'strength', minutes: 45, calories: 180, date: '2026-06-02' },
        { user: 'Mia Patel', type: 'walk', minutes: 25, calories: 110, date: '2026-06-03' },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        { rank: 1, name: 'Ava Chen', points: 420 },
        { rank: 2, name: 'Noah Rivera', points: 390 },
        { rank: 3, name: 'Mia Patel', points: 310 },
    ]);
    await models_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
});
