import { FC } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { formatData } from '../lib/formatter';
import { Comment } from '../models';

export const CommentItem: FC<{ comment: Comment }> = ({
  comment: { id, createdAt, content, userName, userImg },
}) => {
  return (
    <VStack>
      <HStack justifyContent="start">
        <Avatar size="sm" name={userName} src={userImg} />
        <Text>{content}</Text>
      </HStack>
      <Text alignSelf="start" color="gray.400" fontSize="xm">
        {formatData(createdAt)}
      </Text>
    </VStack>
  );
};
