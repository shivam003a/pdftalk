import { NextResponse } from "next/server";

export function POST() {
    return NextResponse.json({
        login: 'done'
    }, { status: 200 })
}