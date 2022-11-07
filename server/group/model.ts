import {Types, PopulatedDoc, Document, SchemaType} from 'mongoose';
import {Schema, model} from 'mongoose';

export type Group = {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    name: String;
    dateCreated: Date;
    users?: Array<Types.ObjectId>;
    dateModified: Date;
  };


const GroupSchema = new Schema<Group>({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    dateCreated: {
      type: Date,
      required: true
    },
    dateModified: {
      type: Date,
      required: true
    }
}, {
  toObject: { virtuals: true, versionKey: false },
  toJSON: { virtuals: true, versionKey: false }
});

GroupSchema.virtual('users', {
  ref: 'GroupPair',
  localField: '_id',
  foreignField: 'group'
});

const GroupModel = model<Group>('Group', GroupSchema);
export default GroupModel;