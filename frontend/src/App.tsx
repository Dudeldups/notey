import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 via-gray-800 to-gray-700 font-['Poppins']">
      <Navbar />

      <main className="flex-auto pt-4 pb-8 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mt-4 mb-6 text-center text-white">
          <h1 className="font-semibold text-md">
            Keep track of your notes and never forget anything!
          </h1>
          <p className="text-sm">Except if you forget about this website</p>
        </div>

        <div className="grid gap-y-6 gap-x-4 grid-cols-[repeat(auto-fit,minmax(19rem,1fr))]">
          {notes.map(note => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
