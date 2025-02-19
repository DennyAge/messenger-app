import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
  } catch (error) {
    console.log(error, "SETTINGS_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
