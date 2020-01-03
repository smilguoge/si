/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const Routers = {
  path: '/ManageHr',
  component: Layout,
  redirect: '/ManageHr/StaffManage/employee-data',
  name: 'ManageHr',
  meta: {
    title: '人事管理',
    icon: 'list'
  },
  children: [
    // 【员工管理】
    {
      path: 'StaffManage',
      component: () => import('@/view/ManageHr/StaffManage'),
      name: 'StaffManage',
      redirect: '/ManageHr/StaffManage/employee-data',
      meta: {
        title: '员工管理'
      },
      children: [{
        path: 'employee-data',
        name: 'employee-data',
        // redirect: '/ManageHr/StaffManage/employee-data/newAdd',
        component: () => import('@/view/ManageHr/StaffManage/employee-data'),
        meta: {
          title: '员工档案'
        }
        // children: [
        //   {
        //     path: 'newAdd',
        //     component: () => import('@/view/ManageHr/newAdd/index'),
        //     name: 'newAdd',
        //     meta: {
        //       title: '新增'
        //     }
        //   }
        // ]
      },
      {
        path: 'leave-manage',
        name: 'leave-manage',
        component: () => import('@/view/ManageHr/StaffManage/index02'),
        meta: {
          title: '离职管理'
        }
      }
      ]
    },
    // 【排班考勤】
    {
      path: 'SchedulingAttendance',
      component: () => import('@/view/ManageHr/SchedulingAttendance/'),
      name: 'SchedulingAttendance',
      redirect: '/ManageHr/SchedulingAttendance/schedu-set',
      meta: {
        title: '排班考勤'
      },
      children: [{
        path: 'schedu-set',
        name: 'schedu-set',
        component: () => import('@/view/ManageHr/SchedulingAttendance/index01'),
        meta: {
          title: '排班设置'
        }
      },
      {
        path: 'schedu-detail',
        name: 'schedu-detail',
        component: () => import('@/view/ManageHr/SchedulingAttendance/index02'),
        meta: {
          title: '考勤明细'
        }
      },
      {
        path: 'schedu-Shifts',
        name: 'schedu-Shifts',
        component: () => import('@/view/ManageHr/SchedulingAttendance/scheduShifts'),
        meta: {
          title: '班次管理'
        }
      },
      {
        path: 'schedu-Affirm',
        name: 'schedu-Affirm',
        component: () => import('@/view/ManageHr/SchedulingAttendance/scheduAffirm'),
        meta: {
          title: '考勤确认'
        }
      }
      ]
    }
    // 新增

  ]
}

export default Routers
