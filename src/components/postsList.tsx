import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { VStack } from '@chakra-ui/react';

import { PostsItem } from './postItem';
import { firestore } from '../lib/firebase';
import { BackendPost, Post } from '../models';

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(firestore, 'posts'), orderBy('created_at', 'desc')),
      snapshot => {
        const postsList: Post[] = [];

        snapshot.docs.forEach(doc => {
          const post = doc.data() as BackendPost;
          postsList.push({
            id: doc.id,
            body: post.body,
            userId: post.userId,
            title: post.title,
            createdAt: post.created_at.toDate(),
            imgUrl: post.img_url,
          });
        });

        setPosts(postsList);

        return () => unSub();
      }
    );
  }, []);

  return (
    <VStack spacing={4}>
      {posts.map(post => (
        <PostsItem key={post.id} post={post} />
      ))}
    </VStack>
  );
};
