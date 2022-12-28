import React from 'react';
import { FaBell } from 'react-icons/fa';
import Layout from '../../components/layout';

const Notifications = () => {
  return (
    <Layout name={{ label: 'Notifications', value: 'sdaadjakdnan', icon: <FaBell /> }}>
      <div>Notifications</div>
    </Layout>
  );
};

export default Notifications;
