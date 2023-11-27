import React, { useEffect } from 'react';
import UserDetailsComponent from '../components/userDetails/UserDetailsComponent';
import DefaultLayout from '../components/layout/defaultLayout';

const UserDetails = () => {
  useEffect(() => {
    document.title = 'Skillify - Profile';
  }, []);

  return (
    <DefaultLayout>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          <UserDetailsComponent />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserDetails;
