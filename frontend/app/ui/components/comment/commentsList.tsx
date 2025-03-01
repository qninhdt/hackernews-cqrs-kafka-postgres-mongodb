import { getAllCommentByPostId } from "@/app/lib/data";
import SingleComment from "./SingleComment";
import { Comment } from "@/app/lib/definitions";

export async function CommentsList({post_id}: {post_id:string}) {
    const comments: Comment[] = await getAllCommentByPostId({post_id})
    return (
        <div>
            <ol className="flex flex-col justify-start ">
            {comments.map((comment, index) => (
                <li key={index} className="border-b border-t pb-2 border-zinc-200">
                    <SingleComment comment={comment}/>
                </li>
            ))}
            </ol>
        </div>
    )
}