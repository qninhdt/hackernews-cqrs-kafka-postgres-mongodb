import { Post, Tags } from "@/app/lib/definitions";
import { formatDistance } from "date-fns";
import Link from "next/link";

function TagsList({tags} : {tags: Tags[]}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {tags.map((tag, index) => (
        <div key={index} className="w-fit py-1 px-2 rounded-full text-xs bg-zinc-100">
          {tag.name.toLowerCase()}
        </div>
      ))}
    </div>
  )
}

export default function PostThumbnail({ post }: { post: Post }) {
  return (
    <Link href={`posts/${post.post_id}`}>
    <div className="w-full h-24 bg-white rounded-lg flex flex-row gap-4 overflow-clip">
      <div className="h-full w-[6px] bg-amber-400"></div>
      <div className="flex flex-col gap-1 items-start justify-center">
        <p className="uppercase text-xl font-bold hover:underline">{post.title}</p>
        <p className="text-sm">{`Posted by ${post.author_id} ${formatDistance(new Date(post.timestamp), new Date())} ago`}</p>
        <TagsList tags={post.tags}/>
      </div>
    </div>
    </Link>
  );
}
