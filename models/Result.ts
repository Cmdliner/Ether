import { Schema, model } from "mongoose";

const ResultSchema = new Schema({
    appointment: {
        type: String,
        required: true
    },
    // A test to result map


}, { timestamps: true });

export const Result = model("Result", ResultSchema);