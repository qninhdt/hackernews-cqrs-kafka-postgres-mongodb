import { getPostById } from "@/app/lib/data"
import PostBackBtn from "@/app/ui/components/post/backBtn";
import PostContent from "@/app/ui/components/post/postContent";

export default async function PostPage(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = params.id;
    const post = getPostById({id})
    return (
        <div className="min-h-svh">
            <PostContent post={post}/>
            
        </div>
    )
}