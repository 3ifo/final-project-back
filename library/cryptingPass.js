import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
const {PEPPER_KEY, SECRET_KEY} = process.env

/* //In questo modo aggiungo sale e pepe per le mie password, ho scelto 15 caratteri per aumentare la sicurezza

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

// Qui genero ed in seguito verifico il token

export const generateToken = (_id) => {
    const token = jwt.sign({_id}, SECRET_KEY, {expiresIn: "30d"})
    return token
}

export const verifyToken = (token) => {
    const { _id } = jwt.verify (token, SECRET_KEY)
    return _id;
}

// Questo è il mio auth middleware

export const requireAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new Error("Token required");
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            throw new Error("Token required");
        }

        const decoded = verifyToken(token);
        req.user = { _id: decoded }; 
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).send(`Request is not authorized: ${error.message}`);
    }
}; */
//In questo modo aggiungo sale e pepe per le mie password, ho scelto 15 caratteri per aumentare la sicurezza

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

// Qui genero ed in seguito verifico il token

export const generateToken = (_id) => {
    const token = jwt.sign({_id}, SECRET_KEY, {expiresIn: "30d"})
    return token
}

export const verifyToken = (token) => {
    const { _id } = jwt.verify (token, SECRET_KEY)
    return _id;
}

// Questo è il mio auth middleware

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