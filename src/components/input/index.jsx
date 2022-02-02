import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import Wrapper from './style';

const Input = ({
  label,
  onChange,
  disabled,
  className,
  labelClassName,
  inputClassName,
  value,
  leftIcon,
  rightIcon,
  placeholder,
  as,
  optionalLabelDiv,
}) => {
  return (
    <Wrapper leftIcon={leftIcon} rightIcon={rightIcon}>
      <div className={`input-container ${className || ''}`}>
        {label && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div className={`input-label ${labelClassName || ''}`}>{label}</div>
            {optionalLabelDiv || ''}
          </div>
        )}
        {as || (
          <div className="inputBoxWrap">
            {leftIcon}
            <input
              className={inputClassName}
              type="text"
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
            />
            {rightIcon}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Input;

export const PasswordInput = ({
  label,
  onChange,
  disabled,
  className,
  labelClassName,
  inputClassName,
  value,
  leftIcon,
  rightIcon,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Wrapper leftIcon={leftIcon} rightIcon={rightIcon}>
      <div className={`input-container ${className || ''}`}>
        {label && (
          <div className={`input-label ${labelClassName || ''}`}>{label}</div>
        )}
        <div className="inputBoxWrap">
          {leftIcon}
          <input
            className={inputClassName}
            type={visible ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
          />
          {visible ? (
            <Visibility
              htmlColor="#4C6FFF"
              onClick={() => setVisible(!visible)}
            />
          ) : (
            <VisibilityOff
              htmlColor="#4C6FFF"
              onClick={() => setVisible(!visible)}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export const SelectInput = ({
  options,
  placeholder,
  leftIcon,
  rightIcon,
  label,
  onChange,
  inputClassName,
  className,
  labelClassName,
  value,
  labelName,
  optionValue,
  defaultValue,
}) => {
  return (
    <Wrapper leftIcon={leftIcon} rightIcon={rightIcon}>
      <div className={`input-container ${className || ''}`}>
        {label && (
          <div className={`input-label ${labelClassName || ''}`}>{label}</div>
        )}
        <div className="inputBoxWrap">
          {leftIcon}
          <select
            className={inputClassName}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            defaultValue={defaultValue}
          >
            <option value="">{placeholder}</option>
            {options?.length
              ? options.map((option) => (
                  <option
                    style={{
                      textTransform: 'capitalize',
                    }}
                    key={Math.random()}
                    value={option[optionValue] || option.id}
                  >
                    {option[labelName] || option.label || option.name}
                  </option>
                ))
              : ''}
          </select>
          {rightIcon}
        </div>
      </div>
    </Wrapper>
  );
};

export const CheckInput = ({
  label,
  labelClassName,
  inputClassName,
  checked,
  onChange,
  className,
}) => {
  return (
    <Wrapper>
      <div className={`check-wrapper ${className || ''}`}>
        <input
          type="checkbox"
          checked={checked}
          className={`check-input ${inputClassName || ''}`}
          onChange={onChange}
        />
        <div className={`check-label ${labelClassName || ''}`}>{label}</div>
      </div>
    </Wrapper>
  );
};
