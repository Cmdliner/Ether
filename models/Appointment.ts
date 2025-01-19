import { model, Schema } from "mongoose";

const AppointmentSchema = new Schema({
    user: {
        type: String,
        ref: "User",
        required: true
    },
    scheduled_for: {
        type: Date,
        required: true
    },
    complaints: {
        type: String,
        required: true,
        // Select a min
    },
    recommended_tests: [{
        type: String
    }]
}, { timestamps: true });

export const Appointment = model("Appointment", AppointmentSchema);
