'use server'
import { string, z } from "zod";
import User, { Post, Tags } from "./definitions";
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
  tags: z.string(), 
});
const CreatePost = FormSchema.omit({ post_id: true, timestamp: true, author: true });

// post request?? - post request handler to be exact
export async function createPost( currentUserName: string, formData: FormData,) {
  const { title, content, tags } = CreatePost.parse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.get("tags") as string,
  });
  const timestamp = new Date().toISOString();
  const postId = uuidv4();
  const tagsList = tags.split(",");
  let tagsObjectsList: Tags[] = []
  for ( const str of tagsList) {
    tagsObjectsList.push({
      id: Math.floor(Math.random() * 1000000),
      name: str,
    })
  }
  const newPost: Post = {
    post_id: postId,
    title,
    content,
    author_id: currentUserName,
    timestamp,
    tags: tagsObjectsList,
  }
  listposts.push(newPost);
  console.log(listposts);
  
  // refetch data from the database
  revalidatePath("/home");
  //  redirect to the home page
  redirect("/home");
}
