import { type FC, type FormEvent, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { getRandomUser } from '../lib/randomUser';

export const NewPostModal: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = useRef(null);
  const newPostFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!newPostFormRef.current) return;
    setIsLoading(true);

    const newPostData = new FormData(newPostFormRef.current);
    const newPostObj = Object.fromEntries(newPostData) as unknown as {
      title: string;
      body: string;
      image: File;
    };

    const { title, body, image } = newPostObj;

    let storageRef: StorageReference | null = null;

    if (image.size) {
      const storage = getStorage();
      storageRef = ref(storage, `${crypto.randomUUID()}_${image.name}`);
      await uploadBytes(storageRef, image);
    }

    let imgUrl: string | null = null;

    if (storageRef) {
      // Upload completed successfully, now we can get the download URL
      imgUrl = await getDownloadURL(storageRef);
    }

    const user = await getRandomUser();

    await addDoc(collection(firestore, 'posts'), {
      created_at: new Date(),
      title,
      body,
      img_url: imgUrl,
      user_name: user.userName,
      user_img: user.userImg,
    });

    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit} ref={newPostFormRef}>
        <ModalContent w={{ base: '90%', md: '100%' }}>
          <ModalHeader>Add New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} placeholder="ex. My meal" name="title" />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Body</FormLabel>
              <Textarea
                placeholder="ex. I eat chinese food today 😋"
                name="body"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <input type="file" accept="image/*" name="image" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              bg="primary.300"
              _hover={{ bg: 'primary.400' }}
              disabled={newPostFormRef.current?.checkValidity()}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
