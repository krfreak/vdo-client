import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/Game/Events.vue')
    },
    {
      path: '/armies',
      name: 'armies',
      component: () => import('../views/Game/Army/Army.vue')
    },
    {
      path: '/castle',
      name: 'castle',
      component: () => import('../views/Game/Castle.vue')
    },
    {
      path: '/diplomacy',
      name: 'diplomacy',
      component: () => import('../views/Game/Group/Diplomacy.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/Game/Events.vue')
    },
    {
      path: '/income',
      name: 'income',
      component: () => import('../views/Game/Income.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../views/Forum/Overview.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/Game/Map.vue')
    },
    {
      path: '/messaging',
      name: 'messaging',
      component: () => import('../views/Messaging.vue')
    },
    {
      path: '/nation',
      name: 'nation',
      component: () => import('../views/Game/Group/Group.vue')
    },
    {
      path: '/recruiting',
      name: 'recruiting',
      component: () => import('../views/Game/Army/Recruiting.vue')
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('../views/Game/Group/Management.vue')
    },
    {
      path: '/supplies',
      name: 'supplies',
      component: () => import('../views/Game/Group/Supplies.vue')
    },
    {
      path: '/hero',
      name: 'hero',
      component: () => import('../views/Game/Army/Hero.vue')
    },
    {
      path: '/nationforum',
      name: 'nationforum',
      component: () => import('../views/Forum/Overview.vue')
    },
    {
      path: '/rankings',
      name: 'rankings',
      component: () => import('../views/Game/Rankings.vue')
    },
    {
      path: '/messaging',
      name: 'messaging',
      component: () => import('../views/Messaging.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/Auth/Logout.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/Register.vue')
    },
    {
      path: '/agb',
      name: 'agb',
      component: () => import('../views/AGB.vue')
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('../views/Impressum.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/Privacy.vue')
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('../views/Game/Guide/Guide.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  if (authRequired && !authStore.isLoggedIn) {
    return {
      path: '/'
    }
  }
})

export default router
