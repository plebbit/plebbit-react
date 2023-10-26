import React from 'react';
import { useAccount, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import Avatar from '../Avatar';
import styles from './createpostbar.module.css';
import { Link, useNavigate } from 'react-router-dom';

const CreatePostBar = ({ address = '' }) => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const navigate = useNavigate();
  const currentPath = address ? `/p/${address}/submit` : '/submit';

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
      <input type="text" placeholder="Create Post" onFocus={() => navigate(currentPath)} />
    </div>
  );
};
export default CreatePostBar;
