import React from 'react';
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import styles from './modal.module.css';
import { MdClose } from 'react-icons/md';

const Modal = ({
  lockScroll,
  isOpen,
  setIsOpen,
  width,
  header,
  hideCloseBtn,
  children,
  modalBodyStyle,
  className,
}) => {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown', outsidePress: false });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  return (
    <>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay
            className={[styles.modal_overlay, !open && styles.modal_hide].join(' ')}
            lockScroll={lockScroll || true}
          >
            <FloatingFocusManager context={context}>
              <section
                className={[styles.modal_wrapper, className].join(' ')}
                ref={refs.setFloating}
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
                style={{
                  maxWidth: width,
                }}
              >
                <header className={styles.modal_header}>
                  {header}
                  {!hideCloseBtn && (
                    <button className={styles.modal_close} onClick={() => setIsOpen(false)}>
                      <MdClose className={styles.modal_close_icon} />
                    </button>
                  )}
                </header>
                <div className={[styles.modal_body, modalBodyStyle].join(' ')}>{children}</div>
              </section>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};
export default Modal;
