/**
 * Created by youpeng on 16/8/4.
 */
"use strict";

var webapp = angular.module("webapp", ['ngRoute', 'ngCookies', 'ui.bootstrap', 'angularFileUpload', 'ui.tree', 'toastr']);


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
      .when('/typeManagement', {
        templateUrl: 'views/typeManagement.html',
        controller: 'TypeManagementController'
      })
      .when('/modify', {
        templateUrl: 'views/ModifyPassword.html',
        controller: 'ModifyController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]).config(UserInterceptor)
  .config(timestampMarker);

webapp.run(['$rootScope', '$cookies', '$location', function($rootScope, $cookies, $location) {
  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if ($cookies.get('nick_name')) {
      $rootScope.globals = {
        nick_name: $cookies.get('nick_name'),
        role: $cookies.get('role')
      };
      
      console.log($rootScope.globals);
    }

    $rootScope.loginOut = function() {
      $location.path('/');
      $cookies.remove('token');
      $cookies.remove('user_name');
      $cookies.remove('nick_name');
      $cookies.remove('role');
      $rootScope.globals = {
        nick_name: null,
        role: null
      };
    }
  });

}]);


function UserInterceptor($httpProvider) {
  $httpProvider.interceptors.push('UserInterceptor');
}

function timestampMarker($httpProvider) {
  $httpProvider.interceptors.push('timestampMarker');
}

