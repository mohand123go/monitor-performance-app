angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.filterEmployee = [];
  homePageVm.filterQueryString = '';
  homePageVm.pageNumber = null;
  homePageVm.isLoading = false;
  homePageVm.lastPageNumber = null;

  homePageVm.handleFilterEvent = function (employees, queryString) {
    if (queryString) {
      $location.search('filter', queryString);
      homePageVm.filterQueryString = queryString;
    } else $location.search({});

    homePageVm.filterEmployee = employees;
  };
  homePageVm.handleLoadMoreEmployees = function () {
    homePageVm.isLoading = true;
    loadMoreEmployees(homePageVm.pageNumber + 1);
  };

  activate();
  if ($location.search().filter) {
    homePageVm.filterQueryString = $location.search().filter;
  }
  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.pageNumber = data.current_page;
        homePageVm.lastPageNumber = data.pages;
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.filterEmployee = homePageVm.employees;
        homePageVm.isLoading = false;
      });
  }

  function loadMoreEmployees(pageNumber) {
    Employees.loadMoreEmployees(pageNumber)
      .then(({ data }) => {
        homePageVm.pageNumber = data.current_page;
        homePageVm.lastPageNumber = data.pages;
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.filterEmployee = homePageVm.employees;
        homePageVm.isLastPage = data.current_page === data.pages;
        homePageVm.isLoading = false;
      });
  }
}
