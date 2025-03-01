import { getUserById } from "@/app/lib/data";
import { Comment } from "@/app/lib/definitions";
export default async function SingleComment({comment}: {comment: Comment}) {
    const user = await getUserById({id: comment.author_id});
    return (
        <div className="w-full h-16 p-4 flex flex-col items-start">
            <p className="font-semibold">{user.username}</p>
            <p>{comment.content}</p>
        </div>
    )
}