import { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';

import { formatData } from '../lib/formatter';
import { Post } from '../models';

export const PostsItem: FC<{ post: Post }> = ({
  post: { id, createdAt, body, title, userId, imgUrl },
}) => {
  return (
    <LinkBox as="article">
      <Card maxW="md" variant="elevated">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="User Name" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">User Name</Heading>
                <Text>{formatData(createdAt)}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <LinkOverlay as={ReactRouterLink} to={`/posts/${id}`}>
            <Text>{body}</Text>
          </LinkOverlay>
        </CardBody>
        {imgUrl ? (
          <Image objectFit="cover" src={imgUrl} alt={`${title} Image`} />
        ) : null}
      </Card>
    </LinkBox>
  );
};
