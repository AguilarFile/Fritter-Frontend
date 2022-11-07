import {Types, PopulatedDoc, Document, SchemaType} from 'mongoose';
import {Schema, model} from 'mongoose';

export type GroupPair = {
  _id: Types.ObjectId;
  group: Types.ObjectId;
  user: Types.ObjectId;
};

const GroupPairSchema = new Schema<GroupPair>({
  group: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  }
}, {
    toObject: { virtuals: true, versionKey: false },
    toJSON: { virtuals: true, versionKey: false }
});
  

const GroupPairModel = model<GroupPair>('GroupPair', GroupPairSchema);
export default GroupPairModel;