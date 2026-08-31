import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map