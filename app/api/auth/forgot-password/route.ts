import { DB } from "@/lib/config/db.config";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
    try {
        await DB.connect();

        const { email }: { email: string } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: true, message: "User not found" }, { status: 404 });
        }

        user.otp = {
            value: "21456", // !todo => Use crypto to generate
            kind: "password_reset",
            expires_at: new Date(Date.now() + 5 * 60 * 1000)
        }

        await user.save();
        // !todo => Send email in OTP

        return NextResponse.json({ success: true, message: "An OTP has been sent to your email" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "An error occured" }, { status: 500 });
    }
}