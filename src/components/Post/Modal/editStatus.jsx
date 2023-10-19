import React from 'react';
import Label from '../../Label';
import Modal from '../../Modal';
import styles from './modal.module.css';
import Button from '../../Button';

const EditStatus = ({ setIsOpen, isOpen, post }) => {
  const failed = post?.failedEdits;
  const pending = post?.pendingEdits;
  const success = post?.succeededEdits;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header="Edit Status"
      modalBodyStyle={styles.main_wrapper}
    >
      <div className={styles.wrapper}>
        <div className={styles.modal_form}>
          {Object?.keys(failed)?.map((val) => (
            <div className={styles.modal_form_item}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  lineHeight: '20px',
                  marginBottom: '4px',
                  color: '#1c1c1c',
                }}
              >
                {val}
              </div>

              <div>
                <Label
                  style={{
                    color: 'red',
                  }}
                  variant="outline"
                  text="failed"
                />
              </div>
            </div>
          ))}
          {Object?.keys(pending)?.map((val) => (
            <div className={styles.modal_form_item}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  lineHeight: '20px',
                  marginBottom: '4px',
                  color: '#1c1c1c',
                }}
              >
                {val}
              </div>

              <div>
                <Label
                  style={{
                    color: 'orange',
                  }}
                  text="pending"
                />
              </div>
            </div>
          ))}
          {Object?.keys(success)?.map((val) => (
            <div className={styles.modal_form_item}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  lineHeight: '20px',
                  marginBottom: '4px',
                  color: '#1c1c1c',
                }}
              >
                {val}
              </div>

              <div>
                <Label
                  style={{
                    color: 'green',
                  }}
                  text="success"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </footer>
    </Modal>
  );
};

export default EditStatus;
