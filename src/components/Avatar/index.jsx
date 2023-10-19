import React from 'react';
import { PlebLogo } from '../svgs';
import styles from './avatar.module.css';

const divide = (number1, number2) => Number((number1 / number2).toFixed(2));

const getLargeAvatarBadgeProps = (avatarWidth) => {
  // divide by 2 otherwise badge is too large
  avatarWidth = divide(avatarWidth, 2);
  // badge width including border is 1/2 of avatar width
  const badgeWidth = divide(avatarWidth, 2);
  // badge width without border is 1/3 of avatar width
  const badgeWidthWithoutBorder = divide(avatarWidth, 3);
  const badgeBorderWidth = divide(badgeWidth - badgeWidthWithoutBorder, 2);
  // 2 is arbitrary number that seems to align with the border of the circle
  const badgeBottom = 2;
  return { badgeBorderWidth, badgeWidth, badgeBottom };
};

const getSmallAvatarBadgeProps = (avatarWidth) => {
  // badge width including border is 1/2 of avatar width
  const badgeWidth = divide(avatarWidth, 2);
  // badge width without border is 1/3 of avatar width
  const badgeWidthWithoutBorder = divide(avatarWidth, 3);
  const badgeBorderWidth = divide(badgeWidth - badgeWidthWithoutBorder, 2);
  // badge bottom is inverse of badge border width
  const badgeBottom = -badgeBorderWidth;
  return { badgeBorderWidth, badgeWidth, badgeBottom };
};

const getAvatarBadgeProps = (avatarWidth) => {
  if (avatarWidth > 50) {
    return getLargeAvatarBadgeProps(avatarWidth);
  }
  return getSmallAvatarBadgeProps(avatarWidth);
};

const Avatar = (props) => {
  const { badge, avatar, width, height, isOnline, style, loading, className } = props;
  const { badgeBorderWidth, badgeWidth, badgeBottom } = getAvatarBadgeProps(width);

  return (
    <div
      style={{
        width,
        height,
        ...style,
      }}
      className={[styles.wrapper, className].join(' ')}
      isLoading={loading}
    >
      <>
        {avatar ? (
          <div
            className={styles.avatar_wrap}
            style={{
              backgroundImage: `url(${avatar})`,
            }}
          />
        ) : (
          <PlebLogo className={styles.avatar_wrap} />
        )}
      </>
      {badge && (
        <div
          className={styles.badge}
          style={{
            borderWidth: badgeBorderWidth,
            borderColor: '#fff',
            background: isOnline ? '#46d160' : 'red',
            width: badgeWidth + 'px',
            height: badgeWidth + 'px',
            bottom: badgeBottom + 'px',
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
