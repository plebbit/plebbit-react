import React from 'react';
import Queues from './Queues';
import { subQueuesTabs, subUserMgmtTabs } from '../../../store/data';
import { useParams } from 'react-router-dom';
import UserManagement from './UserManagement';

const Overview = ({
  subPlebbit,
  role,
  loading,
  handleSubPlebbitedit,
  allowedSpecial,
  data,
  setData,
}) => {
  const { page } = useParams();
  return (
    <>
      {subQueuesTabs?.map((x) => x?.id)?.includes(page) ? (
        <Queues
          subPlebbit={subPlebbit}
          role={role}
          loading={loading}
          handleSubPlebbitedit={handleSubPlebbitedit}
          allowedSpecial={allowedSpecial}
          data={data}
          setData={setData}
        />
      ) : subUserMgmtTabs?.map((x) => x?.id)?.includes(page) ? (
        <UserManagement
          subPlebbit={subPlebbit}
          role={role}
          loading={loading}
          handleSubPlebbitedit={handleSubPlebbitedit}
          allowedSpecial={allowedSpecial}
          data={data}
          setData={setData}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Overview;
