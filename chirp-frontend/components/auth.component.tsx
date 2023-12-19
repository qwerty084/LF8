import { useState, useEffect } from "react";
import ClientCookies from "js-cookie"
import jwtDecode from "jwt-decode";

export function useCreate(tokenObject: string) {
    if (ClientCookies.get('auth') !== undefined) {
      console.log("auth " + tokenObject)
      ClientCookies.remove('auth')
    }
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    ClientCookies.set('auth', tokenObject, { expires: expiryDate })
    console.log(tokenObject)
  }