import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/free",
    name: "free",
    component: () => import("../views/FreeTierPage.vue")
  },
  {
    path: "/pro",
    name: "pro",
    component: () => import("../views/ProTierPage.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
