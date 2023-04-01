import { useState } from 'react';
import { Box, Image, Button } from '@chakra-ui/react';

import logo from '../assets/logo.png';
import { NewPostModal } from './newPostModal';
import { Post } from '../models';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="4"
        py="8"
      >
        <Box h="8">
          <Image src={logo} alt="Posx Logo" h="full" objectFit="cover" />
        </Box>
        <Button
          bg="secondary.200"
          color="white"
          _hover={{ bg: 'secondary.300' }}
          onClick={() => setIsOpen(true)}
        >
          Add Post
        </Button>
      </Box>
      <NewPostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Header;
