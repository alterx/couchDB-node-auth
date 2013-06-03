"use strict"

angular.module("nimbleApp.directives", [])
    .directive("card", function () {
        return {
            restrict: 'E',
            templateUrl: 'views/components/card.html',
            replace: true
        };
    });
