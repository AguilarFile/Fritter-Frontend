import type {HydratedDocument, Types} from 'mongoose';
import type {Group} from './model';
import GroupModel from './model';


class GroupCollection {
  static async addOne(user: Types.ObjectId | string, name: string): Promise<HydratedDocument<Group>> {
    const date = new Date();
    const group = new GroupModel({
        user: user,
        name: name,
        dateCreated: date,
        dateModified: date
    })
    await group.save(); // Saves user to MongoDB
    return group;
  }

  static async findOneById(groupId: Types.ObjectId | String): Promise<HydratedDocument<Group>> {
    return GroupModel.findOne({_id: groupId});
  }

  static async findOneByName(user: Types.ObjectId | string, name: string): Promise<HydratedDocument<Group>> {
    return GroupModel.findOne({
      user: user,
      name: name
    });
  }

  static async findAllByUser(user: Types.ObjectId | string): Promise<Array<HydratedDocument<Group>>> {
    return await GroupModel.find({user: user});
  }

  static async updateOne(userId: Types.ObjectId | string, name: string, newName: string): Promise<HydratedDocument<Group>> {
    const group = await GroupModel.findOne({user: userId, name: name});
    group.name = newName;
    await group.save();
    return group;
  }

  static async deleteOne(userId: Types.ObjectId | String, name: string): Promise<boolean> {
    const group = await GroupModel.deleteOne({user: userId, name: name});
    return group !== null;
  }
}

export default GroupCollection;
