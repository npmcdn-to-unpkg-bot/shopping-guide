/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('UserController', ['$scope', 'UserService', '$uibModal', 'CONFIGS', UserController]);

function UserController($scope, UserService, $uibModal) {

  $scope.dataList = [];

  // 列表
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
      controller: function($scope, CONFIGS, $uibModalInstance) {
        $scope.vm = {};
        $scope.CONFIGS = CONFIGS;

        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          console.log($scope.vm);
          UserService.save($scope.vm).then(function(data) {
            $uibModalInstance.close(data);
          }, function(err) {
            console.log(err);
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    }).result.then(function(item) {
      $scope.dataList.push(item);
    });
  };

  // 查看
  $scope.find = function(list) {
    $uibModal.open({
      templateUrl: 'views/temptate/find_user.html',
      controller: function($scope, $uibModalInstance) {
        $scope.user = list;
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    })
  };


  // 编辑

  $scope.edit = function(id, index) {
    $uibModal.open({
      templateUrl: 'views/temptate/add_user.html',
      controller: function($scope, CONFIGS, $uibModalInstance) {
        $scope.vm = {};
          $scope.CONFIGS = CONFIGS;
          UserService.detail(id).then(function(data) {
            $scope.vm = data.data;
          }, function(err) {
            console.log(err);
          });
        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          console.log($scope.vm);
          UserService.put($scope.vm).then(function(data) {
            $uibModalInstance.close(data);
          }, function(err) {
            console.log(err);
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    }).result.then(function(item) {
      $scope.dataList[index] = item;
    });
  };


  // 删除

  $scope.del = function(id, index) {
    $uibModal.open({
      templateUrl: 'views/temptate/delete_user.html',
      controller: function($scope, $uibModalInstance) {
        $scope.sub = function() {
          UserService.del(id).then(function(data) {
            console.log(data);
            $uibModalInstance.close(data);
          }, function(err) {
            console.log(err);
          });
        }
      }
    }).result.then(function(item) {
      delete dataList[index];
    });
  };



}
