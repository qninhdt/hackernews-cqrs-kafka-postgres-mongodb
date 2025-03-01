'use server'
import { z } from "zod";
import User from "./definitions";
import { v4 as uuidv4 } from "uuid";
import { listposts } from "./placeholders";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const FormSchema = z.object({
  post_id: z.string(),
  author: z.string(),
  title: z.string(),
  content: z.string(),
  timestamp: z.string(),
});
const CreatePost = FormSchema.omit({ post_id: true, timestamp: true, author: true });

// post request?? - post request handler to be exact
export async function createPost( currentUserName: string, formData: FormData,) {
  const { title, content } = CreatePost.parse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  const timestamp = new Date().toISOString();
  const postId = uuidv4();
  const newPost = {
    post_id: postId,
    title,
    content,
    author: currentUserName,
    timestamp,
  }
  listposts.push(newPost);
  console.log(listposts);
  
  // refetch data from the database
  revalidatePath("/home");
  //  redirect to the home page
  redirect("/home");
}
