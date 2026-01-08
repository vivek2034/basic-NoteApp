"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await fetch(`/api/notes/${editingId}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
      setEditingId(null);
    } else {
      await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
    }
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div style={{ width: 500, margin: "auto" }}>
      <h1>Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br />

      <button onClick={handleSubmit}>
        {editingId ? "Update Note" : "Add Note"}
      </button>

      <hr />

      {notes.map((n) => (
        <div key={n._id} style={{ border: "1px solid #555", margin: 5, padding: 10 }}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small><br />
          <button onClick={() => handleEdit(n)}>Edit</button>
          <button onClick={() => handleDelete(n._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
