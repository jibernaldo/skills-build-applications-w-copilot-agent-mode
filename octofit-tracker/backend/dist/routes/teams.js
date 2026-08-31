"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
/**
 * GET /api/teams/ - Get all teams
 */
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.default.find()
            .populate('members')
            .populate('createdBy');
        res.json({
            message: 'Get all teams',
            data: teams,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching teams',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * GET /api/teams/:id - Get team by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findById(id)
            .populate('members')
            .populate('createdBy');
        if (!team) {
            return res.status(404).json({
                message: `Team ${id} not found`,
                status: 'error',
            });
        }
        res.json({
            message: `Get team ${id}`,
            data: team,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching team',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * POST /api/teams/ - Create new team
 */
router.post('/', async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;
        const team = await Team_1.default.create({
            name,
            description,
            createdBy,
            members: createdBy ? [createdBy] : [],
        });
        const populatedTeam = await team.populate(['members', 'createdBy']);
        res.status(201).json({
            message: 'Team created successfully',
            data: populatedTeam,
            status: 'success',
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error creating team',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * PUT /api/teams/:id - Update team
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTeam = await Team_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        })
            .populate('members')
            .populate('createdBy');
        if (!updatedTeam) {
            return res.status(404).json({
                message: `Team ${id} not found`,
                status: 'error',
            });
        }
        res.json({
            message: `Team ${id} updated`,
            data: updatedTeam,
            status: 'success',
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error updating team',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * DELETE /api/teams/:id - Delete team
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: `Team ${id} deleted`,
        status: 'success',
    });
});
exports.default = router;
//# sourceMappingURL=teams.js.map