import { DB } from "@/lib/config/db.config";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DB.connect();

        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: true, message: "User not found" }, { status: 404 });
        }
        user.password = await hash(password, 10);
        await user.save();

        return NextResponse.json({ success: true, message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "Internal server error" }, { status: 500 })
    }
}