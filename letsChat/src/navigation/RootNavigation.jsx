import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'
import useSocket from '../hooks/useSocket'
import { useSelector } from 'react-redux'


const RootNavigation = () => {

  const { user } = useSelector(state => state.auth);
  // console.log(user.data.userId);

  // user might be null, so safely create userForSocket or pass null
  const userForSocket = user?.data
    ? {
        _id: user.data.userId,
        token: user.data.token,
      }
    : null;


  useSocket(userForSocket);



  const isLoggedIn = false;

  return (
    <NavigationContainer>
      {
        user ?
          <AppNavigation />
             :
          <AuthNavigation />
      }
    </NavigationContainer>
  )
}

export default RootNavigation