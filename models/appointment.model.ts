import { model, Schema } from "mongoose";

const AppointmentSchema = new Schema({
    user: {
        type: String,
        ref: "User",
        required: true
    },
    complaints: {
        type: String,
        required: true,
    },
    recommended_tests: {
        type: String,
        enum: [],
    }
}, { timestamps: true });

export const Appointment = model("Appointment", AppointmentSchema);
