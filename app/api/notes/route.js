import { connectDB } from "@/lib/mongo";
import Note from "@/models/Note";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return Response.json(notes);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const note = await Note.create(data);
  return Response.json(note);
}
export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const note = await Note.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(note);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Note.findByIdAndDelete(params.id);
  return Response.json({ message: "Note Deleted" });
}
