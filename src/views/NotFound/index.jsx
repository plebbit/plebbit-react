import React from 'react';
import { Link } from 'react-router-dom';
import { PlebLogo } from '../../components/svgs';

const NotFound = () => {
  return (
    <div
      style={{
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '200px',
          borderRadius: 'full',
          height: '200px',
        }}
      >
        <PlebLogo />
      </div>
      <div
        style={{
          fontWeight: '700',
          marginTop: '10px',
        }}
      >
        <h3>Something went wrong</h3>
      </div>
      <Link to="/">
        <div
          style={{
            textDecoration: 'underline',
            color: 'blue',
          }}
        >
          Go Home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
