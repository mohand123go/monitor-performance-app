import Vue from 'vue';
import store from './store';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import NotFoundPageComponent from './pages/NotFoundPage.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import FilterComponent from './components/vue-components/Filter.vue';

angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

angular.module('appModule').filter('trust', ['$sce', function ($sce) {
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };
}]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});

angular.module('appModule')
  .config(($ngVueProvider) => {
    $ngVueProvider.setRootVueInstanceProps({
      store: store,
    });
  });
angular.module('appModule').directive('vFilter', (createVueComponent) => {
  return createVueComponent(Vue.component('filterComponent', FilterComponent));
});

angular.module('appModule').directive('vNotFoundPage', (createVueComponent) => {
  return createVueComponent(Vue.component('notFoundPageComponent', NotFoundPageComponent));
});
