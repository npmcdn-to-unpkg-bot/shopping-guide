/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('TypeManagementController', ['$scope', 'TypeService', '$uibModal', 'CONFIGS', 'FileUploader', TypeManagementController]);

function TypeManagementController($scope, TypeService, $uibModal, CONFIGS, FileUploader) {

  var vm = $scope.vm = {};

  vm.CONFIGS = CONFIGS;

  $scope.data = [];

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
    TypeService.all().then(
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

  // 删除
  $scope.remove1 = function(scope) {
    console.log(scope.$modelValue);
    $uibModal.open({
      templateUrl: 'views/temptate/shopmanage/delete.html',
      controller: function($scope, TypeService, $uibModalInstance) {
        $scope.title = '删除';
        var arrs = [];
        arrs.unshift(scope.$modelValue.id);
        $scope.sub = function() {
          if (!scope.$modelValue.list) {
            TypeService.del(scope.$modelValue.id).then(function(data) {
              $uibModalInstance.close();
              scope.remove();
            }, function(err) {
              console.log(err);
            });
          } else {
            function getArray(arr) {
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].id) {
                  arrs.unshift(arr[i].id);
                  if (arr[i].id && arr[i].list) {
                    getArray(arr[i].list);
                  }
                }
              }
            }

            getArray(scope.$modelValue.list);
          }

          for (var i = 0; i < arrs.length; i++) {
            TypeService.del(arrs[i]).then(function(data) {
              if (i === arrs.length) {
                $uibModalInstance.close();
                scope.remove();
              }
            }, function(err) {
              console.log(err);
            });
          }
        };
      }
    });
  };

  $scope.toggle = function(scope) {
    scope.toggle();
  };

  $scope.moveLastToTheBeginning = function() {
    console.log($scope.data);
    // var a = $scope.data.pop();
    // $scope.data.splice(0, 0, a);
  };

  $scope.newSubItem = function(scope) {
    $uibModal.open({
      templateUrl: 'views/temptate/tree/tree.html',
      controller: function($scope, TypeService, $uibModalInstance, FileUploader) {
        var vm = $scope.vm = {};
        $scope.title = '增加商品类型';

        var uploader = $scope.uploader = new FileUploader({
          url: 'merchant/upload',
          autoUpload: true
        });

        uploader.filters.push({
          name: 'imageFilter',
          fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
          $scope.vm.icon = response.data;
        };

        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          $scope.vm.pid = scope.$modelValue.id;
          TypeService.save($scope.vm).then(function(data) {
            $uibModalInstance.close(data.data);
          }, function(err) {
            console.log(err);
          });
        }
      }
    }).result.then(function(data) {
      var nodeData = scope.$modelValue;
      if (!nodeData.list) {
        nodeData.list = [];
      }
      nodeData['list'].push({
        id: data.id,
        pid: data.pid,
        name: data.name,
        icon: data.icon,
        right_num: data.right_num,
        left_num: data.left_num,
        list: []
      });

    });
  };


  // 修改
  $scope.editItem = function(scope) {
    $uibModal.open({
      templateUrl: 'views/temptate/tree/tree.html',
      controller: function($scope, TypeService, $uibModalInstance, FileUploader) {
        var vm = $scope.vm = {};
        $scope.title = '修改商品类型';
        $scope.vm.name = scope.$modelValue.name;
        $scope.vm.icon = scope.$modelValue.icon;

        var uploader = $scope.uploader = new FileUploader({
          url: 'merchant/upload',
          autoUpload: true
        });

        uploader.filters.push({
          name: 'imageFilter',
          fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        });
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
          $scope.vm.icon = response.data;
        };

        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          TypeService.put(scope.$modelValue.id, {
            pid: scope.$modelValue.pid,
            id: scope.$modelValue.id,
            name: $scope.vm.name,
            icon: $scope.vm.icon
          }).then(function(data) {
            $uibModalInstance.close(data.data);
          }, function(err) {
            console.log(err);
          });
        }
      }
    }).result.then(function(data) {
      scope.$modelValue.id = data.id;
      scope.$modelValue.pid = data.pid;
      scope.$modelValue.name = data.name;
      scope.$modelValue.icon = data.icon;
      scope.$modelValue.right_num = data.right_num;
      scope.$modelValue.left_num = data.left_num;

    });
  };

}
