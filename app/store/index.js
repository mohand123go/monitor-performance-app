import Vue from 'vue';
import Vuex from 'vuex';

import PerformanceModule from './performanceModule';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    performance: PerformanceModule,
  },
});
