import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  userId: string;
  createdAt: Date;
  title: string;
  body: string;
  imgUrl?: string;
}

export interface BackendPost {
  id: string;
  userId: string;
  created_at: Timestamp;
  title: string;
  body: string;
  img_url?: string;
}
