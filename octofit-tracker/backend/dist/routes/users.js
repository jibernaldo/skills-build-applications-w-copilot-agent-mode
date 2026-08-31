"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
/**
 * GET /api/users/ - Get all users
 */
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.find().populate('teamId');
        res.json({
            message: 'Get all users',
            data: users,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * GET /api/users/:id - Get user by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id).populate('teamId');
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
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * POST /api/users/ - Create new user
 */
router.post('/', async (req, res) => {
    try {
        const { email, name, fitnessLevel, preferences } = req.body;
        const user = await User_1.default.create({
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
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating user',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * PUT /api/users/:id - Update user
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User_1.default.findByIdAndUpdate(id, req.body, {
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
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating user',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * DELETE /api/users/:id - Delete user
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: `User ${id} deleted`,
        status: 'success',
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map