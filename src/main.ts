import Vue from "vue";
import VueTailwind from 'vue-tailwind';
import App from "./App.vue";
import router from "./router";
import store from "./store";

import avaTheme from './theme';
import './utils/filters'

Vue.config.productionTip = false;

Vue.use(VueTailwind, avaTheme);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
