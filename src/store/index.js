import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import EmployeeApi from "@/api/ManageHr/EmployeeFiles"
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  mutations:{
    chage(state,data){
      state.option=data;
    }
  },
  state:{
    // 是否修改(员工档案)
    isEdit:null,
    // 下拉选项(员工档案)
    option:null,
    // 修改id(员工档案)
    editId:null,
    // 是否弹窗(员工档案)
    isTanc:false,
    // 是否显示儿子(员工档案)
    isComponent:false,
    // 修改id(顾客管理)
    isCustomerId:null,
    // 是否修改(顾客管理)
    isCustomer:null

   

  },
  actions:{
    changeOption(store,data){
      store.commit('chage',data)
    }
  
  }
})

export default store
