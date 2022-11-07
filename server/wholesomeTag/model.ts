import {Types, PopulatedDoc, Document, SchemaType} from 'mongoose';
import {Schema, model} from 'mongoose';

export type WholesomeTag = {
  _id: Types.ObjectId;
  freet: Types.ObjectId;
};

const WholesomeTagSchema = new Schema<WholesomeTag>({
  freet: {
    type: Schema.Types.ObjectId,
    required: true,
  }
}, {
    toObject: { virtuals: true, versionKey: false },
    toJSON: { virtuals: true, versionKey: false }
});
  

const WholesomeTagModel = model<WholesomeTag>('Tag', WholesomeTagSchema);
export default WholesomeTagModel;