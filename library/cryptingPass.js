import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
const {PEPPER_KEY, SECRET_KEY} = process.env

//Adding salt and pepper for my passwords

export const hiddenPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);

    const combined = password + PEPPER_KEY;

    const hashedPassword = await bcrypt.hash(combined,salt)
    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
    const combined = password + PEPPER_KEY;
    const match= await bcrypt.compare(combined, hashedPassword);
    return match;
}

// Generate Token 

export const generateToken = (_id) => {
    const token = jwt.sign({_id}, SECRET_KEY, {expiresIn: "30d"})
    return token
}

export const verifyToken = (token) => {
    const verified = jwt.verify (token, SECRET_KEY)
    return verified
}

// auth middleware

export const requireAuth = (req,res,next)=> {

    try {
        const {authorization}= req.headers;

        if(!authorization){
            throw new Error ("token required")
        }
        const token = authorization.split(" ")[1];
        if(!token){
            throw new Error ("token required");
        }

        verifyToken(token)
        next();
    }catch(error) {
        console.error(error.message);
        return res.status(401).send(`Request is not authorized: ${error.message} `)
    }
    
}