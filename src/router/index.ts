import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Home from '../views/Home.vue';
import Calendar from '../views/Calendar.vue';
import DateDetail from '../views/DateDetail.vue';
import CalendarBodyDates from '../components/Calendar/CalendarBodyDates.vue';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Calendar' },
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
    component: Calendar,
    props: route => ({
      dateString: route.params.dateString,
      defaultValue: todayStr,
    }),
    children: [
      {
        name: 'Calendar',
        path: '',
        component: CalendarBodyDates,
      },
      {
        name: 'DateDetail',
        path: 'date-detail',
        component: DateDetail,
        props: route => ({
          dateString: route.params.dateString,
        }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
