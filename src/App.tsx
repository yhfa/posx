import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import PostDetails from './pages/postDetails';
import Home from './pages/home';
import NotFound from './pages/notFound';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <Box as="main">
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
