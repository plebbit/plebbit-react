import React, { useState } from 'react';
import styles from './input.module.css';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

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
  disabled,
  customMessage,
}) => {
  return (
    <div className={[styles.input_options, wrapperClass].join(' ')}>
      {title && (
        <label
          htmlFor={typeof title === 'string' && title?.replace(' ', '_')}
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
          id={typeof title === 'string' && title?.replace(' ', '_')}
          disabled={disabled}
        />

        {customMessage
          ? customMessage
          : maxLength &&
            !hideCount && (
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
  disabled,
  hideCount,
}) => {
  return (
    <div className={[styles.input_options, wrapperClass].join(' ')}>
      {title && (
        <label
          htmlFor={typeof title === 'string' && title?.replace(' ', '_')}
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
          id={typeof title === 'string' && title?.replace(' ', '_')}
          disabled={disabled}
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

export const Radio = ({
  checked,
  title,
  radioWrapperClass,
  radioClass,
  titleClass,
  onClick,
  customTitle,
  render,
}) => {
  return (
    <label
      role="radio"
      aria-checked={Boolean(checked)}
      tabIndex={checked ? 0 : -1}
      className={[styles.radio_input, radioWrapperClass].join(' ')}
      onClick={onClick}
      htmlFor={typeof title === 'string' && title?.replace(' ', '_')}
    >
      {render ? (
        render
      ) : (
        <>
          {checked ? (
            <MdRadioButtonChecked
              id={typeof title === 'string' && title?.replace(' ', '_')}
              className={[styles.radio_input_svg, radioClass].join(' ')}
            />
          ) : (
            <MdRadioButtonUnchecked
              id={typeof title === 'string' && title?.replace(' ', '_')}
              className={[styles.radio_input_svg, radioClass].join(' ')}
            />
          )}
          {customTitle || <div className={[styles.radio_title, titleClass].join(' ')}>{title}</div>}
        </>
      )}
    </label>
  );
};

export const RadioGroup = ({
  title,
  wrapperClass,
  options,
  value,
  onChange,
  optionLabel,
  getLabel,
  optionValue,
  getValue,
  customTitle,
  titleWrapClass,
  titleClass,
  subTitle,
  render,
}) => {
  return (
    <div className={[styles.input_options, wrapperClass].join(' ')}>
      {title && (
        <label
          htmlFor={typeof title === 'string' && title?.replace(' ', '_')}
          className={[styles.input_options_title, titleWrapClass].join(' ')}
        >
          <h3 className={titleClass}>{title}</h3>
          {subTitle && <p className={subTitleClass}>{subTitle}</p>}
        </label>
      )}
      <div className={styles.input_options_input}>
        <div aria-label={typeof title === 'string' && title?.replace(' ', '_')} role="radiogroup">
          <input type="hidden" value={value} />
          {options?.map((item) =>
            render ? (
              render(item)
            ) : (
              <Radio
                customTitle={customTitle}
                title={
                  typeof getLabel === 'function'
                    ? getLabel(item)
                    : optionLabel
                    ? item[optionLabel]
                    : item?.label || item
                }
                checked={
                  typeof getValue === 'function'
                    ? getValue(item) === value
                    : optionValue
                    ? item[optionValue] === value
                    : item === value
                }
                onChange={() => onChange(item)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const Switch = ({ width = 37.5, height = 24, checked, color, onChange, className }) => {
  const [value, setValue] = useState(checked);

  const labelStyle = {
    background: (checked || value) && (color || '#0079d3'),
    width: `${width}px`, // Set the width using the width prop
    height: `${height}px`, // Set the height using the height prop
  };

  const buttonStyle = {
    width: `${height - 6}px`, // Set the button width based on height prop
    height: `${height - 6}px`, // Set the button height based on height prop
    borderRadius: `${height - 6}px`, // Set the border-radius based on height prop
  };
  return (
    <>
      <input
        onChange={(e) => (typeof onChange == 'function' ? onChange(e) : setValue(!value))}
        className={styles['react-switch-checkbox']}
        id={`react-switch-new`}
        type="checkbox"
        checked={checked || value}
        disabled
      />
      <label
        style={labelStyle}
        className={[styles['react-switch-label'], className].join(' ')}
        htmlFor={`react-switch-new`}
      >
        <span style={buttonStyle} className={styles[`react-switch-button`]} />
      </label>
    </>
  );
};

export const SwitchInput = ({
  checked,
  title,
  radioWrapperClass,
  radioClass,
  titleClass,
  onClick,
  customTitle,
  render,
}) => {
  return (
    <label
      role="checkbox"
      aria-checked={Boolean(checked)}
      tabIndex={checked ? 0 : -1}
      className={[styles.radio_input, radioWrapperClass].join(' ')}
      onClick={onClick}
      htmlFor={typeof title === 'string' && title?.replace(' ', '_')}
    >
      {render ? (
        render
      ) : (
        <>
          <Switch
            id={typeof title === 'string' && title?.replace(' ', '_')}
            className={[styles.input_options_switch, radioClass].join(' ')}
            checked={checked}
          />

          {customTitle || <div className={[styles.radio_title, titleClass].join(' ')}>{title}</div>}
        </>
      )}
    </label>
  );
};
