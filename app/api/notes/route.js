import { connectDB } from "@/lib/mongo";
import Note from "@/models/Note";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return Response.json(notes, { status: 200 });
}

export const dynamic = "force-dynamic";


export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const note = await Note.create(data);
  return Response.json(note);
}
