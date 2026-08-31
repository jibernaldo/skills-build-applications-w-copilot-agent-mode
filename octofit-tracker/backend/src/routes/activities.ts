import express, { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

/**
 * GET /api/activities/ - Get all activities
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({
      message: 'Get all activities',
      data: activities,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching activities',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * GET /api/activities/:id - Get activity by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({
        message: `Activity ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get activity ${id}`,
      data: activity,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching activity',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * POST /api/activities/ - Log new activity
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories } = req.body;
    const activity = await Activity.create({
      userId,
      type,
      duration,
      distance,
      calories,
      timestamp: new Date(),
    });
    const populatedActivity = await activity.populate('userId');
    res.status(201).json({
      message: 'Activity logged successfully',
      data: populatedActivity,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error logging activity',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * PUT /api/activities/:id - Update activity
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('userId');
    if (!updatedActivity) {
      return res.status(404).json({
        message: `Activity ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Activity ${id} updated`,
      data: updatedActivity,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating activity',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * DELETE /api/activities/:id - Delete activity
 */
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Activity ${id} deleted`,
    status: 'success',
  });
});

export default router;
