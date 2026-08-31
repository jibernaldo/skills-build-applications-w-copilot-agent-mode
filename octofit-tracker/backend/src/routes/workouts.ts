import express, { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

/**
 * GET /api/workouts/ - Get all workout suggestions
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({
      message: 'Get all workout suggestions',
      data: workouts,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workouts',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * GET /api/workouts/:id - Get workout by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({
        message: `Workout ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workout',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * POST /api/workouts/suggest - Get personalized workout suggestions
 */
router.post('/suggest', async (req: Request, res: Response) => {
  try {
    const { fitnessLevel } = req.body;
    const suggestions = await Workout.find({ fitnessLevel });
    res.status(201).json({
      message: 'Personalized workout suggestions generated',
      data: {
        fitnessLevel,
        suggestions,
      },
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error generating suggestions',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * POST /api/workouts/ - Create new workout plan
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, exercises, difficulty, fitnessLevel, estimatedCalories } = req.body;
    const workout = await Workout.create({
      name,
      description,
      exercises,
      difficulty,
      fitnessLevel,
      estimatedCalories,
    });
    res.status(201).json({
      message: 'Workout plan created successfully',
      data: workout,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating workout',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * PUT /api/workouts/:id - Update workout
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedWorkout) {
      return res.status(404).json({
        message: `Workout ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Workout ${id} updated`,
      data: updatedWorkout,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating workout',
      error: (error as any).message,
      status: 'error',
    });
  }
});

export default router;
