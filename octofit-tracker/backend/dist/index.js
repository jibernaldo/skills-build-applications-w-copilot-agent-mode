"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
// Health check endpoint
app.get('/api/health', (req, res) => {
    const apiUrl = getApiUrl();
    res.json({
        status: 'API is running',
        timestamp: new Date().toISOString(),
        apiUrl,
        environment: process.env.NODE_ENV || 'development',
    });
});
// Mount route handlers
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        path: req.path,
        status: 'error',
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        status: 'error',
    });
});
/**
 * Get API URL with Codespaces support
 * Detects if running in GitHub Codespaces and returns appropriate URL
 */
function getApiUrl() {
    const codespaceId = process.env.CODESPACE_NAME;
    const codespacePort = PORT;
    if (codespaceId) {
        // Running in GitHub Codespaces
        const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'github.dev';
        return `https://${codespaceId}-${codespacePort}.${domain}`;
    }
    // Default to localhost
    return `http://localhost:${codespacePort}`;
}
// Start server
app.listen(PORT, () => {
    const apiUrl = getApiUrl();
    console.log(`Server is running on ${apiUrl}`);
    console.log(`MongoDB is connected to ${MONGODB_URI}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map