import { DB } from "@/lib/config/db.config";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DB.connect();
        const body = await req.json();
        // !todo => Sanitize data
        const hashedPassword = await hash(body.password, 10);
        const user = new User({ ...body, email: body.email.toLowerCase(), password: hashedPassword });
        await user.save();

        return NextResponse.json({ success: true, id: user.id, full_name: user.full_name }, { status: 201 });
    } catch (error) {
        console.error(error);
        // !todo => Check for mongoose unique error code and throw validation error
        return NextResponse.json({ error: true, message: "An error occured!" }, { status: 500 });
    }
}