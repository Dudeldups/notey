import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    }
    loadNotes();
  }, []);

  return (
    <>
      <h1>Notey</h1>
      {notes.map(note => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
}

export default App;
