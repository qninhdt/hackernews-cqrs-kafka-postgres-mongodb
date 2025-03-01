import { Post } from "@/app/lib/definitions";
import { format } from "date-fns";
import PostBackBtn from "./backBtn";
export default function PostContent({post}: {post: Post}) {
    return (
        <div className="w-full h-fit bg-white text-black rounded-lg flex flex-col gap-4 items-start p-4">
            <div>
                <PostBackBtn/>
            </div>
            <h1 className="font-black text-3xl">{post.title}</h1>
            <div className="flex flex-col text-md">
                <p>Posted by @{post.author}</p>
                <p>At {format(new Date(post.timestamp), 'MM/dd/yyyy')}</p>
            </div>
            <p>{post.content}</p>
        </div>
    )
}