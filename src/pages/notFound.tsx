import { Box, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import notFound from '../assets/not-found.avif';

function NotFound() {
  return (
    <VStack w={{ base: 64, md: 96 }} m="auto" align="center" justify="center">
      <Image src={notFound} />
      <Box>
        <Link as={ReactRouterLink} to="/">
          <Text>Return to home</Text>
        </Link>
      </Box>
    </VStack>
  );
}

export default NotFound;
