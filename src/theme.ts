import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    100: '#a2e5d9',
    200: '#6ad5c1',
    300: '#45CBB2',
    400: '#308e7d',
    500: '#153d35',
  },
  secondary: {
    100: '#ffb697',
    200: '#ff9163',
    300: '#FF8552',
    400: '#cc6a42',
    500: '#663521',
  },
};

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Raleway', sans-serif`,
};

const theme = {
  colors,
  fonts,
};

export default extendTheme(theme);
