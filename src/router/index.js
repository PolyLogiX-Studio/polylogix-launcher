import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Projects',
    children: [
      {
        name: "Home-Index",
        path: "Index",
        alias: "",
        component: () => import("../views/Home/Index.vue")
      },
      {
        name: "Home-Second",
        path: "Second",
        component: () => import("../views/Home/Second.vue")
      }
    ],
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/Servers',
    name: 'Servers',
    component: () => import('../views/Servers.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
export default router
