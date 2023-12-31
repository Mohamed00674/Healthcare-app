import mongoose, {Schema} from "mongoose"
import {IUser} from 'interface/user.interface'

const UserSchema:Schema = new Schema({
    username : {
        type: 'string',
        required : true
    },
    
    password: {
        type:String,
        required:true
    },
    email:  {
        type:String,
        required:true
    },
});

export default mongoose.model<IUser>('User', UserSchema);