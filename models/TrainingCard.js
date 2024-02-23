import mongoose from "mongoose"
const {model, Schema} = mongoose;

const cardSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 15,
        required: true,
        trim: true
    },
    exercises: {
        type: String,
        minLength: 10,
        maxLength: 250,
        required: true
    },
    series: {
        type: Number,
        min: 1,
        max: 7,
    },
    
    type: {
        type: String,
        required:true
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
        maxLength: 75
    }
})

const TrainingCard = model("TrainingCard", cardSchema);

export default TrainingCard;