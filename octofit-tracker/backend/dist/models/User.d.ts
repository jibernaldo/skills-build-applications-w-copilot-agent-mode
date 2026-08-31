import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map