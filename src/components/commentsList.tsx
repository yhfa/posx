import { FC, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { VStack } from '@chakra-ui/react';

import { firestore } from '../lib/firebase';
import { BackendComment, Comment } from '../models';
import { CommentItem } from './commentItem';

export const CommentsList: FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(
      query(
        collection(firestore, 'comments'),
        where('post_id', '==', postId),
        orderBy('created_at', 'desc')
      ),
      snapshot => {
        const commentsList: Comment[] = [];

        snapshot.docs.forEach(doc => {
          const comment = doc.data() as BackendComment;
          commentsList.push({
            id: doc.id,
            userImg: comment.user_img,
            userName: comment.user_name,
            postId: comment.post_id,
            content: comment.content,
            createdAt: comment.created_at.toDate(),
          });
        });

        setComments(commentsList);

        return () => unSub();
      }
    );
  }, []);

  return (
    <VStack spacing={4} align="start">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </VStack>
  );
};
