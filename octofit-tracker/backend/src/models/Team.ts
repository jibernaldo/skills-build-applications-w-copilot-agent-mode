import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  totalCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalCalories: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>('Team', teamSchema);
