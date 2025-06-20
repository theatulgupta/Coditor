import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Project from "@/models/Project.model";
import File from "@/models/File.model";
import {
  htmlBoilerplate,
  cssBoilerplate,
  jsBoilerplate,
} from "@/lib/boilerplate";

export async function GET(
  req: NextRequest,
  { params }: { params?: { projectId?: string } } = {}
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (params?.projectId) {
      const project = await Project.findOne({
        _id: params.projectId,
        userId,
      }).lean();

      if (!project) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ project }, { status: 200 });
    } else {
      const projects = await Project.find({ userId }).lean();
      return NextResponse.json({ projects }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    const trimmedName = name?.trim();

    if (!trimmedName) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    const project = await Project.create({ name: trimmedName, userId });

    const baseProps = { projectId: project._id, userId };

    const files = [
      {
        name: "index.html",
        extension: "html",
        content: htmlBoilerplate,
        ...baseProps,
      },
      {
        name: "styles.css",
        extension: "css",
        content: cssBoilerplate,
        ...baseProps,
      },
      {
        name: "script.js",
        extension: "js",
        content: jsBoilerplate,
        ...baseProps,
      },
    ];

    const createdFiles = await File.create(files);

    if (!createdFiles || createdFiles.length !== files.length) {
      return NextResponse.json(
        { message: "Failed to create default files" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Project created successfully!",
        data: {
          project,
          files: createdFiles,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
