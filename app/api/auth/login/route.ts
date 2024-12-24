import { DB } from "@/lib/config/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await DB.connect();
        const body = await req.json();
        const { email, password } = body;
        return NextResponse.json("In Development :)");
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: "A fatal error occured!"});
    }
}