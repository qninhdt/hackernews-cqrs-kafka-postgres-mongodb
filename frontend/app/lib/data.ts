import { comments, listposts, listUsers } from "./placeholders";
import { Comment } from "./definitions";
export function getPostById({ id }: { id: string }) {
  try {
    const data = listposts;
    const post = data.find((post) => post.post_id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}
export function fetchAllPosts() {
  console.log("log from fetching, " + listposts.length);

  return listposts;
}
export function getUserById({ id }: { id: string }) {
  try {
    const data = listUsers;
    const user = listUsers.find((user) => user.id == id);
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export function getUserNameById({ id }: { id: string }) {}

export async function getAllCommentByPostId({ post_id }: { post_id: string }) {
  try {
    const data = comments;
    if (!data) {
      throw new Error("error fetching comments");
    }
    const commentsList: Comment[] = comments.filter(
      (comment: Comment) => comment.post_id == post_id
    );
    return commentsList;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch comments.");
  }
}
