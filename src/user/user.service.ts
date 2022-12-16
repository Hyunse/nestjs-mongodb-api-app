import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserType } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserType>) {}
  
  findById(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) return null;
    return this.userModel.findOne({ _id: id }).select('-password');
  }
}