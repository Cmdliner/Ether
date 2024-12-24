import { countries } from "@/lib/countries";
import { IUser } from "@/lib/formValidation";
import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        enum: [...countries],
        required: true
    },
    age: {
        type: Number,
        min: 0,
        required: true
    },
    gender: {
        type: String,
        enum: ["F", "M"],
        required: true
    },
    allergies: {
        type: String
    },
    medications: {
        type: String
    },
    genotype: {
        type: String,
        enum: ["AS", "AA", "AC", "SS", "SC", "CC"],
        required: true
    }
});

export const User = model<IUser>("user", UserSchema);