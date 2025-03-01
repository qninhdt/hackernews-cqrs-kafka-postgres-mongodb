import { Post } from "@/app/lib/definitions";
import { format } from "date-fns";
import PostBackBtn from "./backBtn";
export default function PostContent({post}: {post: Post}) {
    const tags: string = post.tags.map(tag => tag.name).join(", ");
    return (
        <div className="w-full h-fit border-b border-zinc-200 flex flex-col gap-4 items-start p-4">
            <div>
                <PostBackBtn/>
            </div>
            <h1 className="font-black text-3xl">{post.title}</h1>
            <div className="flex flex-col text-md">
                <p>Posted by @{post.author_id}</p>
                <p>At {format(new Date(post.timestamp), 'MM/dd/yyyy')}</p>
                <p>Tags: {tags}</p>
            </div>
            <p>{post.content}</p>
        </div>
    )
}