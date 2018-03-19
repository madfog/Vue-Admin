import dashboard from "../pages/dashboard.vue";
import NotFoundView from "../components/404.vue";
//import menuList from "../pages/sys/menu.vue";
//import role from "../pages/sys/role.vue";
//import resource from "../pages/sys/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
//import sysUser from "../pages/sys/user.vue";
import resetPwd from "../pages/resetPwd.vue";
//import rankApply from "../pages/manage/rankreq.vue";
import deviceList from "../pages/device/device_list.vue";
import deviceInfo from "../pages/device/device_info.vue";
import userList from "../pages/user/user_list.vue";
import userInfo from "../pages/user/user_info.vue";
import goodList from "../pages/good/good_list.vue";
import goodAdd from "../pages/good/good_add.vue";
import sysSet from "../pages/sys/setting.vue";
import binduser from "../pages/user/binduser.vue";
import checkuser from "../pages/user/checkuser.vue";
// Routes
const routes = [
  {path: '/login', component: login},
  {
    path: '/test', component: app, children: [
    {path: '*', component: NotFoundView}
  ]
  },
  {
    path: '', component: app, children: [
     {path: '/', component: dashboard},
    {path: '/resetPwd', component: resetPwd},
    
//    {path: '/sys/menuList', component: menuList},
//    {path: '/sys/roleList', component: role},
//    {path: '/sys/userList', component: sysUser},
//    {path: '/sys/userAdd', component: userAdd},
//    {path: '/sys/resource', component: resource},
//    {path: '/manage/rankapply', component: rankApply},
    {path: '/device/list', component: deviceList},
    {path: '/device/info', component: deviceInfo},
    {path: '/user/list', component: userList},
    {path: '/user/info', component: userInfo},
    {path: '/good/list', component: goodList},
    {path: '/good/add', component: goodAdd},
    {path: '/sys/set', component: sysSet},
    {path: '/user/bind', component: binduser},
    {path: '/user/check', component: checkuser},
  ]
  },
  {path: '*', component: NotFoundView}
]


export default routes

