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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/views/partials/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
