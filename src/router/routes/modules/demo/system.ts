import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'processing',
      name: 'Processing',
      meta: {
        roles: [RoleEnum.Developer],
        title: '处理单元',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/sys/processing/index.vue'),
    },

    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        roles: [RoleEnum.Admin],
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/demo/system/account/index.vue'),
    },
    {
      path: 'vxeTableAccount',
      name: 'VxeTableAccountManagement',
      meta: {
        roles: [RoleEnum.Admin],
        title: t('routes.demo.system.vxeTableAccount'),
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/demo/system/vxe-account/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        roles: [RoleEnum.Admin],
        hideMenu: true,
        title: t('routes.demo.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('@/views/demo/system/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        roles: [RoleEnum.Admin],

        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/demo/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        roles: [RoleEnum.Admin],

        title: t('routes.demo.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/demo/system/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        roles: [RoleEnum.Admin],

        title: t('routes.demo.system.dept'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/demo/system/dept/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        roles: [RoleEnum.Admin],

        title: t('routes.demo.system.password'),
        ignoreKeepAlive: true,
      },
      component: () => import('@/views/demo/system/password/index.vue'),
    },
  ],
};

export default system;
