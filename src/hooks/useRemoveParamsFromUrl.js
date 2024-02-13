import { useLocation, useParams } from 'react-router-dom';

const useRemoveParamsFromUrl = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const paths = pathname.split('/');
  const lastSegment = paths[paths.length - 1];

  const updatedPathname = Object.values(params)?.filter(Boolean)?.includes(lastSegment)
    ? pathname.replace(/\/\w+$/, '')
    : pathname; // Remove the last segment, which is the sortType parameter.

  console.log(updatedPathname);
  return updatedPathname;
};

export default useRemoveParamsFromUrl;
