import Vue from 'vue'
import VueRouter from 'vue-router'
// import router modules
import UserRoutes from './userRoutes'
import BotRoutes from './botRoutes'
// imports
import SignUp from '../views/global/login/SignUp.vue'
import LogIn from '../views/global/login/LogIn.vue'

Vue.use(VueRouter)

function loggedInRedirectHome(to, from, next) {
  if (localStorage.token) {
    next('/');
  } else {
    next();
  }
}

const baseRoutes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    beforeEnter: loggedInRedirectHome
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
    beforeEnter: loggedInRedirectHome
  },
];

const routes = baseRoutes.concat(
  UserRoutes,
  BotRoutes
  );
export default new VueRouter({
  routes,
});

//export default router
