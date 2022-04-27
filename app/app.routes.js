angular.module('appModule')
  .config(($locationProvider) => {
    $locationProvider.html5Mode(false);
  })
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('app', {
        url: '/home/:filter',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
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
    $urlRouterProvider.otherwise(function ($injector, $location) {
      var state = $injector.get('$state');
      if ($location.path() === '') {
        state.go('app', { filter: '' });
      } else { state.go('notFound'); }

      return $location.path();
    });
  });
