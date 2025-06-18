import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log("Login request received for:", email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    console.log("User found:", user ? user.email : null);

    if (!user) {
      console.log("No user found with this email");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("Comparing passwords");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      {
        message: "User logged in successfully",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
