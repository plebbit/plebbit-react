import React, { useState } from 'react';
import More from '../../assets/svgs/more.svg';
import Wrapper from './style';

const DropDownMenu = ({ handleDropOptions, options, optionClassName, menu, selected }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Wrapper>
      <div onClick={() => setShowDropDown(!showDropDown)}>
        {menu || <img src={More} alt="more" />}
      </div>
      {showDropDown === true && (
        <div className="moreCont" onMouseLeave={() => setShowDropDown(false)}>
          {options?.length
            ? options.map((item) => (
                <div
                  key={Math.random()}
                  className={optionClassName || 'more-item'}
                  style={{
                    color: item.color,
                  }}
                  onClick={() => {
                    setShowDropDown(false);
                    if (selected) {
                      handleDropOptions(item, selected);
                    } else {
                      handleDropOptions(item);
                    }
                  }}
                >
                  {item.label}
                </div>
              ))
            : ''}
        </div>
      )}
    </Wrapper>
  );
};

export default DropDownMenu;
