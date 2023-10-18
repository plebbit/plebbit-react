import React from 'react';
import { useAccount, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import Avatar from '../Avatar';
import styles from './createpostbar.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreatePostBar = () => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Link to="/profile">
        <Avatar
          avatar={authorAvatarImageUrl}
          width={38}
          height={38}
          style={{
            marginRight: '8px',
          }}
        />
      </Link>
      <input type="text" placeholder="Create Post" onFocus={() => navigate('submit')} />
    </div>
  );
};
export default CreatePostBar;
