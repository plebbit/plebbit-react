import { useAccount, useAccountSubplebbits } from '@plebbit/plebbit-react-hooks';
import useSubPlebbitDefaultData from './useSubPlebbitDefaultData';
import getAddressFromArray from '../utils/getAddressFromArray';

// addresses of all subs
const useHomeAllSubAddresses = () => {
  const profile = useAccount();
  const { accountSubplebbits } = useAccountSubplebbits();
  const defaultSubplebbitAddresses = useSubPlebbitDefaultData();

  if (!defaultSubplebbitAddresses || !profile) {
    return [];
  }
  return [
    ...getAddressFromArray(profile.subscriptions),
    ...getAddressFromArray(defaultSubplebbitAddresses),
    ...Object.keys(accountSubplebbits),
  ].filter(Boolean);
};

export default useHomeAllSubAddresses;

// addresses of all subs related to me
export const useMyHomeSubAddresses = () => {
  const profile = useAccount();
  const { accountSubplebbits } = useAccountSubplebbits();
  if (!profile) {
    return [];
  }
  return [...getAddressFromArray(profile.subscriptions), ...Object.keys(accountSubplebbits)].filter(
    Boolean
  );
};
