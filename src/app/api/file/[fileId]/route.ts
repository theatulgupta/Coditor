import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import File from "@/models/File.model";

export async function PUT(
  req: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = params;
    const { content } = await req.json();

    if (!fileId || typeof content !== "string") {
      return NextResponse.json(
        { message: "fileId and content are required" },
        { status: 400 }
      );
    }

    const file = await File.findOne({ _id: fileId, userId });
    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    file.content = content;
    await file.save();

    return NextResponse.json(
      { message: "File updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
