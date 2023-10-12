import { Note as NoteModel } from "../models/note";

interface NoteProps {
  note: NoteModel;
}
const Note = ({ note }: NoteProps) => {
  return (
    <article className="card">
      <h3>{note.title}</h3>
      <p>{note.text}</p>
    </article>
  );
};
export default Note;
