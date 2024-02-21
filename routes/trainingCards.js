import express from "express"
import TrainingCard from "../models/TrainingCard.js"

const router = express.Router()

router.use(express.json())


//La mia CRUD

router.get("/mygymcards", async (req,res)=> {

    try {  
        const trainingCards = await TrainingCard.find()

        res.send(trainingCards)

    }catch(error){

        res.status(500).send(error.message)
    }
})


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const trainingCard = await TrainingCard.findById(req.params.id);
        if (!trainingCard) {
            return res.status(404).send("TrainingCard not found");
        }
        res.send(trainingCard);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post("/mygymcards", async (req,res)=> {
    try {  
        const newTrainingCard = req.body;

        const trainingCards = await TrainingCard.create(newTrainingCard);

        res.send(trainingCards)

    }catch(error){

        res.status(404).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        await TrainingCard.deleteOne({_id: id});

        return res.send(`Card with id ${id} deleted with success.`);

    }catch(error){

        res.status(404).send(error.message)
    }
});


router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await TrainingCard.findByIdAndUpdate(id, req.body);

        const updatedTrainingCard = await TrainingCard.findById(id);  

        res.send(updatedTrainingCard);

    } catch (error) {

        res.status(404).send(error.message);
    }
});

export default router