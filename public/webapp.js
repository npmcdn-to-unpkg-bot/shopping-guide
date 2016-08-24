/**
 * Created by youpeng on 16/8/4.
 */
"use strict";

var webapp = angular.module("webapp", ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angularFileUpload']);


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
      .when('/merchant', {
        templateUrl: 'views/merchant.html',
        controller: 'MerchantController'
      })
      .when('/shop', {
        templateUrl: 'views/shopmanage.html',
        controller: 'ShopManageController'
      })
      .when('/activity', {
        templateUrl: 'views/activity.html',
        controller: 'ActivityController'
      })
      .when('/ad', {
        templateUrl: 'views/ad.html',
        controller: 'AdController'
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

