import { Timestamp } from 'firebase/firestore';

export interface Post {
  id: string;
  createdAt: Date;
  title: string;
  body: string;
  imgUrl?: string;
  userImg: string;
  userName: string;
}

export interface BackendPost {
  id: string;
  created_at: Timestamp;
  title: string;
  body: string;
  img_url?: string;
  user_img: string;
  user_name: string;
}
