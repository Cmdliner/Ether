import { DB } from "@/lib/config/db.config";
import { User } from "@/models/user.model";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { cfg } from "@/lib/init";

export async function POST(req: NextRequest) {
    try {
        await DB.connect();
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });
        const passwordsMatch = await compare(password, user?.password!);
        if (!passwordsMatch) {
            return NextResponse.json({ status: 400, error: true, message: "Invalid email or password!" });
        }
        const accessToken = jwt.sign({ id: user?._id }, cfg.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
        return NextResponse.json({ status: 200, access_token: accessToken});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: "A fatal error occured!" });
    }
}