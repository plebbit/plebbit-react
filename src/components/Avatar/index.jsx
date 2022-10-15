import { Avatar as Av, AvatarBadge } from '@chakra-ui/react';
import React from 'react';
import { PlebLogo } from '../svgs';

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
  const { badge, avatar, width, height, isOnline, bg, sx, ...rest } = props;
  const { badgeBorderWidth, badgeWidth, badgeBottom } = getAvatarBadgeProps(width);

  return (
    <>
      {badge ? (
        <Av
          icon={
            <PlebLogo
              style={{
                width: width,
                height: height,
              }}
            />
          }
          {...props}
          width={`${width}px`}
          height={`${height}px`}
          src={avatar}
          sx={sx}
          {...rest}
          bg={bg}
        >
          <AvatarBadge
            borderWidth={badgeBorderWidth}
            borderColor="#fff"
            bg={isOnline ? '#46d160' : 'red'}
            height={badgeWidth + 'px'}
            width={badgeWidth + 'px'}
            bottom={badgeBottom + 'px'}
            right={badgeBottom + 'px'}
            // overwrite the default transform value of AvatarBadge
            transform="translate(0px, 0px)"
          />
        </Av>
      ) : (
        <Av
          icon={<PlebLogo />}
          width={`${width}px`}
          height={`${height}px`}
          src={avatar}
          bg={bg || 'transparent'}
          sx={sx}
        />
      )}
    </>
  );
};

export default Avatar;
