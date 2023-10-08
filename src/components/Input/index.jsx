import React from 'react';
import styles from './input.module.css';

const Input = ({
  wrapperClass,
  titleWrapClass,
  subTitleClass,
  title,
  subTitle,
  value,
  maxLength,
  placeholder,
  type,
  onChange,
  hideCount,
  titleClass,
}) => {
  return (
    <div className={[styles.input_options, wrapperClass].join(' ')}>
      {title && (
        <label
          htmlFor={title.replace(' ', '_')}
          className={[styles.input_options_title, titleWrapClass].join(' ')}
        >
          <h3 className={titleClass}>{title}</h3>
          {subTitle && <p className={subTitleClass}>{subTitle}</p>}
        </label>
      )}
      <div className={styles.input_options_input}>
        <input
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          id={title.replace(' ', '_')}
        />
        {maxLength && !hideCount && (
          <div className={styles.input_options_input_count}>
            {maxLength - (+value?.length || 0)} Characters remaining
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

export const TextArea = ({
  wrapperClass,
  titleWrapClass,
  subTitleClass,
  title,
  subTitle,
  value,
  maxLength,
  placeholder,
  type,
  onChange,
  titleClass,
}) => {
  return (
    <div className={[styles.input_options, wrapperClass].join(' ')}>
      {title && (
        <label
          htmlFor={title.replace(' ', '_')}
          className={[styles.input_options_title, titleWrapClass].join(' ')}
        >
          <h3 className={titleClass}>{title}</h3>
          {subTitle && <p className={subTitleClass}>{subTitle}</p>}
        </label>
      )}
      <div className={styles.input_options_input}>
        <textarea
          resize="both"
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={{
            minHeight: '80px',
          }}
          id={title.replace(' ', '_')}
        />
        {maxLength && !hideCount && (
          <div className={styles.input_options_input_count}>
            {maxLength - (+value?.length || 0)} Characters remaining
          </div>
        )}
      </div>
    </div>
  );
};
