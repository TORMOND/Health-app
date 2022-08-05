import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
   
    component: function () {
      return import( '../views/SignUpPage.vue')
    }
  },
  {
    path: '/NavigationPage',
    name: 'NavigationPage',
   
    component: function () {
      return import( '../views/NavigationPage.vue')
    }
  },
  
  
  {
    path: '/AdminPage',
    name: 'AdminPage',
   
    component: function () {
      return import( '../views/AdminPage.vue')
    }
  },
  {
    path: '/Settings',
    name: 'Settings',
   
    component: function () {
      return import( '../views/Settings.vue')
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
