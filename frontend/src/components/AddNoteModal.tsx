import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput, createNote } from "../network/notes_api";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface AddNoteModalProps {
  dismissModal: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddNoteModal = ({ dismissModal, onNoteSaved }: AddNoteModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponse = await createNote(input);
      onNoteSaved(noteResponse);
      dismissModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 flex flex-col p-4 text-white">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">Add a new note</h2>
        <button onClick={dismissModal}>
          <IoIosCloseCircleOutline className="text-3xl" />
        </button>
      </div>
      <label className="mt-3 font-semibold text-lg" htmlFor="title">
        Title
      </label>
      <input
        className="bg-gray-600 rounded-md p-2 text-white mb-2"
        {...register("title", { required: "The title is required" })}
        type="text"
      />
      {errors.title && (
        <p className="font-bold text-sm text-red-500">{errors.title.message}</p>
      )}

      <label className="mt-3 font-semibold text-lg" htmlFor="textArea">
        Text
      </label>
      <textarea
        className="bg-gray-600 rounded-md p-2 text-white mb-4"
        {...register("text")}
        cols={5}
        rows={5}></textarea>

      <button
        disabled={isSubmitting}
        className="self-center rounded-lg bg-gradient-to-tr from-red-600 to-red-500 py-2 px-3 hover:scale-105 transition-transform font-semibold text-white">
        Create note
      </button>
    </form>
  );
};
export default AddNoteModal;
