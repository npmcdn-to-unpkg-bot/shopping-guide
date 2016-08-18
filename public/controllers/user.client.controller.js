/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('UserController', ['$scope', 'UserService', '$uibModal', UserController]);

function UserController($scope, UserService, $uibModal) {
  console.log($uibModal);
  $scope.dataList = [];

  // 查看
  $scope.loadNews = function() {
    UserService.list().then(
      function(data) {
        $scope.dataList = data.data;
      },
      function(err) {
      }
    );
  };

  $scope.loadNews();


  // 新增

  $scope.add = function() {
    $uibModal.open({
      templateUrl: 'views/temptate/add_user.html',
      controller: function($scope) {
        $scope.vm = {};

        // 0：超级管理员
        // 1：普通用户
        // 2：商户
        $scope.userType = [
          {
            text: '超级管理员', value: 0
          },
          {
            text: '普通用户', value: 1
          },
          {
            text: '商户', value: 2
          }
        ];


        $scope.roleType = [
          {
            text: '超级管理员', value: 0
          },
          {
            text: '普通用户', value: 1
          },
          {
            text: '商户', value: 2
          }
        ];

        $scope.sexType = [
          {
            text: '男', value: 0
          },
          {
            text: '女', value: 1
          }
        ];


        $scope.save = function() {
          console.log($scope.vm);
          UserService.save($scope.vm).then(function(data) {
            console.log(data);
          }, function(err) {
            console.log(err);
          });
        }

      }
    }).result.then(function(item) {
      console.log(item);
      // vm.list.push(item);
    });
  }


}
