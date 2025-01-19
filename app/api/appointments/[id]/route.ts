import { DB } from "@/lib/config/db.config";
import { Appointment } from "@/models/Appointment";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await DB.connect();

        const { id } = await params;
        const { recommended_tests }: { recommended_tests: string[] } = await req.json();

        const userId = req.headers.get('x-user');
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: true, message: "" }, { status: 404 });
        }

        if (!recommended_tests) {
            return NextResponse.json({ error: true, message: "Reccomended tests required!" }, { status: 422 });
        }

        const appointment = await Appointment.findOneAndUpdate({
            user: user._id,
            id
        }, { recommended_tests }, { new: true });
        if (!appointment) {
            return NextResponse.json({ error: true, message: "Error updating appointment" }, { status: 400 });
        }
        return NextResponse.json({ success: true, message: "Appointment updated", appointment }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "Error updating appointment" }, { status: 500 });
    }
}