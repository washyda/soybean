import type { BreadcrumbProps } from 'antd';
import type { ReactElement } from 'react';
import { Link, matchPath } from 'react-router-dom';

import BreadcrumbContent from './BreadcrumbContent';

type BreadcrumbItem = Required<BreadcrumbProps>['items'][number];

/**
 * 通过 index 获取 pathname 的前缀路径
 *
 * @param pathname 原始路径，例如 "/project/detail/edit"
 * @param index 要获取的第几个段（从0开始）
 * @returns 截取后的路径，例如 "/project/detail"
 */
export function getPathnameByIndex(pathname: string, index: number): string {
  const segments = pathname.split('/').filter(Boolean); // 去掉空项
  const sliced = segments.slice(0, index + 1);
  return `/${sliced.join('/')}`;
}

export function getBreadcrumbsByRoute(route: Router.Route, menus: App.Global.Menu[]): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  const pathname = route.pathname;

  let currentMenus = menus;

  let selectedKeys: string[] = [];

  for (let i = 1; i < route.matched.length; i += 1) {
    const matched = route.matched[i];

    const currentMenu = currentMenus.find(item => item?.key === matched?.pathname);

    if (!currentMenu) break;

    const prefixPath = getPathnameByIndex(pathname, i);

    const hasChildren = Array.isArray(currentMenu.children) && currentMenu.children.length > 0;

    const breadcrumbItem: BreadcrumbItem = {
      title: (
        <BreadcrumbContent
          hasChildren={hasChildren}
          icon={currentMenu.icon as ReactElement}
          label={currentMenu.label as ReactElement}
        />
      )
    };

    if (hasChildren) {
      // eslint-disable-next-line no-loop-func
      const flattenedChildren = currentMenu.children?.map(child => {
        const isMatch = matchPath(child.key, prefixPath);

        if (isMatch) {
          selectedKeys = [child.key];
        }

        return {
          icon: child.icon,
          key: child.key,
          label: isMatch ? child.label : <Link to={child.key}>{child.label}</Link>
        };
      });

      breadcrumbItem.menu = { items: flattenedChildren, selectedKeys };
    }

    breadcrumbs.push(breadcrumbItem);

    // 进入下层 children，继续递归用
    currentMenus = currentMenu.children || [];
  }

  return breadcrumbs;
}
