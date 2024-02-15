import mongoose from "mongoose"
const {model, Schema} = mongoose;

const cardSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true,
        trim: true
    },
    exercises: {
        type: String,
        minLength: 20,
        maxLength: 400,
        required: true
    },
    series: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },    
    duration: {
        type: Number,
        min: 20,
        max: 120,
        required: true
    },
    difficult: String,
    image: String,
    created: {
        type: Date,
        default: ()=> Date.now(),
        immutable: true
    },
    notes: {
        type: String,
        maxLength: 400
    }
})

const TrainingCard = model("TrainingCard", cardSchema);

export default TrainingCard;