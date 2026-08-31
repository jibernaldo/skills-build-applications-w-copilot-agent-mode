import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  totalCalories: number;
  totalActivities: number;
  rank: number;
  period: 'overall' | 'weekly' | 'monthly';
  teamId?: mongoose.Types.ObjectId;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    totalCalories: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    rank: { type: Number, required: true },
    period: {
      type: String,
      enum: ['overall', 'weekly', 'monthly'],
      default: 'overall',
    },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
