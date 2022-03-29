// theme.js
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  global: {
    body: {},
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    black: '#000000',
    white: '#ffffff',
    mainOrange: '#ff4500',
    mainBlue: '#0079d3',
    upvoteOrange: '#cc3700',
    downvoteBlue: '#5a75cc',
    textMuted: '#a8aaab',

    // light
    lightText: '#222222',
    lightButtonBg: '#a4a4a4',
    lightBg: '#DAE0E6',
    lightNavBg: '#ffffff',
    lightInputBg: '#f6f7f8',
    lightIcon: '#878a8c',
    lightLayoutBg: '#DAE0E6',
    selectedLight: '#edeff1',
    postDetailLightBg: '#323232',
    borderLight: '#ccc',
    borderLight2: '#edeff1',

    // dark theme
    darkText: '#d7dadc',
    darkButtonBg: '#D7DADC',
    darkBg: '#030303',
    darkNavBg: '#1A1A1B',
    darkInputBg: '#272729',
    darkIcon: '#818384',
    darkLayoutBg: '#1A202C',
    selectedDark: '#343536',
    postDetailDarkBg: '#191919',
    borderDark: '#474748',
    borderDark2: '#343536',
  },
  fonts: {
    body: 'IBM Plex Sans, sans-serif',
  },
  components: {},
  breakpoints,
});

export default theme;
