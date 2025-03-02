import { comments, listposts, listUsers } from "./placeholders";
import User, { Comment, Post, Tags } from "./definitions";
export async function getPostById({ id }: { id: string }) {
  try {
    const response = await fetch(`http://localhost:3001/api/post/${id}`);
    if (!response.ok) {
      throw new Error("Cant fetch post.");
    }
    const res = await response.json();
    const {
      post_id,
      author,
      content,
      tags,
      comment_count,
      created_at,
    }: {
      post_id: string;
      author: User;
      content: string;
      tags: Tags;
      comment_count: number;
      created_at: string;
    } = res;
    const post: Post = {
      post_id: post_id,
      author: author,
      content: content,
      tags: tags,
      comment_count: comment_count,
      timestamp: created_at,
    };
    return post;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post.");
  }
}
export async function getPostByPage({ page }: { page: number }) {
  try {
    const response = await fetch(`http://localhost:3001/api/post?page=${page}`);
    if (!response.ok) {
      throw new Error(`Cant fetch posts of page ${page}.`);
    }
    const res = response.json();
    return res;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post.");
  }
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
