import mongoose , {Schema , Document , Types} from "mongoose";


export  interface ICommunity extends Document {
    name : string ;
    CreatorId : Types.ObjectId;
    admins : Types.ObjectId[];
    members : Types.ObjectId[];
    bio : string;
    posts : Types.ObjectId[];
}