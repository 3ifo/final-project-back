import mongoose from "mongoose";
const {Schema, model} = mongoose;
import validator from "validator"
import { comparePassword, hiddenPassword } from "../library/cryptingPass.js";
const { isStrongPassword, isEmail } = validator;


const strongPasswordOptions = {
    minLength: 8,
    minLowerCase: 1,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 2

}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,      
    },
    created: {
        type: Date,
        default: ()=> Date.now(),
        immutable: true
    },
})

userSchema.statics.findByEmail = function (email) {
    return this.findOne({email});
}

userSchema.statics.signUp = async function (email,password){

    
    if(!isEmail(email)){
        const error = new Error ("You not send a real email.");
        error.statusCode = 400;
        throw error;
    }
    if(!isStrongPassword(password, strongPasswordOptions)){
        const error = new Error ("Password not strong.");
        error.statusCode = 400;
        throw error;
    }
     
    const emailEx = await this.exists({email});
    if(emailEx){
        const error= new Error ("Account already exists.");
        error.statusCode= 400;
        throw error;
    }
    const hashedPassword= await hiddenPassword(password);

    const user = await this.create({email,password: hashedPassword});
    return user; 
}

userSchema.statics.logIn = async function (email,password){
    const user = await this.findByEmail(email);
    const failError = () => {
        const error = new Error ("Email or Password not valid.");
        error.statusCode= 401;
        throw error;
    }
    
    if(!user){
        failError()
    }

    const passwordMatch = await comparePassword(password, user.password);
    if(!passwordMatch){
        failError()
    }

    return user;

  
}

userSchema.methods.clean = async function() {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user._id;
    return user;
}


const User = model("User", userSchema);

export default User;