import { toast } from 'react-toastify';

const onError = (error) => {
  return toast.error(error?.stack.toString(), {
    position: 'bottom-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
};

export default onError;
