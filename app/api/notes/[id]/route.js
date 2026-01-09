import { connectDB } from "@/lib/mongo";
import Note from "@/models/Note";

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const note = await Note.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(note);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Note.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" }, { status: 200 });
}
