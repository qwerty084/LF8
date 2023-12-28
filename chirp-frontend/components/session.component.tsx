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
    avatar: string,
    config: {
      theme: string,
      chatDetails: boolean,
      chatSecurity: number,
      meetSecurity: number,
    }
  }
}

interface UserType {
  id: number,
  username: string,
  email: string,
  status: string | null,
  bio: string | null,
  ip: string,
  avatar: string,
  config: {
    theme: string,
    chatDetails: boolean,
    chatSecurity: number,
    meetSecurity: number,
  }
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

      // Add currently static properties to the user object
      payload.user.avatar = "assets/my.png";
      payload.user.config = {
        theme: "dark",
        chatDetails: true,
        chatSecurity: 1,
        meetSecurity: 1,
      }
      
      // Fill it into the user const
      setUser(payload.user);

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if auth cookie exists
    console.log("coockie check")
    if (ClientCookies.get('auth')) {
      // Check if user object exists
      console.log("user object check")
      if (!user) {
        // If user object does not exist, create a new one
        useCreate.user(setUser);
        setLoading(false)
      }
      setLoading(false)
    }
    setLoading(false)
  }, []);

  // If auth cookie exists and user object exists, return true
  const isAuthenticated = ClientCookies.get('auth') && user;

  return { isAuthenticated, user, loading };
};

