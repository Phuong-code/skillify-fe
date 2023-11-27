import React from 'react';
import { useLocation } from 'react-router-dom';
import UserSearchResultComponent from '../components/userDetails/UserSearchResultComponent';
import DefaultLayout from '../components/layout/defaultLayout';

const UserSearchResult = () => {
  const location = useLocation();
  const { searchResult } = location.state;

  console.log(searchResult);

  return (
    <DefaultLayout>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          {searchResult.map((user) => (
            <UserSearchResultComponent user={user} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserSearchResult;
