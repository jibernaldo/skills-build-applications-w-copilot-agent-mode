import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  preferences: string[];
  teamId?: mongoose.Types.ObjectId;
  totalActivities: number;
  totalCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    preferences: { type: [String], default: [] },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalActivities: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
