import './select.css';
import {
  autoUpdate,
  flip,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
  useClick,
  useListItem,
  useDismiss,
  useRole,
  FloatingFocusManager,
  FloatingList,
  offset,
} from '@floating-ui/react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const SelectContext = createContext({});
// const options = ['Apple', 'Blueberry', 'Watermelon', 'Banana'];

const SelectBody = ({ title, children, wrapperClassName, top, left, onChange, titleClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset({ mainAxis: top || 5, alignmentAxis: left || 0 }), flip()],
  });

  const elementsRef = useRef([]);
  const labelsRef = useRef([]);

  const handleSelect = useCallback((index, value) => {
    setSelectedIndex(index);
    onChange(value);
    setIsOpen(false);
    if (index !== null) {
      setSelectedLabel(labelsRef.current[index]);
    }
  }, []);

  function handleTypeaheadMatch(index) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    listNav,
    typeahead,
    click,
    dismiss,
    role,
  ]);

  const selectContext = useMemo(
    () => ({
      activeIndex,
      selectedIndex,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, selectedIndex, getItemProps, handleSelect]
  );

  return (
    <>
      <button className={titleClass} ref={refs.setReference} tabIndex={0} {...getReferenceProps()}>
        {typeof title === 'function' ? title(selectedLabel) : selectedLabel ?? 'Select'}
      </button>
      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className={wrapperClassName}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </>
  );
};

function Option({ label, optionClassName, value }) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useContext(SelectContext);

  const { ref, index } = useListItem({ label });

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      isActive={String(isActive)}
      className={optionClassName}
      {...getItemProps({
        onClick: () => handleSelect(index, value),
      })}
    >
      {label}
    </button>
  );
}

const Select = ({
  title,
  options,
  className,
  render,
  optionClassName,
  top,
  left,
  optionLabel,
  optionValue,
  getOptionLabel,
  getOptionValue,
  onChange,
  titleClass,
}) => {
  return (
    <>
      <SelectBody
        onChange={onChange}
        title={title}
        wrapperClassName={className}
        top={top}
        left={left}
        titleClass={titleClass}
      >
        {options?.map((option, index) =>
          typeof render === 'function' ? (
            render(option)
          ) : (
            <Option
              optionClassName={optionClassName}
              label={
                optionLabel
                  ? option[optionLabel]
                  : typeof getOptionLabel === 'function'
                  ? getOptionLabel(option)
                  : option
              }
              value={
                optionValue
                  ? option[optionValue]
                  : typeof getOptionValue === 'function'
                  ? getOptionValue(option)
                  : option
              }
              key={index}
            />
          )
        )}
      </SelectBody>
    </>
  );
};

export default Select;
