import { DB } from "@/lib/config/db.config";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DB.connect();
        const body = await req.json();
        // !todo => Sanitize data
        // !todo => hash user's password with bcrypt
        const hashedPassword = await (body.password);
        const user = new User({ ...body, email: body.email.toLowerCase(), password: hashedPassword });
        await user.save();

        return NextResponse.json({ status: 201, success: true, id: user.id, full_name: user.full_name });
    } catch (error) {
        console.error(error);
        // !todo => Check for mongoose unique error code and throw validation error
        return NextResponse.json({ status: 500, error: true, message: "An error occured!" });
    }
}