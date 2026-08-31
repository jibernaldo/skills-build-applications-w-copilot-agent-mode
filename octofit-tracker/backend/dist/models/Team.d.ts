import mongoose, { Document } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    description: string;
    members: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    totalCalories: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ITeam, {}, {}, {}, Document<unknown, {}, ITeam, {}, mongoose.DefaultSchemaOptions> & ITeam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
export default _default;
//# sourceMappingURL=Team.d.ts.map