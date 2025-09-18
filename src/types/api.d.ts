/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** querySearch */
      querySearch: string;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** 通用操作响应 */
    type CommonOperation = null;

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = 1 | 2;

    /** common record */
    type CommonRecord<T = any> = {
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record id */
      id: number;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      refreshToken: string;
      token: string;
    }

    interface UserInfo {
      buttons: string[];
      nickname: string;
      roles: Array<{
        roleCode: string;
        roleId: number;
        roleName: string;
      }>;
      userId: string;
      username: string;
    }

    type Info = {
      token: LoginToken['token'];
      userInfo: UserInfo;
    };
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@soybean-react/vite-plugin-react-router').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      home: import('@soybean-react/vite-plugin-react-router').LastLevelRouteKey;
      routes: string[];
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'querySearch' | 'size'>;

    /** role */
    type Role = Common.CommonRecord<{
      /** role description */
      description: string;
      /** id */
      id: number;
      /** role code */
      roleCode: string;
      /** role name */
      roleName: string;
      /** status */
      status: Api.Common.EnableStatus;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleCode' | 'roleName' | 'status'> & CommonSearchParams
    >;

    /** role add param */
    type RoleAddParams = Pick<Api.SystemManage.Role, 'description' | 'roleCode' | 'roleName' | 'status'>;

    /** role update param */
    type RoleUpdateParams = RoleAddParams & Pick<Api.SystemManage.Role, 'id'>;

    /** role delete params */
    type RoleDeleteParams = Array<React.Key>;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleCode' | 'roleName'>;

    /**
     * user gender
     * - 1: "unknown"
     * - 2: "male"
     * - 3: "female"
     */
    type UserGender = 1 | 2 | 3;

    /**
     * user status
     *
     * - 1: active
     * - 2: inactive
     * - 3: deleted
     */
    type UserStatus = 1 | 2;

    /** user add param */
    type UserAddParams = Pick<
      Api.SystemManage.User,
      'email' | 'gender' | 'nickname' | 'phone' | 'roles' | 'status' | 'username'
    >;

    /** user update param */
    type UserUpdateParams = UserAddParams & Pick<Api.SystemManage.User, 'id'>;

    /** user delete params */
    type UserDeleteParams = Array<React.Key>;

    /** user */
    type User = Common.CommonRecord<{
      /** user email */
      email: string;
      /** user gender */
      gender: UserGender;
      /** user nickname */
      nickname: string;
      /** user phone */
      phone: string;
      /** user role code collection */
      roles: string[];
      /** status */
      status: UserStatus;
      /** user name */
      username: string;
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'email' | 'gender' | 'nickname' | 'phone' | 'status'> & CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('@soybean-react/vite-plugin-react-router').RouteMeta,
      | 'activeMenu'
      | 'constant'
      | 'fixedIndexInTab'
      | 'hideInMenu'
      | 'href'
      | 'i18nKey'
      | 'keepAlive'
      | 'multiTab'
      | 'order'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** menu name */
      menuName: string;
      /** menu type */
      menuType: MenuType;
      /** parent menu id */
      parentId: number;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      children?: MenuTree[];
      id: number;
      label: string;
      pId: number;
    };
  }
}
