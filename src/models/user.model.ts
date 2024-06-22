import { Model, Schema, model } from "mongoose";

export const UserSchema = new Schema ({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    documentType:{
        type: String,
        required:true,
    },
    documentNumber:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
    },
    rol:{
        type: String,
        default: "User"
    },
    token:{
        type:String,
        require:false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
});

const UserModel: Model<any> = model("user", UserSchema);
export default UserModel;