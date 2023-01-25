'use strict';

import React, { useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ custom, color, onChange, popoverStyles }) => {
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
    setDisplay(!display);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: '24px',
        height: '24px',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
        ...popoverStyles,
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        {custom || <div style={styles.color} />}
      </div>
      {display ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
