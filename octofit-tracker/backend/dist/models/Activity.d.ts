import mongoose, { Document } from 'mongoose';
export interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    duration: number;
    distance?: number;
    calories: number;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map