"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
// Minimal backend source update to keep the Step 4 trigger path active.
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json({ message: 'Users list', items: users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().lean();
    res.json({ message: 'Teams list', items: teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().lean();
    res.json({ message: 'Activities list', items: activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().sort('rank').lean();
    res.json({ message: 'Leaderboard', items: leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
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
(0, database_1.connectToDatabase)()
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
