import { Post } from "@/app/lib/definitions";
import PostThumbnail from "./postThumbnail";
import { compareDesc } from "date-fns";
import { fetchAllPosts } from "@/app/lib/data";

export default async function PostsList() {
  const fetchedPosts = await fetchAllPosts();
  const sortedPosts = fetchedPosts.sort((a, b) =>
    compareDesc(new Date(a.timestamp), new Date(b.timestamp))
  );
  return (
    <div className="flex flex-col gap-4 mt-8">
      {sortedPosts.map((post) => (
        <PostThumbnail key={post.post_id} post={post} />
      ))}
    </div>
  );
}
