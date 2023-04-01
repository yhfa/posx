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
      storageRef = ref(storage, image.name);
      await uploadBytes(storageRef, image);
    }

    let imageUrl: string | null = null;

    if (storageRef) {
      // Upload completed successfully, now we can get the download URL
      imageUrl = await getDownloadURL(storageRef);
    }

    console.log(newPostObj);

    await addDoc(collection(firestore, 'posts'), {
      createdAt: new Date(),
      title,
      body,
      imageUrl,
    });

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit} ref={newPostFormRef}>
          <ModalContent>
            <ModalHeader>Add New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="ex. My meal"
                  name="title"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Body</FormLabel>
                <Input
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
    </>
  );
};
