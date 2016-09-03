/**
 * Created by youpeng on 16/8/17.
 */
angular.module('webapp')
  .controller('AdminController', ['$window', '$scope', 'AdminService', '$cookies', '$location', 'toastr', AdminController]);

function AdminController($window, $scope, AdminService, $cookies, $location, toastr) {

  $scope.user = {};

  // 检测token
  if ($cookies.get('token')) {
    AdminService.get_user_by_token({token: $cookies.get('token')}).then(
      function(data) {
        if ($cookies.get('role') == 0) {
          $location.path('user');
        }
        if ($cookies.get('role') == 2) {
          $location.path('shop');
        }

        if ($cookies.get('role') == 1) {
          $location.path('merchantsettked');
        }


      },
      function(err) {
      }
    );
  }

  // 登录
  $scope.login = function() {
    AdminService.save($scope.user).then(
      function(data) {
        if (data.role == 0) {
          $location.path('user');
        }
        if (data.role == 2) {
          $location.path('shop');
        }
        if (data.role  == 1) {
          $location.path('merchantsettked');
        }
      },
      function(err) {
        if (err.err == 1) {
          toastr.error(err.msg, "操作失败");
        }
      }
    );
  };

}
