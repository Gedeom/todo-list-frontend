import Vue, { onBeforeMount } from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Boards from '../views/Boards.vue'
import Board from '../views/Board.vue'
import store from '../store';

Vue.use(VueRouter)

async function isLoggedIn(to, from, next) {
  store.dispatch("auth/checkToken").then(()=> {
    next()
  }).catch(() => {
    next('/login');
  });
}

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Boards,
      beforeEnter: isLoggedIn
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: isLoggedIn
    },
    {
      path: '/board/:id',
      name: 'board',
      component: Board,
      beforeEnter: isLoggedIn
    },
   
  ]
})

export default router
