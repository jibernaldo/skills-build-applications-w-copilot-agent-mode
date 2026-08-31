import express, { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

/**
 * GET /api/leaderboard/ - Get overall leaderboard
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ period: 'overall', teamId: undefined })
      .populate('userId')
      .sort({ rank: 1 });
    res.json({
      message: 'Get overall leaderboard',
      leaderboard,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * GET /api/leaderboard/teams/:teamId - Get team leaderboard
 */
router.get('/teams/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({
      teamId,
      period: 'overall',
    })
      .populate('userId')
      .sort({ rank: 1 });
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      teamId,
      leaderboard,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching team leaderboard',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * GET /api/leaderboard/weekly - Get weekly leaderboard
 */
router.get('/weekly', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ period: 'weekly' })
      .populate('userId')
      .sort({ rank: 1 });
    res.json({
      message: 'Get weekly leaderboard',
      period: 'weekly',
      leaderboard,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching weekly leaderboard',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * GET /api/leaderboard/monthly - Get monthly leaderboard
 */
router.get('/monthly', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ period: 'monthly' })
      .populate('userId')
      .sort({ rank: 1 });
    res.json({
      message: 'Get monthly leaderboard',
      period: 'monthly',
      leaderboard,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching monthly leaderboard',
      error: (error as any).message,
      status: 'error',
    });
  }
});

export default router;
