/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('UserController', ['$scope', 'UserService', '$uibModal', 'CONFIGS', UserController]);

function UserController($scope, UserService, $uibModal, CONFIGS) {

  var vm = $scope.vm = {};

  vm.CONFIGS = CONFIGS;

  $scope.dataList = [];

  $scope.payload = {};

  // 列表

  $scope.loadNews = function(s) {
    var con;
    if (s) {
      con = s;
    } else {
      con = {
        page: $scope.currentPage - 1,
        num: 10
      }
    }
    $scope.maxSize = 10;
    // 给list赋值con

    UserService.list().then(
      function(data) {
        $scope.totalItems = 614;
        $scope.dataList = data.data;
      },
      function(err) {
      }
    );
  };

  $scope.loadNews();

  vm.statusSexName = function(value) {
    var status = _.find(CONFIGS.sexType, {value: value});
    if (status) {
      return status.text;
    }
    return '';
  };

  vm.statusTypeName = function(value) {
    var status = _.find(CONFIGS.userType, {value: value});
    if (status) {
      return status.text;
    }
    return '';
  };

  vm.statusRoleName = function(value) {
    var status = _.find(CONFIGS.roleType, {value: value});
    if (status) {
      return status.text;
    }
    return '';
  };
  // 搜索
  vm.search = function() {
    var payload = angular.copy($scope.vm.filters);
    var cons = {
      filters: payload || null,
      keywords: $scope.vm.keywords || null,
      page: $scope.currentPage - 1,
      num: 10
    };

    $scope.loadNews(cons);
  };


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

        $scope.cancel = function() {
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
        $scope.cancel = function() {
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

        $scope.cancel = function() {
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
            $uibModalInstance.close(index);
          }, function(err) {
            console.log(err);
          });
        }
      }
    }).result.then(function(index) {
      $scope.dataList.splice(index, 1);
    });
  };


}
