import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  deleteHandler: (note: NoteModel) => void;
}
const Note = ({ note, onNoteClicked, deleteHandler }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  const displayDate =
    updatedAt > createdAt
      ? "Updated: " + formatDate(updatedAt)
      : "Created: " + formatDate(createdAt);

  return (
    <article
      onClick={() => onNoteClicked(note)}
      className="flex flex-col bg-yellow-100 hover:shadow-xl transition-shadow text-left">
      <div className="flex-grow py-2 px-4 h-40">
        <div className="flex gap-4 justify-between">
          <h3 className="font-semibold text-xl">{title}</h3>
          <button
            onClick={e => {
              deleteHandler(note);
              e.stopPropagation();
            }}>
            <MdDelete className="text-2xl" />
          </button>
        </div>
        <p className="mt-2 text-lg whitespace-pre-line line-clamp-4">{text}</p>
      </div>

      <div className="bg-yellow-200 py-2 px-4">
        <p className="text-sm">{displayDate}</p>
      </div>
    </article>
  );
};
export default Note;
