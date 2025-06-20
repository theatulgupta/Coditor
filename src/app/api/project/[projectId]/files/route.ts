import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import File from "@/models/File.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;

    const files = await File.find({ projectId, userId }).lean();

    return NextResponse.json({ files }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
