import { DB } from "@/lib/config/db.config";
import { IUser } from "@/lib/formValidation";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


const validateOTP = (user: IUser, otp: string) : boolean => {
    let isValidOtp = true;

    if (user.otp?.expires_at?.valueOf() || 1 < Date.now()) isValidOtp = false;

    if (user.otp?.value !== otp) isValidOtp = false;
    return isValidOtp;
}


export default async function POST(req: NextRequest) {
    try {

        await DB.connect();

        const { email, otp } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: true, message: "User not found" }, { status: 404 });
        }

        const isOtpValid = validateOTP(user, otp);

        if (!isOtpValid) {
            return NextResponse.json({ error: true, message: "Invalid OTP" }, { status: 400 });
        }

        // Delete otp from the db
        user.otp = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "OTP confirmed" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "Internal server error" }, { status: 500 });
    }
}

