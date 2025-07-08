import { NextResponse } from "next/server";

export function POST() {
    return NextResponse.json({
        logout: 'done'
    }, { status: 200 })
}