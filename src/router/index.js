import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
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
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Servers',
    name: 'Servers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Servers.vue')
  }
]

const router = new VueRouter({
  routes
})
export default router
