import { DB } from "@/lib/config/db.config";
import { Appointment } from "@/models/Appointment";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await DB.connect();

        const userId = req.headers.get('x-user');

        const appointments = await Appointment.find({ user: userId });
        if (!appointments) {
            return NextResponse.json({ error: true, message: "Appointments not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, appointments }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await DB.connect();

        const userId = req.headers.get('x-user');
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: true, message: "User not found!" }, { status: 404 });
        }

        const { complaints, scheduled_for } = await req.json();

        const appointment = new Appointment({
            user: user._id,
            complaints
        });
        if (scheduled_for) appointment.scheduled_for = scheduled_for;
        await appointment.save();

        return NextResponse.json({ success: true, message: "Appointment schedule successful" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "Error creating appointment" }, { status: 500 })
    }
}