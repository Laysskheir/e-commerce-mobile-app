import mongoose, { Schema, Document } from "mongoose";

interface categoryType extends Document {
  title: string;
  description: string;
  createdAt: string;
}

const categorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, required: true, default: new Date() },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<categoryType>("CategorySchema", categorySchema);
