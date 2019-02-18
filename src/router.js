import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Login from './views/Login.vue'
// import OAuthLogin from './views/OAuthLogin.vue'
import ShowCurrentOrder from "./components/order/ShowCurrentOrder";
import NewOrder from "./views/NewOrder";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/current/',
      name: 'order',
      component: ShowCurrentOrder
    },
    {
      path: '/taxi/order',
      name: 'orderATaxi',
      component: NewOrder
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/oauth/authorize',
    //   name: 'oauthLogin',
    //   component: OAuthLogin
    // },
    {
      path: '/422',
      name: 'UnprocessableEntity',
      component: () => import(/* webpackChunkName: "UnprocessableEntity" */ './views/UnprocessableEntity.vue'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue'),
    }
  ]
})
