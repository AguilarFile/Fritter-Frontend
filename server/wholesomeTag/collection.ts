import type {HydratedDocument, Types} from 'mongoose';
import type {WholesomeTag} from './model';
import WholesomeTagModel from './model';

class WholesomeTagCollection {

    static async addOne(freet: Types.ObjectId | string): Promise<HydratedDocument<WholesomeTag>> {
        const tag = new WholesomeTagModel({freet});
        await tag.save();
        return tag;
    }

    static async deleteOne(freet: Types.ObjectId | string): Promise<Boolean> {
        const tag = await WholesomeTagModel.deleteOne({freet: freet});
        return tag !== null;
    }

    static async findOne(freet: Types.ObjectId): Promise<HydratedDocument<WholesomeTag>> {
        return WholesomeTagModel.findOne({freet: freet});
    }

    static async findAll(): Promise<HydratedDocument<WholesomeTag>[]> {
        return WholesomeTagModel.find({});
    }
}
export default WholesomeTagCollection;