import { useState, useEffect } from "react";
import ClientCookies from "js-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { env } from "@/env";

interface UserJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
  user: {
    id: number;
    username: string;
    email: string;
    status: string | null;
    bio: string | null;
    ip: string;
    avatar: string;
    groups: string[];
    config: {
      theme: string;
      chatDetails: boolean;
      chatSecurity: number;
      meetSecurity: number;
    };
  };
}

interface UserOject {
  id: number;
  username: string;
  email: string;
  status: string | null;
  bio: string | null;
  ip: string;
  avatar: string;
  groups: string[];
}

interface LocalConfigType {
  notifications: {
    sound: string;
    mute: number;
  };
  chat: {
    theme: string;
    details: boolean;
  };
  privacy: {
    meetInviteLevel: number;
    friendInviteLEvel: number;
  };
}

/**
 * Session management object that handles user authentication,
 * user data, and local configuration.
 *
 * Exports an object with properties for auth, user, and config.
 *
 * Auth provides functions to check authentication status,
 * create/remove auth cookies, etc.
 *
 * User handles loading user data from JWT token,
 * removing user data, and modifying user.
 *
 * Config loads config from localStorage, creates default config,
 * resets, removes, and modifies config data.
 */
export const session = {
  auth: {
    isAuthenticated: function (user: any, config: any) {
      if (!ClientCookies.get("auth")) {
        console.log("unauthorized error");
        //handle logout
        return false;
      }
      if (user.data === null) {
        user.createUser();
      }
      if (config.data === null) {
        if (!localStorage.getItem("config")) {
          config.createConfig();
        }
        config.getConfig();
      }
      return true;
    },
    createAuthCookie: function (tokenObject: string, refreshToken: string) {
      if (ClientCookies.get("auth") !== undefined) {
        ClientCookies.remove("auth");
        ClientCookies.remove("refresh_token");
      }
      var expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      ClientCookies.set("auth", tokenObject, { expires: expiryDate });
      ClientCookies.set("refresh_token", refreshToken, { expires: expiryDate });
      console.log("auth token set");
    },
    removeAuthCookie: function () {
      ClientCookies.remove("auth");
      ClientCookies.remove("refresh_token");
    },
  },
  user: {
    data: null as UserOject | null,
    createUser: function () {
      const jwt = ClientCookies.get("auth");
      if (!jwt) {
        return { status: 401, message: "Unauthorized, no JWT" };
      }
      try {
        const payload = jwtDecode<UserJwtPayload>(jwt);

        this.data = payload.user;
      } catch (error) {
        console.error("Failed to decode JWT", error);
      }
    },
    removeUser: function () {
      this.data = null;
    },
    refreshUser: async function (refreshToken: string) {
      console.log("refreshing user");
      let url = `${env.API_URL}/token/refresh`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `refresh_token=${refreshToken}`
      });

      if (response.ok) {
        let jsonResponse = await response.json();
        session.auth.createAuthCookie(jsonResponse.token, jsonResponse.refresh_token);
        session.user.createUser()
      } else {
        console.error('Failed to refresh token');
      }
    },
  },

  config: {
    data: null as LocalConfigType | null,

    getConfig: function () {
      const localConfig = localStorage.getItem("config");

      if (localConfig) {
        this.data = JSON.parse(localConfig) as LocalConfigType;
      } else {
        console.log("No local configuration found");
      }
    },

    createConfig: function () {
      localStorage.setItem("config", JSON.stringify(env.defaultConfig));
    },

    resetConfig: function () {
      this.data = env.defaultConfig;
    },

    removeConfig: function () {
      this.data = null;
    },
    modifyConfig: function (category: string, key: string, value: any) {
      const localConfig = localStorage.getItem("config");

      // Check if localConfig is not null before parsing it
      if (localConfig) {
        const configObject = JSON.parse(localConfig);

        // Use the key to update the corresponding value in the config object
        if (configObject[category]) {
          configObject[category][key] = value;
        } else {
          console.log(`Category ${category} not found in config`);
        }

        // Stringify the updated config object
        const updatedConfig = JSON.stringify(configObject);

        // Store the updated config object back in localStorage
        localStorage.setItem("config", updatedConfig);
      } else {
        console.log("No local configuration found");
      }
    },
  },
};
