"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    points: { type: Number, default: 0 },
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    points: { type: Number, default: 0 },
    captain: { type: String },
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    date: { type: String, default: new Date().toISOString().slice(0, 10) },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.default.Schema({
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
