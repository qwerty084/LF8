import { useState, useEffect } from 'react';
import ClientCookies from 'js-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface UserJwtPayload extends JwtPayload {
  iat: number,
  exp: number,
  user: {
    id: number,
    username: string,
    email: string,
    status: string | null,
    bio: string | null,
    ip: string,
  }
}

interface UserType {
  id: number,
  username: string,
  email: string,
  status: string | null,
  bio: string | null,
  ip: string,
}

export const useCreate = {
  auth: (tokenObject: string) => {
    if (ClientCookies.get('auth') !== undefined) {
      console.log("auth " + tokenObject);
      ClientCookies.remove('auth');
    }
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    ClientCookies.set('auth', tokenObject, { expires: expiryDate });
    console.log(tokenObject);
  },
  user: (setUser: any) => {
    // Get the auth cookie
    const jwt = ClientCookies.get('auth');

    if (!jwt) {
      return { status: 401, message: 'Unauthorized' };
    }

    try {
      // Decode the payload
      const payload = jwtDecode<UserJwtPayload>(jwt);

      // Fill it into the user const
      setUser(payload.user);

      console.log("user object created", payload.user);

      // After a success, return status code 200 and success as a message
      return { status: 200, message: 'Success', user: payload.user };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Server error' };
    }
  },
};

export const session = () => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    // Check if auth cookie exists
    if (ClientCookies.get('auth')) {
      // Check if user object exists
      if (!user) {
        // If user object does not exist, create a new one
        useCreate.user(setUser);
      }
    }
  }, []);

  // If auth cookie exists and user object exists, return true
  const isAuthenticated = ClientCookies.get('auth') && user;

  return { isAuthenticated, user };
};

