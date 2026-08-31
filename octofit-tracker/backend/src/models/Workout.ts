import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  estimatedCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        duration: Number,
      },
    ],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    estimatedCalories: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
