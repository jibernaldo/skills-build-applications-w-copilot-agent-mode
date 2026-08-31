import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
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
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
    path: req.path,
    status: 'error',
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
function getApiUrl(): string {
  const codespaceId = process.env.CODESPACE_NAME;
  const codespacePort = PORT;

  if (codespaceId) {
    // Running in GitHub Codespaces
    const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';
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

export default app;
