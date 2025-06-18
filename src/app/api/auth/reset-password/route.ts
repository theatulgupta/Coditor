import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connectDB } from "@/config/connectDB";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    const { password } = await req.json();

    if (!password || typeof password !== "string" || password.trim() === "") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    user.password = password;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
