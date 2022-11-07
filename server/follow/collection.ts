import type {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';

class FollowCollection {

    /**
     * Follow a User
     * 
     * @param {Object} fromUser - the user that is going to be the follower
     * @param {Object} toUser - the user that is going to be followed
     * @return {Promise<HydratedDocument<Follow>>} - The bond
     */
    static async addOne(fromUser: Types.ObjectId | string, toUser: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
        const bond = new FollowModel({
            fromUser: fromUser,
            toUser: toUser
        });
        await bond.save();
        return bond;
    }

    /**
     * Unfollow a User
     * 
     * @param {Object} fromUser - the user that is the follower
     * @param {Object} toUser - the user that is going to be unfollowed
     * @return {Promise<Boolean>} - true if the bond has been deleted, false otherwise
     */
    static async deleteOne(fromUser: Types.ObjectId | string, toUser: Types.ObjectId | string): Promise<Boolean> {
        const bond = await FollowModel.deleteOne({
            fromUser: fromUser,
            toUser: toUser
        })
        return bond !== null;
    }

    /**
     * Find Follow Object
     *
     * @param {Object} fromUser - the user that is going to be the follower
     * @param {Object} toUser - the user that is going to be followed
     * @return {Promise<HydratedDocument<Follow>> | Promise<null>} - The bond
     */
     static async findOne(fromUser: Types.ObjectId | string, toUser: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
        return FollowModel.findOne({
            fromUser: fromUser,
            toUser: toUser
        })
    }

    /**
     * Find Follow Object
     *
     * @param {Object} fromUser - the user that is going to be the follower
     * @param {Object} toUser - the user that is going to be followed
     * @return {Promise<HydratedDocument<Follow>[]> | Promise<null>} - The bond
     */
    static async findAll(fromUser: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
        return FollowModel.find({
            fromUser: fromUser
        })
    }
}
export default FollowCollection;