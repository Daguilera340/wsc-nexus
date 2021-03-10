import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document{
    email: string;
    password: string;
}

const User: Schema = new Schema({
    email: {type:String, default:''},
    password: {type:String, default: ''},
});

export default mongoose.model<IUser>('User', User);
