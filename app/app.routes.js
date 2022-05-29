angular.module('appModule')
  .config(($locationProvider) => {
    $locationProvider.html5Mode(true);
  })
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('app', {
        url: '/?filter',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
        reloadOnSearch: false,
      })
      .state('team-performance', {
        url: '/team-performance',
        template: '<v-performance-page></v-performance-page>',
      })
      .state({
        name: 'notFound',
        url: '/404',
        template: '<v-not-found-page></v-not-found-page>',
      });
    $urlRouterProvider.otherwise(function ($injector) {
      var state = $injector.get('$state');
      state.go('notFound');
    });
  });
