import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Dmytro Sholka | Portfolio' }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { title: 'Dmytro Sholka | About' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { title: 'Dmytro Sholka | Contact' }
    }
  ]
})

export default router
