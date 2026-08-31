import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map