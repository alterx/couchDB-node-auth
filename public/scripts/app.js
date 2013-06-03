'use strict';

angular.module('nimbleApp', ['dashboard', 'main', 'ui.bootstrap', 'nimbleApp.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
