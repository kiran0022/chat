import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json("asda")
}
export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json()
    console.log(data)
    return NextResponse.json(data)
}
