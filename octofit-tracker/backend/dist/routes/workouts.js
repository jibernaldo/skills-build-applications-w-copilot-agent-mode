"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
/**
 * GET /api/workouts/ - Get all workout suggestions
 */
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.default.find();
        res.json({
            message: 'Get all workout suggestions',
            data: workouts,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching workouts',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * GET /api/workouts/:id - Get workout by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.default.findById(id);
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
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching workout',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * POST /api/workouts/suggest - Get personalized workout suggestions
 */
router.post('/suggest', async (req, res) => {
    try {
        const { fitnessLevel } = req.body;
        const suggestions = await Workout_1.default.find({ fitnessLevel });
        res.status(201).json({
            message: 'Personalized workout suggestions generated',
            data: {
                fitnessLevel,
                suggestions,
            },
            status: 'success',
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error generating suggestions',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * POST /api/workouts/ - Create new workout plan
 */
router.post('/', async (req, res) => {
    try {
        const { name, description, exercises, difficulty, fitnessLevel, estimatedCalories } = req.body;
        const workout = await Workout_1.default.create({
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
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating workout',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * PUT /api/workouts/:id - Update workout
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkout = await Workout_1.default.findByIdAndUpdate(id, req.body, {
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
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating workout',
            error: error.message,
            status: 'error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map