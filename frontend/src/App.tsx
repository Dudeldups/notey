import { useEffect, useState } from "react";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "GET",
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const notes = await response.json();
      setNotes(notes);
    }
    loadNotes();
  }, []);

  return (
    <>
      <h1>Hello :)</h1>
      {JSON.stringify(notes)}
    </>
  );
}

export default App;
