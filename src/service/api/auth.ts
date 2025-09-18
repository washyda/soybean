import { request } from '../request';

/**
 * Login
 *
 * @param username UserName
 * @param password Password
 */
export function fetchLogin(username: string, password: string) {
  return request<Api.Auth.LoginToken>({
    data: {
      password,
      username
    },
    method: 'post',
    url: '/user/login'
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/user/info' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    data: {
      refreshToken
    },
    method: 'post',
    url: '/user/refresh_token'
  });
}
