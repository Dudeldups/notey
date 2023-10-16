import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput, createNote, updateNote } from "../network/notes_api";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface FormModalProps {
  noteToEdit?: Note;
  dismissModal: () => void;
  onNoteSaved: (note: Note) => void;
}

const FormModal = ({
  noteToEdit,
  dismissModal,
  onNoteSaved,
}: FormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await createNote(input);
      }

      onNoteSaved(noteResponse);
      dismissModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-30 backdrop-blur-sm"
      onClick={dismissModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={e => e.stopPropagation()}
        className="bg-gray-900 flex flex-col p-4 text-white w-4/5 max-w-xl shadow-2xl ring-4 ring-neutral-100 ring-offset-1 rounded-md">
        <div className="flex gap-3 justify-between">
          <h2 className="font-bold text-xl">
            {noteToEdit ? "Edit note" : "Add a new note"}
          </h2>
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
          <p className="font-bold text-sm text-red-500">
            {errors.title.message}
          </p>
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
          {noteToEdit ? "Save" : "Create note"}
        </button>
      </form>
    </div>
  );
};
export default FormModal;
