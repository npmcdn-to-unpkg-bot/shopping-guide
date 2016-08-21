/**
 * Created by youpeng on 16/8/19.
 */
angular.module('webapp')
  .controller('MerchantController', ['$scope', 'CONFIGS', '$uibModal', 'MerchantService', 'FileUploader', MerchantController]);

function MerchantController($scope, CONFIGS, $uibModal, MerchantService, FileUploader) {

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
    MerchantService.list(con).then(
      function(data) {
        // totalItems ?
        $scope.totalItems = data.count;
        $scope.dataList = data.data;
      },
      function(err) {
      }
    );
  };

  $scope.loadNews();

  vm.moneyStatusName = function(value) {
    var status = _.find(CONFIGS.moneyStatus, {value: value});
    if (status) {
      return status.text;
    }
    return '';
  };

  vm.merchantStatusName = function(value) {
    var status = _.find(CONFIGS.merchantStatus, {value: value});
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
      templateUrl: 'views/temptate/merchant/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance, FileUploader) {
        $scope.uploader = new FileUploader({
          url: 'upload.php',
          autoUpload: true
        });
        
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
          MerchantService.save($scope.vm).then(function(data) {
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
      templateUrl: 'views/temptate/merchant/find.html',
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
      templateUrl: 'views/temptate/merchant/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance, FileUploader) {
        $scope.vm = {};
        $scope.CONFIGS = CONFIGS;
        $scope.uploader = new FileUploader({
          url: 'upload.php',
          autoUpload: true
        });

        MerchantService.detail(id).then(function(data) {
          $scope.title = "修改用户";
          $scope.vm = data.data;
        }, function(err) {
          console.log(err);
        });
        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          UserService.put(id, $scope.vm).then(function(data) {
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
      templateUrl: 'views/temptate/merchant/delete.html',
      controller: function($scope, $uibModalInstance) {
        $scope.sub = function() {
          MerchantService.del(id).then(function(data) {
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
