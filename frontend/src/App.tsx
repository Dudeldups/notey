import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FormModal from "./components/FormModal";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showFormModal, setShowFormModal] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    }
    loadNotes();
  }, []);

  async function deleteHandler(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(n => n._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-gray-800 via-gray-800 to-gray-700 font-['Poppins']">
      <Navbar />

      <main className="flex-auto pt-4 pb-8 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mt-4 mb-6 text-center text-white">
          <h1 className="font-semibold text-md">
            Keep track of your notes and never forget anything!
          </h1>
          <p className="mb-6 text-sm">
            Except if you forget about this website
          </p>
          <button
            className="grid grid-flow-col gap-2 place-items-center mx-auto rounded-lg bg-gradient-to-tr from-red-600 to-red-500 py-2 px-3 hover:scale-105 transition-transform font-semibold"
            onClick={() => setShowFormModal(true)}>
            <FaPlus />
            Add new note
          </button>
        </div>

        <div className="grid gap-y-6 gap-x-4 sm:grid-cols-[repeat(auto-fit,minmax(19rem,1fr))]">
          {notes.map(note => (
            <Note
              key={note._id}
              note={note}
              deleteHandler={deleteHandler}
              onNoteClicked={setNoteToEdit}
            />
          ))}
        </div>

        {showFormModal && (
          <FormModal
            dismissModal={() => setShowFormModal(false)}
            onNoteSaved={newNote => {
              setNotes([...notes, newNote]);
              setShowFormModal(false);
            }}
          />
        )}
        {noteToEdit && (
          <FormModal
            noteToEdit={noteToEdit}
            dismissModal={() => {
              setNoteToEdit(null);
              setShowFormModal(false);
            }}
            onNoteSaved={updatedNote => {
              setNotes(
                notes.map(n => (n._id === updatedNote._id ? updatedNote : n))
              );
              setNoteToEdit(null);
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
