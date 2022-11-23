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
    // useSystemColorMode: false,
  },
  colors: {
    //General
    black: '#000000',
    white: '#ffffff',
    mainGrey: '#a4a4a4',
    mainBlue: '#0079d3',
    upvoteOrange: '#cc3700',
    downvoteBlue: '#5a75cc',
    textMuted: '#a8aaab',
    pastelGreen: '#75d377',
    persimmon: '#ff585b',
    brightSun: '#ffd635',

    // light
    lightButtonBg: '#a4a4a4',
    lightBg: '#DAE0E6',

    selectedLight: '#edeff1',
    postDetailLightBg: '#323232',

    // dark theme
    darkButtonBg: '#D7DADC',
    darkBg: '#030303',
    darkNavBg: '#1A1A1B',

    darkLayoutBg: '#1A202C',
    selectedDark: '#343536',
    postDetailDarkBg: '#191919',
    borderDark: '#474748',

    // new color scheme

    //light
    lightBody: '#fff',
    metaTextLight: '#7c7c7c',
    borderLight1: '#a4a4a4',
    lightText1: '#373c3f',
    lightText2: '#1c1c1c',
    lightText3: '#1a1a1b',
    borderLight: '#ccc',
    borderLight2: '#edeff1',
    lightInputBg: '#f6f7f8',
    bodyTextLight: '#1c1c1c',
    lightIcon: '#878a8c',
    lightText: '#222222',
    lightShadow: 'rgba(28,28,28,0.03)',
    lightPostTransBg: 'rgba(255,255,255,0.8)',
    lightVoteText: 'rgb(26, 26, 27)',
    lightIconBg: '#DAE0E6',
    lightLink: '#0079D3',
    lightIcon2: '#1a1a1b',
    lightMobileText: '#000',
    lightMobileText2: '#1a1a1b',
    lightMobileIcon: '#ccccca',
    lightMobileIcon2: '#787c7e',
    lightTransparent20: 'rgba(255,255,255,0.8)',

    //dark
    darkBody: '#1A1A1B',
    metaTextDark: '#818384',
    borderDark1: '#E9F5FD',
    darkText1: '#D7DADC',
    borderDark2: '#343536',
    darkInputBg: '#272729',
    bodyTextDark: '#d7dadc',
    darkIcon: '#818384',
    darkShadow: 'rgba(215,218,220,0.2)',
    darkShadow2: 'rgba(215,218,220,0.03)',
    darkPostTransBg: 'rgba(26,26,27,0.8)',
    darkVoteTest: 'rgb(215, 218, 220)',
    darkIconBg: '#030303',
    darkLink: '##4FBCFF',
    darkMobileText: '#cfd0ca',
    darkMobileIcon: '#545452',
    darkTransparent20: 'rgba(26,26,27,0.8)',
  },
  fonts: {
    body: 'IBM Plex Sans, sans-serif',
  },
  sizes: {
    '6xl': '80rem',

    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  components: {},
  breakpoints,
});

export default theme;
