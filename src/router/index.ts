import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Calendar from '../views/Calendar.vue';
import DateDetail from '../views/DateDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/calendar/:dateString?',
    name: 'Calendar',
    component: Calendar,
    props: route => ({
      dateString: route.params.dateString,
    }),
  },
  {
    path: '/date-detail/:dateString',
    name: 'DateDetail',
    component: DateDetail,
    props: route => ({
      dateString: route.params.dateString,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
