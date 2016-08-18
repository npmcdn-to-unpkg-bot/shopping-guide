/**
 * Created by youpeng on 16/8/4.
 */
"use strict";

var webapp = angular.module("webapp", ['ngRoute', 'ngCookies', 'ui.bootstrap']);


webapp.config([
  '$routeProvider',
  function($routeProvider, $routeParams) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]).config(UserInterceptor)
  .config(timestampMarker);

function UserInterceptor($httpProvider) {
  $httpProvider.interceptors.push('UserInterceptor');
}

function timestampMarker($httpProvider) {
  $httpProvider.interceptors.push('timestampMarker');
}
