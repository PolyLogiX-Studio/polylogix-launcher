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
        component: () => import("../views/Projects/PolyLogiXLauncher.vue")
      },
      {
        name: "Home-HeadlessCore",
        path: "Headless",
        component: () => import("../views/Projects/HeadlessCore.vue")
      },
      {
        name: "Home-Gunlight",
        path: "Gunlight",
        component: () => import("../views/Projects/Gunlight.vue")
      },
      {
        name: "Home-NeosDB",
        path: "NeosDB",
        component: () => import("../views/Projects/NeosDB.vue")
      }
    ],
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/Servers',
    name: 'Servers',
    component: () => import('../views/Servers.vue')
  },{
    path: '/Worlds',
    name: 'Worlds',
    component: () => import('../views/Worlds.vue')
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
