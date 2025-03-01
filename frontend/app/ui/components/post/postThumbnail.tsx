import { Post } from "@/app/lib/definitions";
import { formatDistance } from "date-fns";
import Link from "next/link";

export default function PostThumbnail({ post }: { post: Post }) {
  return (
    <Link href={`posts/${post.post_id}`}>
    <div className="w-full h-20 bg-white rounded-lg flex flex-row gap-4 overflow-clip">
      <div className="h-20 w-[6px] bg-amber-400"></div>
      <div className="flex flex-col items-start justify-center">
        <p className="uppercase text-xl font-bold hover:underline">{post.title}</p>
        <p className="text-sm">{`Posted by ${post.author} ${formatDistance(new Date(post.timestamp), new Date())} ago`}</p>
      </div>
    </div>
    </Link>
  );
}
