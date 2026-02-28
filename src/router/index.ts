import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CategoryView from '@/views/CategoryView.vue';
import UserSettingsView from '@/views/UserSettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/user',
      name: 'accountProfile',
      component: UserSettingsView,
    },
    {
      path: '/user/secure',
      name: 'securityPassword',
      component: CategoryView,
    },
    {
      path: '/user/notifications',
      name: 'notifications',
      component: UserSettingsView,
    },
    {
      path: '/user/preferences',
      name: 'preferences',
      component: CategoryView,
    },
  ],
});

export default router;
