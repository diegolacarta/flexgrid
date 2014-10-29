'use strict';

/**
 * @ngdoc overview
 * @name flexgrid
 * @description
 * # flexgrid
 *
 * Main module of the application.
 */
angular
  .module('flexgrid', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/views/partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/grid', {
        templateUrl: './app/views/partials/grid.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
