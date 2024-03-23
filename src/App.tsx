import { FormEvent } from "react";
import { AppHeader } from "./components/AppHeader";
import { useForm } from "./hooks/useForm";
import { useNavigate } from "react-router-dom";

import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentsMutation,
} from "./api/service";
import { CommentCard } from "./components/CommentCard";

export interface FormData {
  name: string;
  message: string;
  touched: {
    name: boolean;
    message: boolean;
  };
}

export type CommentObj = {
  id: number;
  name: string;
  message: string;
  created: string;
};

export const initialState = {
  name: "",
  message: "",
  touched: {
    name: false,
    message: false,
  },
};

export default function App() {
  const { formData, handleInputChange, reset } = useForm(initialState);

  const { data: comments, isLoading } = useGetCommentsQuery();

  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();

  const [deleteComments, { isLoading: isDeleting }] =
    useDeleteCommentsMutation();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, message } = formData;
    if (name?.length && message?.length) {
      addComment({ name, message });
      reset();
      navigate("/Page2");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div></div>
      <div className="text-center lg:px-5 px-20">
        <AppHeader appName="Comments Feed" />
        <form onSubmit={handleSubmit} className="px-20">
          <div className="mt-6">Name</div>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            className="border-2 border-[#000] w-full"
          />
          {formData.touched.name && !formData.name && (
            <div className=" text-[#FF0000]">Please fill in your name</div>
          )}
          <br />

          <textarea
            name="message"
            rows={10}
            onChange={handleInputChange}
            className="mt-10 border-2 border-[#000] w-full"
            value={formData.message}
          />
          {formData.touched.message && !formData.message && (
            <div className="text-[#FF0000]">Please fill in a message</div>
          )}
          <div>Message</div>
          <button
            className="border-2 border-[#000] enabled:bg-[#ffe01b] disabled:bg-[#A1AEB1] rounded-3xl text-[#241c15] font-medium enabled:hover:-translate-y-1 mt-10"
            type="submit"
            disabled={!formData.name || !formData.message}
          >
            Comment
          </button>
        </form>
        <button
          onClick={() => deleteComments()}
          className="mt-28 border-2 border-[#000]"
        >
          Delete Comments
        </button>
        {isLoading || isAdding || isDeleting ? (
          <>isLoading...</>
        ) : (
          <div>
            {comments?.map((com) => (
              <div key={com.id}>
                <CommentCard comment={com} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}
