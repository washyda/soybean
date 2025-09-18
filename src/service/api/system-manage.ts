import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    method: 'get',
    params,
    url: '/role/list'
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    method: 'get',
    url: '/role/all'
  });
}

/** create user */
export function fetchAddRole(user: Api.SystemManage.RoleAddParams) {
  return request<Api.Common.CommonOperation>({
    data: user,
    method: 'POST',
    url: '/role/add'
  });
}

/** update user */
export function fetchEditRole(user: Api.SystemManage.RoleUpdateParams) {
  return request<Api.Common.CommonOperation>({
    data: user,
    method: 'POST',
    url: '/role/edit'
  });
}

/** delete role */
export function fetchDeleteRole(roleIds: Api.SystemManage.RoleDeleteParams) {
  return request<Api.Common.CommonOperation>({
    data: roleIds,
    method: 'DELETE',
    url: '/role/delete'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    method: 'get',
    params,
    url: '/user/list'
  });
}

/** create user */
export function fetchCreateUser(user: Api.SystemManage.UserAddParams) {
  return request<Api.Common.CommonOperation>({
    data: user,
    method: 'POST',
    url: '/user/add'
  });
}

/** update user */
export function fetchUpdateUser(user: Api.SystemManage.UserUpdateParams) {
  return request<Api.Common.CommonOperation>({
    data: user,
    method: 'POST',
    url: '/user/edit'
  });
}

/** delete user */
export function fetchDeleteUser(userIds: Api.SystemManage.UserDeleteParams) {
  return request<Api.Common.CommonOperation>({
    data: userIds,
    method: 'DELETE',
    url: '/user/delete'
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    method: 'get',
    url: '/systemManage/getMenuList/v2'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    method: 'get',
    url: '/systemManage/getAllPages'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    method: 'get',
    url: '/systemManage/getMenuTree'
  });
}
