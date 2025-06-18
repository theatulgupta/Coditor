import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/config/resendEmail";
import { connectDB } from "@/config/connectDB";

export async function POST(request: NextRequest) {
  const host = request.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const DOMAIN = `${protocol}://${host}`;

  try {
    const body = await request.json();
    let { email } = body;

    // Validate provided email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }

    email = email.toLowerCase();

    // Connect to database
    await connectDB();

    const user = await User.findOne({ email });

    if (user) {
      const secret = process.env.FORGOT_PASSWORD_SECRET;
      if (!secret) {
        console.error("FORGOT_PASSWORD_SECRET is not configured.");
        return NextResponse.json(
          { error: "Internal server error." },
          { status: 500 }
        );
      }

      const payload = { id: user._id.toString() };
      const token = jwt.sign(payload, secret, {
        expiresIn: 10 * 60, // 10 minutes
      });

      const resetURL = `${DOMAIN}/reset-password?token=${token}`;

      try {
        await sendEmail(user.email, "Reset Your Password", {
          name: user.name || "User",
          url: resetURL,
        });
      } catch (emailError) {
        console.error("Failed to send reset password email:", emailError);
      }
    }

    return NextResponse.json(
      { message: "If the email exists, a reset link will be sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
