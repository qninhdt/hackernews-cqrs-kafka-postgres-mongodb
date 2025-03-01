export default interface User {
  username: string;
  email: string;
  password: string;
  id: string;
  avatar: string;
}

export interface Post {
  author_id: string;
  title: string;
  content: string;
  post_id: string;
  timestamp: string;
  tags: Tags[];
}
export interface Comment {
  id: string;
  author_id: string;
  content: string;
  post_id: string;
  timestamps: string;
}

export interface Tags {
  id: number;
  name: string;
}