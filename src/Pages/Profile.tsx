import { useAppSelector } from '@store/hooks'
import React from 'react'

const Profile = () => {
  const userFullInfo = useAppSelector(state => state.AuthSlice.user);
  return (
    <div>
      <h1>Account </h1>
      <ul>
        <li>{userFullInfo?.firstName}</li>
        <li>{userFullInfo?.lastName}</li>
        <li>{userFullInfo?.email}</li>
      </ul>
    </div>
  );
}

export default Profile
