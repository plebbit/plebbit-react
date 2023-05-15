import { toast } from 'react-toastify';
import truncateString from './truncateString';

const onSuccess = (error) => {
  return toast.success(truncateString(error?.toString(), 500), {
    position: 'bottom-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
    className: 'toast-message'
  });
};

export default onSuccess;
