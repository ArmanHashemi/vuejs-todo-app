import home from '@/home/ui/Home.vue'

export default {
  routes: [
    { path: "/", query: { filter: 'all'}  , name: "home", component: home },
  ],
};
