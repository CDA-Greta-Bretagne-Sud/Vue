import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blue from "@/views/Blue";
import Red from "@/views/Red";
import Couleur from "@/components/couleur";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Blue',
    name: 'Blue',
    component: Blue
  },
  {
    path: '/Red',
    name: 'Red',
    component: Red
  },
  {
    path: '/couleur/:name',
    component: Couleur
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
