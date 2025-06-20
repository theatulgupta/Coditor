import mongoose, { Schema } from "mongoose";

export interface FileType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  extension: string;
  content: string;
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const FileSchema = new Schema<FileType>(
  {
    name: { type: String, required: true },
    extension: { type: String, required: true, lowercase: true, index: true },
    content: { type: String, required: true, default: "" },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

FileSchema.pre("save", function (this: FileType & mongoose.Document, next) {
  if (this.isModified("name")) {
    this.name = this.name.trim();
    const idx = this.name.lastIndexOf(".");
    const ext = idx !== -1 ? this.name.substring(idx + 1).toLowerCase() : "";
    if (ext && ext !== this.extension) {
      this.extension = ext;
    }
  }

  if (this.isModified("content")) {
    this.content = this.content.trim();
  }

  next();
});

const File =
  mongoose.models.File || mongoose.model<FileType>("File", FileSchema);

export default File;
