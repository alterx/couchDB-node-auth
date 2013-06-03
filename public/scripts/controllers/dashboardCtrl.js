'use strict';

angular.module('dashboard', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl:'views/dashboard.html',
    controller:'DashboardCtrl',
  });
}])

.controller('DashboardCtrl', ['$scope', function ($scope) {
  var project = { 
    name : 'SIGET',
    issues : [
      { title: 'SIGET001', estimate: '1h', assignee: 'Carlos Vega', status: 'done' },
      { title: 'SIGET002', estimate: '1h', assignee: 'Carlos Vega', status: 'todo' },
      { title: 'SIGET003', estimate: '1h', assignee: 'Carlos Vega', status: 'ready' },
      { title: 'SIGET004', estimate: '1h', assignee: 'Carlos Vega', status: 'progress' }
    ],
    state: 'collapsed'
   };
  $scope.project = project; 

}]);