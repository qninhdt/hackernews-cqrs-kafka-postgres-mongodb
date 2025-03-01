import { listposts } from "./placeholders";
export function getPostById({id} : {id: string}) {
    try {
        
        const data = listposts;
        const post = data.find(post => post.post_id === id);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
      }
}
export function fetchAllPosts() {
    console.log('log from fetching, ' + listposts.length);
    
    return listposts;
}
