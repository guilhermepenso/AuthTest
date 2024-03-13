import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const authenticateUser = async (email, password) => {
  const userPoolId = process.env.EXPO_PUBLIC_USER_POOL_ID;
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;

  console.log('UserPool ID: ', process.env.EXPO_PUBLIC_USER_POOL_ID);
  console.log('Client ID: ', process.env.EXPO_PUBLIC_CLIENT_ID);
  const userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
  });


  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        const accessToken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        resolve({ idToken, accessToken, refreshToken });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};


export const refreshSession = async () => {
  const refreshTokenString = await SecureStore.getItemAsync('refresh_token');
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID,
    ClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  });
  const user = userPool.getCurrentUser();

  if (user && refreshTokenString) {
    const refreshToken = new CognitoRefreshToken({ RefreshToken: refreshTokenString });
    user.refreshSession(refreshToken, (err, session) => {
      if (err) {
        console.error('Sessão expirada', err);
      } else {
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        SecureStore.setItemAsync('access_token', accessToken);
        SecureStore.setItemAsync('id_token', idToken);
      }
    });
  }
};

