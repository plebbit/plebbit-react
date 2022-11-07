import { toast } from 'react-toastify';

const onError = (error) => {
  return toast.error(error?.message.toString(), {
    position: 'bottom-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

export default onError;
