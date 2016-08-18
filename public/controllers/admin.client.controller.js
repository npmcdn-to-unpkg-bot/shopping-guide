/**
 * Created by youpeng on 16/8/17.
 */
angular.module('webapp')
  .controller('AdminController', ['$rootScope', '$scope', 'AdminService', '$cookies', '$location', AdminController]);

function AdminController($rootScope, $scope, AdminService, $cookies, $location) {

  $scope.user = {};

  // 检测token
  console.log($cookies.get('token'));
  if ($cookies.get('token')) {
    AdminService.get_user_by_token({token: $cookies.get('token')}).then(
      function(data) {
        console.log(data);
        if (data.err === 0) {
          $rootScope.userName = data.data.name;
          $rootScope.nickName = data.data.nick_name;
          $location.path('user');
        }
      },
      function(err) {}
    );
  }

  // 登录
  $scope.login = function() {
    AdminService.save($scope.user).then(
      function(data) {
        console.log(data);
        if (data.err === 0) {
          $location.path('user');
        }
      },
      function(err) {}
    );
  };
}
