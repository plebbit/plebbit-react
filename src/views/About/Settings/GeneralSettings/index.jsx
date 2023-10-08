import React from 'react';
import styles from '../settings.module.css';
import { Button2 } from '../../../../components/Button';
import Header, { SubHeader } from '../../../../components/Text/Header';
import Input from '../../../../components/Input';

const GeneralSettings = ({ data, setData }) => {
  return (
    <>
      <Header title="Community Settings" />
      <SubHeader title="COMMUNITY PROFILE" />
      <Input
        title="Community name"
        placeholder="Enter Community Name"
        maxLength={21}
        value={data?.title}
        onChange={(e) => setData({ ...data })}
      />
    </>
  );
};

export default GeneralSettings;
