import express, { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

/**
 * GET /api/users/ - Get all users
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('teamId');
    res.json({
      message: 'Get all users',
      data: users,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * GET /api/users/:id - Get user by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('teamId');
    if (!user) {
      return res.status(404).json({
        message: `User ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get user ${id}`,
      data: user,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * POST /api/users/ - Create new user
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, name, fitnessLevel, preferences } = req.body;
    const user = await User.create({
      email,
      name,
      fitnessLevel: fitnessLevel || 'beginner',
      preferences: preferences || [],
    });
    res.status(201).json({
      message: 'User created successfully',
      data: user,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * PUT /api/users/:id - Update user
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: `User ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `User ${id} updated`,
      data: updatedUser,
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating user',
      error: (error as any).message,
      status: 'error',
    });
  }
});

/**
 * DELETE /api/users/:id - Delete user
 */
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} deleted`,
    status: 'success',
  });
});

export default router;
