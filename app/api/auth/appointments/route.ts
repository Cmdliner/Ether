import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userHeader = req.headers.get('x-user');

    } catch (error) {
        
    }
}

export async function GET() {}

// export async function 