import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from './dropdown.module.css';

const DropDown = ({
  inputBg,
  caret,
  dropDownTitle,
  content,
  options,
  wrapSx,
  stopAutoHide,
  topOffset,
  rightOffset,
  leftOffset,
  render,
  width,
  onChange,
  selected,
  getSelected,
  customCaret,
  labelStyle,
  caretStyle,
  menuSx,
  disableTitleClick,
  getOptionLabel,
  titleClass,
}) => {
  const [show, hide] = useState(false);

  return (
    <div style={wrapSx} className={styles.wrapper}>
      <div
        className={styles.dd_top}
        onClick={() => !disableTitleClick && hide(!show)}
        style={menuSx}
      >
        <div style={labelStyle} className={titleClass}>
          {dropDownTitle}
        </div>
        {caret
          ? customCaret || (
              <div onClick={() => hide(!show)} className={styles.dd_top_caret}>
                <MdOutlineKeyboardArrowDown style={caretStyle} />
              </div>
            )
          : ''}
      </div>
      {show ? (
        <div
          onMouseLeave={() => (stopAutoHide ? {} : hide(false))}
          className={styles.dd_content}
          style={{
            top: topOffset || '24px',
            left: leftOffset || '10px',
            right: rightOffset,
            width,
          }}
        >
          {options
            ? options?.map((option, index) =>
                render && option.disabled !== true ? (
                  render(option)
                ) : option.disabled !== true ? (
                  <div
                    key={index}
                    style={{
                      color:
                        selected && getSelected && selected === getSelected(option) && '#0079d3',
                    }}
                    cursor="pointer"
                    onClick={() => typeof onChange === 'function' && onChange(option)}
                    className={styles.dd_option}
                  >
                    {option?.icon && (
                      <option.icon
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                        color={option?.IconColor || option?.color}
                        as={option?.icon}
                      />
                    )}
                    <div
                      style={{
                        color: option?.color,
                      }}
                    >
                      {typeof getOptionLabel === 'function'
                        ? getOptionLabel(option)
                        : option?.label}
                    </div>
                  </div>
                ) : (
                  ''
                )
              )
            : content}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DropDown;
