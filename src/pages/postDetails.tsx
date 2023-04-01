import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { PostItem } from '../components/postItem';
import { NewCommentInput } from '../components/newCommentInput';
import { CommentsList } from '../components/commentsList';
import { firestore } from '../lib/firebase';
import { BackendPost, Post } from '../models';

function PostDetails() {
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(
      query(collection(firestore, 'posts'), where('__name__', '==', postId)),
      snapshot => {
        if (!snapshot.docs.length) navigate('/not-found');

        const post = snapshot.docs[0].data() as BackendPost;

        setPost({
          id: snapshot.docs[0].id,
          body: post.body,
          title: post.title,
          createdAt: post.created_at.toDate(),
          imgUrl: post.img_url,
          userImg: post.user_img,
          userName: post.user_name,
        });
      }
    );
  }, [postId]);

  return (
    <VStack w="96" mx="auto">
      {post && postId ? (
        <Box>
          <Box mb="4">
            <PostItem post={post} />
          </Box>
          <CommentsList postId={postId} />
          <NewCommentInput postId={postId} />
        </Box>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white" w="full">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </VStack>
  );
}

export default PostDetails;
