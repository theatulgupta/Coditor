import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Project from "@/models/Project.model";

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

    const project = await Project.findOne({ _id: projectId, userId }).lean();

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
