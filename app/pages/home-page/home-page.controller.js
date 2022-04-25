angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.filterQueryString = '';

  homePageVm.handleFilterEvent = function (employees, queryString) {
    if (queryString) $location.search('filter', queryString);
    else $location.search({});
    homePageVm.employees = employees;
  };

  activate();
  if ($location.search().filter) {
    homePageVm.filterQueryString = $location.search().filter;
  }
  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
}
