import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link as ReactRouterLink } from 'react-router-dom';
import { LinkBox, LinkOverlay, VStack } from '@chakra-ui/react';

import { PostItem } from './postItem';
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
            title: post.title,
            createdAt: post.created_at.toDate(),
            imgUrl: post.img_url,
            userImg: post.user_img,
            userName: post.user_name,
          });
        });

        setPosts(postsList);

        return () => unSub();
      }
    );
  }, []);

  return (
    <VStack
      spacing={4}
      maxW={{ base: 'md', md: 'lg' }}
      mx="auto"
      mb="8"
      p={{ base: 8, md: 0 }}
    >
      {posts.map(post => (
        <LinkBox as="article" key={post.id}>
          <LinkOverlay as={ReactRouterLink} to={`/posts/${post.id}`}>
            <PostItem post={post} />
          </LinkOverlay>
        </LinkBox>
      ))}
    </VStack>
  );
};
