import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
}
const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  const displayDate =
    updatedAt > createdAt
      ? "Updated: " + formatDate(updatedAt)
      : "Created: " + formatDate(createdAt);

  return (
    <article className="flex flex-col bg-yellow-100 hover:shadow-xl transition-shadow">
      <div className="flex-grow py-2 px-4 h-40">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="mt-2 text-lg whitespace-pre-line line-clamp-4">{text}</p>
      </div>

      <div className="bg-yellow-200 py-2 px-4">
        <p className="text-sm">{displayDate}</p>
      </div>
    </article>
  );
};
export default Note;
