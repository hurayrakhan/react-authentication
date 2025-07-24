// utils/jwtUtils.js
import {jwtDecode} from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

export const getExpiryTime = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return 0;
  return decoded.exp * 1000;
};
