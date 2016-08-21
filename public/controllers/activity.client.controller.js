/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('ActivityController', ['$scope', 'ActivityService', '$uibModal', 'CONFIGS', ActivityController]);

function ActivityController($scope, ActivityService, $uibModal, CONFIGS) {

  var vm = $scope.vm = {};

  vm.CONFIGS = CONFIGS;

  $scope.dataList = [];

  $scope.payload = {};

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  // 列表

  $scope.loadNews = function(s) {
    var con;
    if (s) {
      con = s;
    } else {
      con = {
        page: 1,
        num: 10
      }
    }
    $scope.maxSize = 10;

    ActivityService.list(con).then(
      function(data) {
        $scope.totalItems = data.count;
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
  $scope.currentPage = 1;
  vm.search = function(val) {
    if (val === true) {
      $scope.currentPage = 1;
    }
    var payload = angular.copy($scope.vm.filters);
    var cons = {
      filters: payload || null,
      keywords: $scope.vm.keywords || null,
      page: $scope.currentPage,
      num: 10
    };

    $scope.loadNews(cons);
  };


  // 新增
  $scope.add = function(len) {
    $uibModal.open({
      templateUrl: 'views/temptate/user/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance) {
        $scope.title = "新增用户";
        $scope.vm = {};
        $scope.CONFIGS = CONFIGS;
        $scope.vm.sex = CONFIGS.sexType[0].value;
        $scope.vm.type = CONFIGS.sexType[1].value;
        $scope.vm.role = CONFIGS.sexType[1].value;

        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          ActivityService.save($scope.vm).then(function(data) {
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
      $scope.dataList.push(item.data);
    });
  };

  // 查看
  $scope.find = function(list) {
    $uibModal.open({
      templateUrl: 'views/temptate/user/find.html',
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
      templateUrl: 'views/temptate/user/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance) {
        $scope.vm = {};
        $scope.CONFIGS = CONFIGS;
        ActivityService.detail(id).then(function(data) {
          $scope.title = "修改用户";
          $scope.vm = data.data;
        }, function(err) {
          console.log(err);
        });
        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          ActivityService.put(id, $scope.vm).then(function(data) {
            $uibModalInstance.close($scope.vm);
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
      templateUrl: 'views/temptate/user/delete.html',
      controller: function($scope, $uibModalInstance) {
        $scope.sub = function() {
          ActivityService.del(id).then(function(data) {
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
