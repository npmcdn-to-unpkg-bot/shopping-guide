/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('ModifyController', ['$scope', 'AdminService', '$uibModal', 'CONFIGS', '$cookies', 'toastr', '$location', ModifyController]);

function ModifyController($scope, AdminService, $uibModal, CONFIGS, $cookies, toastr, $location) {

  var vm = $scope.vm = {};

  $scope.save = function(form) {
    if (form.$valid === false) {
      return false;
    }

    AdminService.put($cookies.get('user_name'), $scope.vm).then(function(data) {
      if (data.err == 0) {
        toastr.success('ok', "操作成功");
        $location.path('/');
        $cookies.remove('token');
        $cookies.remove('user_name');
        $cookies.remove('nick_name');
        $cookies.remove('role');
        $cookies.remove('id');
      }
    }, function(err) {
      if (err.err == 1) {
        toastr.error(err.msg, "操作失败");
      }
    });
  };
}
