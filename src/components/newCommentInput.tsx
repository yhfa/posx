import { type FC, type FormEvent, useRef, useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';

import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { getRandomUser } from '../lib/randomUser';

export const NewCommentInput: FC<{ postId: string }> = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!content) return;
    setIsLoading(true);

    const user = await getRandomUser();

    await addDoc(collection(firestore, 'comments'), {
      created_at: new Date(),
      content,
      post_id: postId,
      user_name: user.userName,
      user_img: user.userImg,
    });

    setIsLoading(false);
    setContent('');
  };

  return (
    <Box my="8">
      <form onSubmit={handleSubmit}>
        <Textarea
          mb="2"
          placeholder="Enter to new comment"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        {content ? (
          <Box>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              bg="primary.300"
              _hover={{ bg: 'primary.400' }}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button onClick={() => setContent('')}>Cancel</Button>{' '}
          </Box>
        ) : null}
      </form>
    </Box>
  );
};
