import express from "express"
import TrainingCard from "../models/TrainingCard.js"

const router = express.Router()

router.use(express.json())

router.post("/", async (req,res)=> {
    try {  
        const newTrainingCard = req.body;
        const trainingCards = await TrainingCard.create(newTrainingCard);
        res.send(trainingCards)
    }catch(error){
        res.status(404).send(error.message)
    }
})

export default router