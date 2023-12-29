export interface Forum {
  id: string;
  name: string;
  topics: number;
  lastEntry: string;
}

export interface ForumThread {
  id: string;
  name: string;
  posts: number;
  author: string;
  lastPost: string;
  sticky: boolean;
  locked: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  date: Date;
  lastEdit: Date;
  text: string;
  htmlEnabled: boolean;
}

export interface ForumUser {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  nation: string;
  avatarUrl: string;
}
