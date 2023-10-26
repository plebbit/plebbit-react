import React from 'react';
import { RiFireFill } from 'react-icons/ri';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TiStarburstOutline } from 'react-icons/ti';
import { BsBoxArrowUp } from 'react-icons/bs';
import {
  MdOutlineViewStream,
  MdViewAgenda,
  MdOutlineTableRows,
  MdOutlineViewHeadline,
  MdTableRows,
  MdViewHeadline,
} from 'react-icons/md';
import DropDown from '../../DropDown';
import useStore from '../../../store/useStore';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './feedsort.module.css';

const FeedSort = ({ hideControl }) => {
  const { postStyle, setPostStyle, device } = useStore((state) => state);

  const sortType = useParams()?.sortType ?? 'hot';
  const location = useLocation();
  const navigate = useNavigate();
  const path =
    location?.key === 'default'
      ? location?.pathname
      : location?.pathname?.split('/')?.slice(0, -1).join('/');

  const sortList = [
    { name: 'Hot', link: 'hot', icon: RiFireFill },
    { name: 'New', link: 'new', icon: TiStarburstOutline },
    { name: 'Top', link: 'topAll', icon: BsBoxArrowUp },
  ];
  const postMode = [
    {
      label: 'card',
      icon: postStyle === 'card' ? MdViewAgenda : MdOutlineViewStream,
      active: MdOutlineViewStream,
    },
    {
      label: 'classic',
      icon: postStyle === 'classic' ? MdTableRows : MdOutlineTableRows,
      active: MdOutlineTableRows,
    },
    {
      label: 'compact',
      icon: postStyle === 'compact' ? MdViewHeadline : MdOutlineViewHeadline,
      active: MdOutlineViewHeadline,
    },
  ];

  const SelectedMode = postMode?.find((c) => c?.label === postStyle);
  const selectedSort = sortList?.find((x) => x?.link === sortType);

  return (
    <>
      {device !== 'mobile' ? (
        <>
          <div className={styles.wrapper}>
            <div className={styles.sort_wrapper}>
              {sortList?.map((list, index) => (
                <Link
                  key={index}
                  active={String(sortType === list?.link)}
                  className={styles.sort_item}
                  to={`${path}/${list?.link}`}
                >
                  <list.icon />
                  {list?.name}
                </Link>
              ))}
            </div>
            <div className={styles.sort_wrapper}>
              <div className={styles.sort_wrapper2}>
                <div className={styles.sort_wrapper3}>
                  <FiMoreHorizontal width="20px" height="20px" />
                </div>
              </div>
            </div>
            <div className={styles.sort_wrapper4}>
              {!hideControl && (
                <DropDown
                  caret
                  dropDownTitle={
                    <>
                      <div
                        className={styles.sort_wrapper}
                        style={{
                          color: '#878a8c',
                        }}
                      >
                        <SelectedMode.active />
                      </div>
                    </>
                  }
                  options={postMode}
                  onChange={(val) => setPostStyle(val?.label)}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.mobile_wrapper}>
          <div className={styles.mobile_wrapper2}>
            <div className={styles.mobile_sort}>
              <div className={styles.mobile_sort2}>
                <DropDown
                  caret
                  titleClass={styles.mobile_sort2_head}
                  dropDownTitle={<>{selectedSort?.name}</>}
                  options={sortList}
                  getOptionLabel={(val) => val?.name}
                  onChange={(val) => navigate(`${path}/${val?.link}`)}
                />
              </div>
            </div>
            {!hideControl && (
              <DropDown
                caret
                titleClass={styles.mobile_sort2_head}
                dropDownTitle={<SelectedMode.active className={styles.mobile_sort2_head_svg} />}
                options={postMode}
                onChange={(val) => setPostStyle(val?.label)}
                leftOffset="none"
                rightOffset="0px"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedSort;
