const handleScrollPosition = () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem('scrollPosition');
  }
};

export default handleScrollPosition;

import React from 'react';

export const handleSaveScrollPosition = () => {
  return sessionStorage.setItem('scrollPosition', window.pageYOffset);
};
