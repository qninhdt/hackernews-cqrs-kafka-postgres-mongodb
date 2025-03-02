import { getPostById } from "@/app/lib/data";
import { CommentsList } from "@/app/ui/components/comment/commentsList";
import PostBackBtn from "@/app/ui/components/post/backBtn";
import PostContent from "@/app/ui/components/post/postContent";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostById({ id: params.id });
  return {
    title: post.title,
  };
}

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const post = getPostById({ id });

  return (
    <div className="min-h-fit max-h-svh w-full flex flex-col gap-4 justify-start bg-white text-black rounded-lg">
      <PostContent post={post} />
      <div>
        <form action="" className="flex flex-row justify-center px-4">
          <input
            type="text"
            className="w-full grow focus:outline-none"
            required
            placeholder="Leave a comment"
          />
          <button
            type="submit"
            className="w-fit h-full px-4 py-2 hover:bg-zinc-200 transition-colors duration-150 ease-in-out rounded-md"
          >
            Post
          </button>
        </form>
      </div>
      <CommentsList post_id={post.post_id} />
    </div>
  );
}
