"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
/**
 * GET /api/leaderboard/ - Get overall leaderboard
 */
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find({ period: 'overall', teamId: undefined })
            .populate('userId')
            .sort({ rank: 1 });
        res.json({
            message: 'Get overall leaderboard',
            leaderboard,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching leaderboard',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * GET /api/leaderboard/teams/:teamId - Get team leaderboard
 */
router.get('/teams/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard_1.default.find({
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
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching team leaderboard',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * GET /api/leaderboard/weekly - Get weekly leaderboard
 */
router.get('/weekly', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find({ period: 'weekly' })
            .populate('userId')
            .sort({ rank: 1 });
        res.json({
            message: 'Get weekly leaderboard',
            period: 'weekly',
            leaderboard,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching weekly leaderboard',
            error: error.message,
            status: 'error',
        });
    }
});
/**
 * GET /api/leaderboard/monthly - Get monthly leaderboard
 */
router.get('/monthly', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find({ period: 'monthly' })
            .populate('userId')
            .sort({ rank: 1 });
        res.json({
            message: 'Get monthly leaderboard',
            period: 'monthly',
            leaderboard,
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching monthly leaderboard',
            error: error.message,
            status: 'error',
        });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map