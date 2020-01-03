/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const Routers = {
  path: '/ManageGoods',
  component: Layout,
  redirect: '/ManageGoods/Goods/put-in-storage',
  name: 'ManageGoods',
  meta: {
    title: '货物管理',
    icon: 'component'
  },
  children: [
    // 【货品】
    {
      path: 'Goods',
      component: () => import('@/view/ManageGoods/Goods'),
      name: 'Goods',
      redirect: '/ManageGoods/Goods/put-in-storage',
      meta: {
        title: '货品管理'
      },
      children: [{
        path: 'put-in-storage',
        name: 'put-in-storage',
        component: () => import('@/view/ManageGoods/Goods/put-in-storage'),
        meta: {
          title: '入库'
        }
      },
      {
        path: 'put-out-storage',
        name: 'put-out-storage',
        component: () => import('@/view/ManageGoods/Goods/put-out-storage'),
        meta: {
          title: '出库'
        }
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: () => import('@/view/ManageGoods/Goods/index03'),
        meta: {
          title: '盘点'
        }
      },
      {
        path: 'int-out-detail',
        name: 'int-out-detail',
        component: () => import('@/view/ManageGoods/Goods/index04'),
        meta: {
          title: '出入库明细'
        }
      },
      {
        path: 'in-sales-save',
        name: 'in-sales-save',
        component: () => import('@/view/ManageGoods/Goods/index05'),
        meta: {
          title: '进销存'
        }
      },
      {
        path: 'arrears-detail',
        name: 'arrears-detail',
        component: () => import('@/view/ManageGoods/Goods/index06'),
        meta: {
          title: '欠款明细'
        }
      },
      {
        path: 'return-goods',
        name: 'return-goods',
        component: () => import('@/view/ManageGoods/Goods/index07'),
        meta: {
          title: '返品库'
        }
      },
      {
        path: 'consume-detail',
        name: 'consume-detail',
        component: () => import('@/view/ManageGoods/Goods/index08'),
        meta: {
          title: '耗材明细'
        }
      }
        // {
        //   path: 'index09',
        //   name: 'index09',
        //   component: () => import('@/view/ManageGoods/Goods/index09'),
        //   meta: {
        //     title: '效能明细分析'
        //   }
        // }
      ]
    },
    // 【资产】
    {
      path: 'Assets',
      component: () => import('@/view/ManageGoods/Assets'),
      name: 'Assets',
      redirect: '/ManageGoods/Assets/data-put-in',
      meta: {
        title: '资产管理'
      },
      children: [{
        path: 'data-put-in',
        name: 'data-put-in',
        component: () => import('@/view/ManageGoods/Assets/index01'),
        meta: {
          title: '资产档案入库'
        }
      },
      {
        path: 'data-clear',
        name: 'data-clear',
        component: () => import('@/view/ManageGoods/Assets/index02'),
        meta: {
          title: '盘点清理'
        }
      },
      {
        path: 'data-out-in',
        name: 'data-out-in',
        component: () => import('@/view/ManageGoods/Assets/index03'),
        meta: {
          title: '出入库明细'
        }
      },
      {
        path: 'data-effect',
        name: 'data-effect',
        component: () => import('@/view/ManageGoods/Assets/index04'),
        meta: {
          title: '资产效能'
        }
      }
      ]
    }

  ]
}

export default Routers
