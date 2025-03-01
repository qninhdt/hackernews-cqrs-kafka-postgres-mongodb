"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/app/lib/currentUserContext";
import { createPost } from "@/app/lib/action";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
function TextArea() {
  const user = useUser().user;
  if (!user) {
    toast.warning("You have to login first!");
    redirect("/login");
  }
  const createPostWithUser = createPost.bind(null, user.username);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleInput = document.querySelector<HTMLInputElement>("#title");
    if (!titleInput || !titleInput.value.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }
    const formData = new FormData(event.currentTarget);
    try {
      await createPost(user.username, formData);
      toast.success("Post created successfully!");

    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <form action={createPostWithUser}>
        <div className="flex flex-col border border-zinc-200 h-fit p-2 rounded-lg focus:border-zinc-300">
          <label htmlFor="title">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            className="h-10 focus:outline-none"
            placeholder="Title..."
            id="title"
            name="title"
          />
        </div>
        <textarea
          name="content"
          id="content"
          className="resize-none focus:outline-none h-32 w-full border border-zinc-200 p-2 rounded-lg"
          placeholder="Body"
        ></textarea>
        <div className="flex flex-row justify-end">
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 w-fit h-10 flex flex-row items-center gap-2 rounded"
          >
            Send
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewPostBig() {
  return (
    <div className="absolute bg-white w-1/2 top-0 left-0 right-0 bottom-0 m-auto h-1/2 rounded-lg shadow-lg flex flex-col z-20">
      <div className="w-full h-16 flex flex-row items-center p-4 border-b border-zinc-200">
        <h1 className="font-bold grow text-center">Create new post</h1>
        <Link href={'/home'}>
        <button
          
          className="text-black rounded-full hover:bg-zinc-300 transition-colors duration-150 ease-in h-8 w-8 flex items-center justify-center"
        >
          <XMarkIcon className="h-4 w-4" />
        </button></Link>
      </div>
      <div>
        <TextArea />
      </div>
    </div>
  );
}
