export interface Post {
  id: string;
  userId: string;
  createdAat: Date;
  title: string;
  body: string;
  imgUrl?: string;
}
