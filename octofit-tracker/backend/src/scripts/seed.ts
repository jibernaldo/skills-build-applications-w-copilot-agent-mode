import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    console.log('Cleared existing data');

    // Create Users
    const users = await User.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        fitnessLevel: 'advanced',
        preferences: ['running', 'weightlifting'],
        totalActivities: 42,
        totalCalories: 18500,
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        fitnessLevel: 'intermediate',
        preferences: ['cycling', 'swimming'],
        totalActivities: 35,
        totalCalories: 14200,
      },
      {
        name: 'Carol Williams',
        email: 'carol@example.com',
        fitnessLevel: 'beginner',
        preferences: ['yoga', 'walking'],
        totalActivities: 18,
        totalCalories: 6800,
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        fitnessLevel: 'advanced',
        preferences: ['running', 'crossfit'],
        totalActivities: 55,
        totalCalories: 22100,
      },
      {
        name: 'Emma Davis',
        email: 'emma@example.com',
        fitnessLevel: 'intermediate',
        preferences: ['pilates', 'hiking'],
        totalActivities: 28,
        totalCalories: 11200,
      },
    ]);

    console.log(`Created ${users.length} users`);

    // Create Teams
    const teams = await Team.create([
      {
        name: 'Fitness Warriors',
        description: 'Dedicated to achieving peak fitness through hard work and determination',
        createdBy: users[0]._id,
        members: [users[0]._id, users[1]._id, users[3]._id],
        totalCalories: 54800,
      },
      {
        name: 'Wellness Yogis',
        description: 'Balanced fitness approach focusing on mind and body wellness',
        createdBy: users[2]._id,
        members: [users[2]._id, users[4]._id],
        totalCalories: 18000,
      },
    ]);

    // Update users with team references
    await User.updateMany(
      { _id: { $in: [users[0]._id, users[1]._id, users[3]._id] } },
      { teamId: teams[0]._id }
    );
    await User.updateMany(
      { _id: { $in: [users[2]._id, users[4]._id] } },
      { teamId: teams[1]._id }
    );

    console.log(`Created ${teams.length} teams`);

    // Create Workouts
    const workouts = await Workout.create([
      {
        name: 'Morning Run',
        description: 'A refreshing 5km morning run to start your day',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 5, duration: 5 },
          { name: 'Main run', sets: 1, reps: 1, duration: 30 },
          { name: 'Cool-down walk', sets: 1, reps: 5, duration: 5 },
        ],
        difficulty: 'medium',
        fitnessLevel: 'beginner',
        estimatedCalories: 500,
      },
      {
        name: 'Upper Body Strength',
        description: 'Comprehensive upper body workout targeting chest, back, and shoulders',
        exercises: [
          { name: 'Bench press', sets: 4, reps: 8 },
          { name: 'Rows', sets: 4, reps: 8 },
          { name: 'Shoulder press', sets: 3, reps: 10 },
          { name: 'Pull-ups', sets: 3, reps: 8 },
        ],
        difficulty: 'hard',
        fitnessLevel: 'advanced',
        estimatedCalories: 450,
      },
      {
        name: 'Yoga Flow',
        description: 'Relaxing yoga session focusing on flexibility and mindfulness',
        exercises: [
          { name: 'Sun salutations', sets: 5, reps: 1, duration: 15 },
          { name: 'Standing poses', sets: 1, reps: 1, duration: 20 },
          { name: 'Seated stretches', sets: 1, reps: 1, duration: 15 },
          { name: 'Meditation', sets: 1, reps: 1, duration: 10 },
        ],
        difficulty: 'easy',
        fitnessLevel: 'beginner',
        estimatedCalories: 150,
      },
      {
        name: 'HIIT Cardio Blast',
        description: 'High-intensity interval training for maximum calorie burn',
        exercises: [
          { name: 'Jumping jacks', sets: 5, reps: 30, duration: 1 },
          { name: 'Burpees', sets: 5, reps: 15, duration: 2 },
          { name: 'Mountain climbers', sets: 5, reps: 20, duration: 1 },
          { name: 'Rest periods', sets: 5, reps: 1, duration: 1 },
        ],
        difficulty: 'hard',
        fitnessLevel: 'advanced',
        estimatedCalories: 600,
      },
      {
        name: 'Cycling Adventure',
        description: 'Moderate pace cycling through scenic routes',
        exercises: [
          { name: 'Warm-up', sets: 1, reps: 1, duration: 10 },
          { name: 'Steady pace cycling', sets: 1, reps: 1, duration: 45 },
          { name: 'Cool-down', sets: 1, reps: 1, duration: 5 },
        ],
        difficulty: 'medium',
        fitnessLevel: 'intermediate',
        estimatedCalories: 550,
      },
    ]);

    console.log(`Created ${workouts.length} workouts`);

    // Create Activities
    const activities = await Activity.create([
      // Alice's activities
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.5,
        calories: 650,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'weightlifting',
        duration: 60,
        calories: 500,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 35,
        distance: 5.8,
        calories: 520,
        timestamp: new Date(),
      },
      // Bob's activities
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 50,
        distance: 25,
        calories: 480,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        type: 'swimming',
        duration: 40,
        calories: 400,
        timestamp: new Date(),
      },
      // Carol's activities
      {
        userId: users[2]._id,
        type: 'yoga',
        duration: 60,
        calories: 180,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id,
        type: 'walking',
        duration: 30,
        distance: 2.5,
        calories: 150,
        timestamp: new Date(),
      },
      // David's activities
      {
        userId: users[3]._id,
        type: 'crossfit',
        duration: 60,
        calories: 600,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]._id,
        type: 'running',
        duration: 40,
        distance: 6.5,
        calories: 550,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]._id,
        type: 'crossfit',
        duration: 55,
        calories: 580,
        timestamp: new Date(),
      },
      // Emma's activities
      {
        userId: users[4]._id,
        type: 'pilates',
        duration: 50,
        calories: 250,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]._id,
        type: 'hiking',
        duration: 90,
        distance: 8,
        calories: 680,
        timestamp: new Date(),
      },
    ]);

    console.log(`Created ${activities.length} activities`);

    // Create Leaderboard entries
    const leaderboardData = [
      {
        userId: users[3]._id,
        userName: users[3].name,
        totalCalories: 22100,
        totalActivities: 55,
        rank: 1,
        period: 'overall' as const,
      },
      {
        userId: users[0]._id,
        userName: users[0].name,
        totalCalories: 18500,
        totalActivities: 42,
        rank: 2,
        period: 'overall' as const,
      },
      {
        userId: users[1]._id,
        userName: users[1].name,
        totalCalories: 14200,
        totalActivities: 35,
        rank: 3,
        period: 'overall' as const,
      },
      {
        userId: users[4]._id,
        userName: users[4].name,
        totalCalories: 11200,
        totalActivities: 28,
        rank: 4,
        period: 'overall' as const,
      },
      {
        userId: users[2]._id,
        userName: users[2].name,
        totalCalories: 6800,
        totalActivities: 18,
        rank: 5,
        period: 'overall' as const,
      },
      // Team leaderboard
      {
        userId: users[3]._id,
        userName: users[3].name,
        totalCalories: 22100,
        totalActivities: 55,
        rank: 1,
        period: 'overall' as const,
        teamId: teams[0]._id,
      },
      {
        userId: users[0]._id,
        userName: users[0].name,
        totalCalories: 18500,
        totalActivities: 42,
        rank: 2,
        period: 'overall' as const,
        teamId: teams[0]._id,
      },
      {
        userId: users[1]._id,
        userName: users[1].name,
        totalCalories: 14200,
        totalActivities: 35,
        rank: 3,
        period: 'overall' as const,
        teamId: teams[0]._id,
      },
      {
        userId: users[4]._id,
        userName: users[4].name,
        totalCalories: 11200,
        totalActivities: 28,
        rank: 1,
        period: 'overall' as const,
        teamId: teams[1]._id,
      },
      {
        userId: users[2]._id,
        userName: users[2].name,
        totalCalories: 6800,
        totalActivities: 18,
        rank: 2,
        period: 'overall' as const,
        teamId: teams[1]._id,
      },
    ];

    const leaderboardEntries = await Leaderboard.create(leaderboardData);

    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);
    console.log('\nDatabase seeding complete');
    console.log(`
✓ Users: ${users.length}
✓ Teams: ${teams.length}
✓ Activities: ${activities.length}
✓ Workouts: ${workouts.length}
✓ Leaderboard entries: ${leaderboardEntries.length}

Ready to test API endpoints at http://localhost:8000/api/
    `);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
