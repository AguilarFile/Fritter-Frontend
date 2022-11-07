import type {HydratedDocument, Types} from 'mongoose';
import type {GroupPair} from './model';
import GroupPairModel from './model';

class GroupPairCollection {

    static async addOne(group: Types.ObjectId | String, user: Types.ObjectId | String): Promise<HydratedDocument<GroupPair>> {
        const bond = new GroupPairModel({
            group,
            user
        });
        await bond.save();
        return bond;
    }

    static async deleteOne(group: Types.ObjectId | String, user: Types.ObjectId | String): Promise<Boolean> {
        const bond = await GroupPairModel.deleteOne({
            group: group,
            user: user
        })
        return bond !== null;
    }


     static async findOne(group: Types.ObjectId | String, user: Types.ObjectId | String): Promise<HydratedDocument<GroupPair>> {
        return GroupPairModel.findOne({
            group: group,
            user: user
        })
    }

    static async findAll(group: Types.ObjectId | String): Promise<Array<HydratedDocument<GroupPair>>> {
        return GroupPairModel.find({
            group: group
        })
    }
}
export default GroupPairCollection;