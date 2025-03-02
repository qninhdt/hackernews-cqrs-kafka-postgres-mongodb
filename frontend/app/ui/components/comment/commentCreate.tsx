'use client';

import { createComment } from "@/app/lib/action";
import { useUser } from "@/app/lib/currentUserContext"
export default function CreateComment({id} : {id: string}) {
    const token = localStorage.getItem("token") || ""
    const createCommentWithParams = createComment.bind(null, {id:id, token:token});
    const { user } = useUser();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!user) {
            alert("You must be logged in to post a comment.");
            return;
        }
        const formData = new FormData(event.currentTarget);
        createCommentWithParams(formData);
    }
    return (
        <div>
        <form action={createCommentWithParams} onSubmit={(e) => handleSubmit(e)} className="flex flex-row justify-center px-4 py-2">
          <input
            type="text"
            className="w-full grow focus:outline-none"
            required
            placeholder="Leave a comment"
            id="comment"
            name="comment"
          />
          <button
            type="submit"
            className="w-fit h-full px-4 py-2 hover:bg-zinc-200 transition-colors duration-150 ease-in-out rounded-md"
          >
            Post
          </button>
        </form>
      </div>
    )
}