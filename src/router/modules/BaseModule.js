/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const Routers = {
  path: '/BaseModule',
  component: Layout,
  redirect: '/BaseModule/ProjectProduct/project-manage',
  name: 'BaseModule',
  meta: {
    title: '基础模块',
    icon: 'table'
  },
  children: [
    // {
    //   path: 'test',
    //   component: () => import('@/view/BaseModule/test'),
    //   name: 'ComplexTable',
    //   meta: { title: '基础模块二级导航01' }
    // },
    // {
    //   path: 'test2',
    //   component: () => import('@/view/BaseModule/test2'),
    //   name: 'ComplexTable2',
    //   meta: { title: '基础模块二级导航02' }
    // },

    // 【项目产品】
    {
      path: 'ProjectProduct',
      component: () => import('@/view/BaseModule/ProjectProduct'),
      name: 'ProjectProduct',
      redirect: '/BaseModule/ProjectProduct/project-manage',
      meta: {
        title: '项目产品'
      },
      children: [{
        path: 'project-manage',
        name: 'project-manage',
        component: () => import('@/view/BaseModule/ProjectProduct/project-manage'),
        meta: {
          title: '项目管理'
        }
      },
      {
        path: 'product-manage',
        name: 'product-manage',
        component: () => import('@/view/BaseModule/ProjectProduct/product-manage'),
        meta: {
          title: '产品管理'
        }
      },
      // {
      //   path: 'product-price',
      //   name: 'product-price',
      //   component: () => import('@/view/BaseModule/ProjectProduct/product-price'),
      //   meta: {
      //     title: '项目产品价格表'
      //   }
      // }
      ]
    },
    // 【设置管理】
    {
      path: 'SetManage',
      component: () => import('@/view/BaseModule/SetManage/'),
      name: 'SetManage',
      redirect: '/BaseModule/SetManage/base-set',
      meta: {
        title: '设置管理'
      },
      children: [{
        path: 'base-set',
        name: 'base-set',
        component: () => import('@/view/BaseModule/SetManage/base-set'),
        meta: {
          title: '基础设置字典'
        }
      },
      {
        path: 'store-set',
        name: 'store-set',
        component: () => import('@/view/BaseModule/SetManage/store-set'),
        meta: {
          title: '门店设置'
        }
      },
      {
        path: 'company-set',
        name: 'company-set',
        component: () => import('@/view/BaseModule/SetManage/company-set'),
        meta: {
          title: '公司设置'
        }
      },
      {
        path: 'department-set',
        name: 'department-set',
        component: () => import('@/view/BaseModule/SetManage/department-set'),
        meta: {
          title: '部门设置'
        }
      },
      {
        path: 'position-set',
        name: 'position-set',
        component: () => import('@/view/BaseModule/SetManage/position-set'),
        meta: {
          title: '职务管理'
        }
      },
      {
        path: 'warehouse-set',
        name: 'warehouse-set',
        component: () => import('@/view/BaseModule/SetManage/warehouse-set'),
        meta: {
          title: '仓库设置'
        }
      },
      {
        path: 'warehouse-shop-set',
        name: 'warehouse-shop-set',
        component: () => import('@/view/BaseModule/SetManage/warehouse-shop-set'),
        meta: {
          title: '院装仓库设置'
        }
      }
      ]
    },

    // 【促销设置】
    {
      path: 'SalesSet',
      component: () => import('@/view/BaseModule/SalesSet/'),
      name: 'SalesSet',
      redirect: '/BaseModule/SalesSet/activity-set',
      meta: {
        title: '促销设置'
      },
      children: [{
        path: 'activity-set',
        name: 'activity-set',
        component: () => import('@/view/BaseModule/SalesSet/activity-set'),
        meta: {
          title: '活动套餐设置'
        }
      },
      {
        path: 'vouchers-manage',
        name: 'vouchers-manage',
        component: () => import('@/view/BaseModule/SalesSet/vouchers-manage'),
        meta: {
          title: '券管理'
        }
      },
      {
        path: 'presenter-manage',
        name: 'presenter-manage',
        component: () => import('@/view/BaseModule/SalesSet/presenter-manage'),
        meta: {
          title: '赠送设置'
        }
      },
      {
        path: 'integral-set',
        name: 'integral-set',
        component: () => import('@/view/BaseModule/SalesSet/integral-set'),
        meta: {
          title: '积分设置'
        }
      }
      ]
    },
    // 【权限设置】
    {
      path: 'PermissionSet',
      component: () => import('@/view/BaseModule/PermissionSet'),
      name: 'PermissionSet',
      redirect: '/BaseModule/PermissionSet/auth-set',
      meta: {
        title: '权限设置'
      },
      children: [{
        path: 'auth-set',
        name: 'auth-set',
        component: () => import('@/view/BaseModule/PermissionSet/auth-set'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: 'store-allot',
        name: 'store-allot',
        component: () => import('@/view/BaseModule/PermissionSet/store-allot'),
        meta: {
          title: '门店管理分配'
        }
      },
      {
        path: 'auth-flow',
        name: 'auth-flow',
        component: () => import('@/view/BaseModule/PermissionSet/index02'),
        meta: {
          title: '审批流程'
        }
      },
      {
        path: 'auth-detail',
        name: 'auth-detail',
        component: () => import('@/view/BaseModule/PermissionSet/index03'),
        meta: {
          title: '审批明细'
        }
      }
      ]
    },
    // 【系统维护】
    {
      path: 'SystemSet',
      component: () => import('@/view/BaseModule/SystemSet'),
      name: 'SystemSet',
      redirect: '/BaseModule/SystemSet/sys-log',
      meta: {
        title: '系统维护'
      },
      children: [{
        path: 'sys-log',
        name: 'sys-log',
        component: () => import('@/view/BaseModule/SystemSet/index01'),
        meta: {
          title: '系统日志'
        }
      },
      {
        path: 'sms-set',
        name: 'sms-set',
        component: () => import('@/view/BaseModule/SystemSet/index02'),
        meta: {
          title: '短信设置'
        }
      }
      ]
    }
  ]
}

export default Routers
