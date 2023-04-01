import { FC } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import { formatData } from '../lib/formatter';
import { Post } from '../models';

export const PostItem: FC<{ post: Post }> = ({
  post: { id, createdAt, body, title, userName, imgUrl, userImg },
}) => {
  return (
    <Card maxW="md" variant="outline" p={{ base: 8, md: 0 }}>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={userName} src={userImg} />

            <Box>
              <Heading size="sm">{userName}</Heading>
              <Text>{formatData(createdAt)}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text
          fontSize="lg"
          fontWeight="bold"
          textTransform="capitalize"
          mb="4"
          w="96"
          isTruncated
        >
          {title}
        </Text>
        <Text>{body}</Text>
      </CardBody>
      {imgUrl ? (
        <Image objectFit="cover" src={imgUrl} alt={`${title} Image`} p="4" />
      ) : null}
    </Card>
  );
};
