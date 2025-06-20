import mongoose, { Schema } from "mongoose";

export interface ProjectType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<ProjectType>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project ||
  mongoose.model<ProjectType>("Project", ProjectSchema);

export default Project;
