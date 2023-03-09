import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/HomeView.vue";
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: "/chaussette/:id",
    name: "chaussette-details",
    component: () => import("../components/Chaussette.vue")
  },
  {
  path: "/ListeChaussettes",
  name: "liste-chaussette",
  component: () => import("../components/ChaussetteListe.vue")
},
  {
    path: "/ajout",
    name: "ajout",
    component: () => import("../components/AjoutChaussette.vue")
  },   {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    component: Profile
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
export default router
