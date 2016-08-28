/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('TypeManagementController', ['$scope', 'TypeService', '$uibModal', 'CONFIGS', TypeManagementController]);

function TypeManagementController($scope, TypeService, $uibModal, CONFIGS) {

  var vm = $scope.vm = {};

  vm.CONFIGS = CONFIGS;

  $scope.dataList = [];

  $scope.payload = {};

  function type_count(array, min_index, count) {
    var json = [];
    array = array.slice(min_index, count + min_index);

    var count = 0;

    angular.forEach(array, function(item, index) {
      if (index > count || index === 0) {
        var obj = item;
        if (item.children) {
          var map = type_count(array, index + 1, item.children);
          obj.list = map;
          count = index + item.children;
        }
        json.push(obj);
      }
    });

    return json;

  }

  // 列表

  $scope.loadNews = function(s) {
    TypeService.list().then(
      function(data) {
        var json = type_count(data.data, 0, data.data.length);
        console.log(json);
        $scope.data = json;

      },
      function(err) {
      }
    );
  };

  $scope.loadNews();


  $scope.remove = function(scope) {
    scope.remove();
  };

  $scope.toggle = function(scope) {
    scope.toggle();
  };

  $scope.moveLastToTheBeginning = function() {
    var a = $scope.data.pop();
    $scope.data.splice(0, 0, a);
  };

  $scope.newSubItem = function(scope) {
    var nodeData = scope.$modelValue;
    console.log(nodeData);
    if (!nodeData.list) {
      nodeData.list = [];
    }
    nodeData['list'].push({
      id: nodeData.id * 10 + nodeData.list.length,
      name: nodeData.name + '.' + (nodeData.list.length + 1),
      list: []
    });
  };


  // 新增
  // $scope.add = function(len) {
  //   $uibModal.open({
  //     templateUrl: 'views/temptate/user/add.html',
  //     controller: function($scope, CONFIGS, $uibModalInstance) {
  //       $scope.title = "新增用户";
  //       $scope.vm = {};
  //       $scope.CONFIGS = CONFIGS;
  //       $scope.vm.sex = CONFIGS.sexType[0].value;
  //       $scope.vm.type = CONFIGS.sexType[1].value;
  //       $scope.vm.role = CONFIGS.sexType[1].value;
  //
  //       $scope.save = function(form) {
  //         if (form.$valid === false) {
  //           return false;
  //         }
  //         UserService.save($scope.vm).then(function(data) {
  //           $uibModalInstance.close(data);
  //         }, function(err) {
  //           console.log(err);
  //         });
  //       };
  //
  //       $scope.cancel = function() {
  //         $uibModalInstance.dismiss('cancel');
  //       };
  //     }
  //   }).result.then(function(item) {
  //     $scope.dataList.push(item.data);
  //   });
  // };

  // 查看
  // $scope.find = function(list) {
  //   $uibModal.open({
  //     templateUrl: 'views/temptate/user/find.html',
  //     controller: function($scope, $uibModalInstance) {
  //       $scope.user = list;
  //       $scope.cancel = function() {
  //         $uibModalInstance.dismiss('cancel');
  //       };
  //     }
  //   })
  // };


  // 编辑

  // $scope.edit = function(id, index) {
  //   $uibModal.open({
  //     templateUrl: 'views/temptate/user/add.html',
  //     controller: function($scope, CONFIGS, $uibModalInstance) {
  //       $scope.vm = {};
  //       $scope.CONFIGS = CONFIGS;
  //       UserService.detail(id).then(function(data) {
  //         $scope.title = "修改用户";
  //         $scope.vm = data.data;
  //       }, function(err) {
  //         console.log(err);
  //       });
  //       $scope.save = function(form) {
  //         if (form.$valid === false) {
  //           return false;
  //         }
  //         UserService.put(id, $scope.vm).then(function(data) {
  //           $uibModalInstance.close($scope.vm);
  //         }, function(err) {
  //           console.log(err);
  //         });
  //       };
  //
  //       $scope.cancel = function() {
  //         $uibModalInstance.dismiss('cancel');
  //       };
  //     }
  //   }).result.then(function(item) {
  //     $scope.dataList[index] = item;
  //   });
  // };


  // 删除

  // $scope.del = function(id, index) {
  //   $uibModal.open({
  //     templateUrl: 'views/temptate/user/delete.html',
  //     controller: function($scope, $uibModalInstance) {
  //       $scope.sub = function() {
  //         UserService.del(id).then(function(data) {
  //           $uibModalInstance.close(index);
  //         }, function(err) {
  //           console.log(err);
  //         });
  //       }
  //     }
  //   }).result.then(function(index) {
  //     $scope.dataList.splice(index, 1);
  //   });
  // };


}
