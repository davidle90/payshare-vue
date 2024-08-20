import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import GroupsIndex from '@/views/Groups/GroupsIndex.vue'
import GroupsCreate from '@/views/Groups/GroupsCreate.vue'
import FriendsIndex from '@/views/Friends/FriendsIndex.vue'
import AccountIndex from '@/views/Account/AccountIndex.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: { requiresAuth: false, showHeader: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, showHeader: true }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, showHeader: true }
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupsIndex,
      meta: { requiresAuth: true, showHeader: true }
    },
    {
      path: '/groups/create',
      name: 'groupsCreate',
      component: GroupsCreate,
      meta: { requiresAuth: true, showHeader: true }
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsIndex,
      meta: { requiresAuth: true, showHeader: true }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountIndex,
      meta: { requiresAuth: true, showHeader: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isLoggedIn) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
