import { Timestamp } from 'firebase/firestore';

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  postId: string;
  userImg: string;
  userName: string;
}

export interface BackendComment {
  id: string;
  content: string;
  created_at: Timestamp;
  post_id: string;
  user_img: string;
  user_name: string;
}
