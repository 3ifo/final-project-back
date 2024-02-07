import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
import authenticationRouter from "./routes/authentication.js"
import trainingCardsRouter from "./routes/trainingCards.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { requireAuth } from "./library/cryptingPass.js"

const{MONGO_URI} = process.env;

// My server

const app = express()

//Middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: "*"}))

 //routes 
app.use('/authentication', authenticationRouter);

 //Authentication middleware
 app.use(requireAuth); 
 
//User routes
app.use("/trainingcards", trainingCardsRouter) 

//Mongoose connect

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log("Successfully connected to MongoDB")
    app.listen(3000,()=> {
        console.log("Server listen on the port")
    })
})
.catch(err => console.error(err));


export default app;