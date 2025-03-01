export default interface User {
  username: string;
  email: string;
  password: string;
  id: number;
  avatar: string;
}

export interface Post {
  author: string;
  title: string;
  content: string;
  post_id: string;
  timestamp: string;
}