import { Post } from "./definitions";
import User from "./definitions";

const user1: User = {
  username: "john_doe",
  email: "john@example.com",
  password: "password123",
  id: 1,
  avatar: "https://example.com/avatar1.png"
};

const user2: User = {
  username: "alice_johnson",
  email: "alice@example.com",
  password: "password123",
  id: 2,
  avatar: "https://example.com/avatar2.png"
};

const user3: User = {
  username: "chris_lee",
  email: "chris@example.com",
  password: "password123",
  id: 3,
  avatar: "https://example.com/avatar3.png"
};

export const listposts: Post[] = [
  {
    author: user1.username,
    title: "Understanding JavaScript Closures",
    content: "Closures are a fundamental concept in JavaScript that every developer should understand. In this post, we will explore what closures are and how they work.",
    post_id: "1",
    timestamp: "2025-01-01T10:00:00Z"
  },
  {
    author: user2.username,
    title: "A Guide to React Hooks",
    content: "React hooks are a powerful feature that allow you to use state and other React features without writing a class. This post will cover the basics of hooks and how to use them.",
    post_id: "2",
    timestamp: "2025-02-15T12:00:00Z"
  },
  {
    author: user3.username,
    title: "CSS Grid Layout: A Comprehensive Guide",
    content: "CSS Grid Layout is a two-dimensional layout system for the web. It lets you layout items in rows and columns, and it has many powerful features. This guide will cover everything you need to know to get started with CSS Grid.",
    post_id: "3",
    timestamp: "2025-03-10T14:00:00Z"
  }
];