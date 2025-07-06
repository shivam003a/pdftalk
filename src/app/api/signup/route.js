import { NextResponse } from "next/server";

export function POST() {
    return NextResponse.json({
        hi: 'hello'
    }, { status: 200 })
}