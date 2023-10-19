import React, { useEffect } from 'react';
import { useAccount } from '@plebbit/plebbit-react-hooks';
import ConfirmModal from '../../../components/Modal/ConfirmationModal';
import convertArrToObj from '../../../utils/convertArrToObj';
import removeObjectProperty from '../../../utils/removeObjectProperty';

const LeaveMod = ({
  setIsOpen,
  isOpen,
  subPlebbit,
  handleSubPlebbitedit,
  loading,
  data,
  setData,
}) => {
  const profile = useAccount();

  const otherUsers = removeObjectProperty(subPlebbit?.roles, profile?.author?.address);

  useEffect(() => {
    setData({ roles: otherUsers });

    return () => {
      setData({});
    };
  }, []);

  return (
    <ConfirmModal
      title="Leave as mod"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={handleSubPlebbitedit}
      confirmText="Leave"
      loading={loading}
      onClose={() => setData({})}
    >
      Once you leave as a mod, you will lose mod permissions and will be unable to access any mod
      tools for this community. Are you sure you wish to leave as a mod of this community?
    </ConfirmModal>
  );
};

export default LeaveMod;

export const RemoveMod = ({
  setIsOpen,
  isOpen,
  subPlebbit,
  address,
  handleSubPlebbitedit,
  loading,
  setSelected,
}) => {
  const data = subPlebbit;

  const handleDelete = async () => {
    setLoading(true);
    await delete data?.roles[address];
    await handleSubPlebbitedit({ roles: subPlebbit?.roles });
    setSelected('');
    setLoading(false);
    onClose();
  };

  return (
    <ConfirmModal
      title="Remove as a mod"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={handleDelete}
      confirmText="Leave"
      loading={loading}
    >
      Once you remove {address} as a mod, {address} will lose mod permissions and will be unable to
      access any mod tools for this community. Are you sure you want to remove user as a mod of this
      community?
    </ConfirmModal>
  );
};
