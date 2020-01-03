/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const Routers = {
  path: '/ManageCustomer',
  component: Layout,
  redirect: '/ManageCustomer/CustomerData/customer-info',
  name: 'ManageCustomer',
  meta: {
    title: '顾客管理',
    icon: 'user'
  },
  children: [
    // 顾客档案
    {
      path: 'CustomerData',
      component: () => import('@/view/ManageCustomer/ManageCustomer'),
      name: 'CustomerData',
      redirect: '/ManageCustomer/CustomerData/customer-info',
      meta: {
        title: '顾客档案'
      },
      children: [{
        path: 'customer-info',
        name: 'customer-info',
        component: () => import('@/view/ManageCustomer/ManageCustomer/index01'),
        meta: {
          title: '顾客档案'
        }
      },
      {
        path: 'customer-transfer',
        name: 'customer-transfer',
        component: () => import('@/view/ManageCustomer/ManageCustomer/transfer-manage'),
        meta: {
          title: '顾客转让明细'
        }
      },
      {
        path: 'card-reissue',
        name: 'card-reissue',
        component: () => import('@/view/ManageCustomer/ManageCustomer/reissue-manage'),
        meta: {
          title: '补录卡管理'
        }
      }
      ]
    },
    // 新客管理
    {
      path: 'NewCustomerManage',
      component: () => import('@/view/ManageCustomer/NewCustomerManage/'),
      name: 'NewCustomerManage',
      redirect: '/ManageCustomer/NewCustomerManage/customer-set',
      meta: {
        title: '新客管理'
      },
      children: [{
        path: 'customer-set',
        name: 'customer-set',
        component: () => import('@/view/ManageCustomer/NewCustomerManage/index01'),
        meta: {
          title: '新客登记'
        }
      }

      ]
    }

  ]
}

export default Routers
