/**
 * Created by youpeng on 16/8/17.
 */
angular.module('webapp')
  .controller('AdminController', ['$window', '$scope', 'AdminService', '$cookies', '$location', AdminController]);

function AdminController($window, $scope, AdminService, $cookies, $location) {

  $scope.user = {};

  // 检测token
  if ($cookies.get('token')) {
    AdminService.get_user_by_token({token: $cookies.get('token')}).then(
      function(data) {
        if (data.err === 0) {
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
          if ($cookies.get('role') == 1) {
            $location.path('user');
          }
          if ($cookies.get('role') == 2) {
            $location.path('shop');
          }
        }
      },
      function(err) {}
    );
  };

}
