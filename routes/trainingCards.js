import express from "express"
import TrainingCard from "../models/TrainingCard.js"
import { requireAuth } from "../library/cryptingPass.js"

const router = express.Router()

router.use(express.json())


//La mia CRUD

router.get("/mygymcards", requireAuth, async (req,res)=> {

    try {  
/*         const trainingCards = await TrainingCard.find({owner: req.user._id}) */
        const trainingCards = await TrainingCard.find()
        res.send(trainingCards)

    }catch(error){

        res.status(500).send(error.message)
    }
})


router.get("/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
/*         const trainingCard = await TrainingCard.findOne({ _id: id, owner: req.user._id }); */
const trainingCard = await TrainingCard.findById(req.params.id);    
    if (!trainingCard) {
            return res.status(404).send("TrainingCard not found or you're not authorized to view this card.");
        }
        res.send(trainingCard);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


/* router.post("/mygymcards", async (req,res)=> { 
        try {
            const newTrainingCard = new TrainingCard({
                ...req.body,
                owner: req.user._id,
            });
    
            const trainingCard = await newTrainingCard.save();

        res.send(trainingCard)

    }catch(error){

        res.status(404).send(error.message)
    }
}) */

router.post("/mygymcards", async (req,res)=> {
    try {  
        const newTrainingCard = req.body;

        const trainingCards = await TrainingCard.create(newTrainingCard);

        res.send(trainingCards)

    }catch(error){

        res.status(404).send(error.message)
    }
})

/* router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const card = await TrainingCard.findOneAndDelete({ _id: id, owner: req.user._id });
        if (!card) {
            return res.status(404).send("No card found or you're not authorized to delete this card.");
        }
        res.send(`Card with id ${id} deleted successfully.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.patch("/:id", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const card = await TrainingCard.findOne({ _id: id, owner: req.user._id });

        if (!card) {
            return res.status(404).send("No card found or you're not authorized to update this card.");
        }

        Object.keys(req.body).forEach((update) => {
            card[update] = req.body[update];
        });
        await card.save();

        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
}); */
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

        await TrainingCard.findByIdAndUpdate(id, req.body,  { new: true, runValidators: true });

        const updatedTrainingCard = await TrainingCard.findById(id);  

        res.send(updatedTrainingCard);

    } catch (error) {

        res.status(404).send(error.message);
    }
});



export default router;