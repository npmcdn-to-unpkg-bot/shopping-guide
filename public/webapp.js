/**
 * Created by youpeng on 16/8/4.
 */
"use strict";

var webapp = angular.module("webapp",['ngRoute']);


webapp.config([
    '$routeProvider',
    function ($routeProvider, $routeParams) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/user.html',
          controller: 'UserController'
        })
        .when('/user', {
          templateUrl: 'views/user.html',
          controller: 'UserController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);

