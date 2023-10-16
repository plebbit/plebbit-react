import React, { useState } from 'react';
import styles from './subplebbit.module.css';
import {
  MdClose,
  MdDelete,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlinePanoramaWideAngleSelect,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { subStylingData } from '../../store/data';
import { Button2 } from '../../components/Button';
import ColorPicker from '../../components/ColorPicker';
import Input from '../../components/Input';
import { BsFillGridFill, BsFillSquareFill } from 'react-icons/bs';
import {
  useAccountSubplebbits,
  usePublishSubplebbitEdit,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import onChallengeVerification from '../../utils/onChallengeVerification';
import onError from '../../utils/onError';
import onChallenge from '../../utils/onChallenge';

const SubStyleSide = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const navigate = useNavigate();
  const [active, setActive] = useState('');
  const { subplebbitAddress, page } = useParams();
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;
  const subPlebbit = useSubplebbit({ subplebbitAddress: subplebbitAddress });
  const [data, setData] = useState({
    suggested: {
      ...subPlebbit?.suggested,
    },
  });

  const editSubplebbitOptions = {
    ...data,
    subplebbitAddress: subplebbitAddress,
    onChallenge,
    onChallengeVerification: (challengeVerification, comment) =>
      onChallengeVerification(
        challengeVerification,
        comment,
        () => {
          setData({});
          setLoading(false);
        },
        () => {
          setData({});
          setLoading(false);
        }
      ),
    onError,
  };

  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions);

  const handleSubPlebbitedit = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      logger('editSubplebbit', error, 'error');
      toast({
        title: 'Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const appearance = subStylingData[0];
  const structure = subStylingData[1];

  return (
    <div className={styles.app_wrapper}>
      <button className={styles.close_btn} onClick={() => navigate(-1)}>
        <MdClose />
      </button>
      <div>
        <section className={styles.app_container}>
          <button
            className={styles.nav_btn}
            onClick={() => (active === '' ? navigate(-1) : setActive(''))}
          >
            <MdOutlineArrowBackIosNew />
            <span>Back to mod tools</span>
          </button>
          {active === '' && (
            <>
              <div className={styles.app_container2}>
                <h1>{appearance?.name}</h1>
                {appearance?.children?.map((x) => (
                  <StyleItem item={x} key={x?.id} setActive={setActive} />
                ))}
              </div>
              <div>
                <Button2
                  className={styles.app_seperator}
                  onClick={async () => {
                    await setData({ features: {}, suggested: {} });
                    handleSubPlebbitedit();
                  }}
                >
                  Reset to default
                </Button2>
              </div>
              <div className={styles.app_container2}>
                <h1>{structure?.name}</h1>
                {structure?.children?.map((x) => (
                  <StyleItem item={x} key={x?.id} setActive={setActive} />
                ))}
              </div>
            </>
          )}
          {active === 'color' && (
            <ColorTheme subPlebbit={subPlebbit} setData={setData} data={data} />
          )}
          {active === 'banner' && (
            <BannerTheme subPlebbit={subPlebbit} setData={setData} data={data} />
          )}
          {active === 'nameAndIcon' && (
            <NameAndIcon subPlebbit={subPlebbit} setData={setData} data={data} />
          )}
          {active !== '' && (
            <div className={styles.style_submit}>
              <Button2
                style={{
                  backgroundColor: '#0079d7',
                  color: '#fff',
                }}
                onClick={handleSubPlebbitedit}
              >
                Save
              </Button2>
              <Button2
                onClick={() => {
                  setData({});
                  setActive('');
                }}
              >
                cancel
              </Button2>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SubStyleSide;

const StyleItem = ({ item, setActive }) => {
  return (
    <div
      className={styles.ac_item}
      onClick={() => !item?.disabled && setActive(item?.id)}
      disabled={item?.disabled}
    >
      <div className={styles.ac_item2}>
        <div className={styles.ac_item_text}>{item?.name}</div>
        <div className={styles.ac_item_icon}>
          <MdOutlineArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

const ColorTheme = ({ subPlebbit, setData, data }) => {
  return (
    <div className={styles.app_container2}>
      <h1>Color theme</h1>
      <p>These subplebbit styling options will also display in Plebbit apps.</p>
      <div className={styles.app_container3}>
        <h2>Theme Colors</h2>
        <ColorSelect
          label="Base"
          onChange={(val) =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                primaryColor: val?.hex,
              },
            })
          }
          color={data?.suggested?.primaryColor || '#0079d3'}
        />
        <ColorSelect
          label="Highlight"
          onChange={(val) =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                secondaryColor: val?.hex,
              },
            })
          }
          color={data?.suggested?.secondaryColor || '#0079d3'}
        />
      </div>
      <div className={styles.app_container3}>
        <h2>Body Background</h2>
        <ImageSelect
          label="Image"
          onChange={(e) =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                backgroundUrl: e?.target.value,
              },
            })
          }
          value={data?.suggested?.backgroundUrl}
          onDelete={() =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                backgroundUrl: '',
              },
            })
          }
        />
      </div>
    </div>
  );
};
const BannerTheme = ({ subPlebbit, setData, data }) => {
  return (
    <div className={styles.app_container2}>
      <h1>Banner</h1>
      <div className={styles.app_container3}>
        <h2>Banner Background</h2>
        <ImageSelect
          label="Image"
          onChange={(e) =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                bannerUrl: e?.target.value,
              },
            })
          }
          value={data?.suggested?.bannerUrl}
          onDelete={() =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                bannerUrl: '',
              },
            })
          }
        />
      </div>
    </div>
  );
};
const NameAndIcon = ({ subPlebbit, setData, data }) => {
  return (
    <div className={styles.app_container2}>
      <h1>Name & Icon</h1>
      <div className={styles.app_container3}>
        <h2>Subplebbit Icon</h2>
        <ImageSelect
          hideStyle
          label="Image"
          onChange={(e) =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                avatarUrl: e?.target.value,
              },
            })
          }
          value={data?.suggested?.avatarUrl}
          onDelete={() =>
            setData({
              suggested: {
                ...subPlebbit.suggested,
                avatarUrl: '',
              },
            })
          }
        />
      </div>
    </div>
  );
};

const ColorSelect = ({ onChange, color, label }) => {
  return (
    <div className={styles.color_select}>
      <div className={styles.color_select2}>
        <h3>{label}</h3>
        <ColorPicker
          popoverStyles={{
            right: '0px',
          }}
          onChange={onChange}
          color={color}
        />
      </div>
    </div>
  );
};
const ImageSelect = ({ onChange, value, label, onDelete, hideStyle }) => {
  return (
    <div className={styles.image_select}>
      <h3>{label}</h3>
      <Input value={value} onChange={onChange} placeholder="Enter Image url" />
      <div
        className={styles.image_select_img}
        style={{
          backgroundImage: `url(${value})`,
        }}
      >
        <div className={styles.inner}>
          <button onClick={onDelete}>
            <MdDelete />
          </button>
        </div>
      </div>
      {!hideStyle && (
        <div className={styles.image_select_style} disabled>
          <div className={styles.img_fill_style} active="true">
            <BsFillSquareFill />
            Fill
          </div>
          <div className={styles.img_fill_style}>
            <BsFillGridFill />
            Tile
          </div>
          <div className={styles.img_fill_style}>
            <MdOutlinePanoramaWideAngleSelect />
            Center
          </div>
        </div>
      )}
    </div>
  );
};
