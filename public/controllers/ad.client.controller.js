/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('AdController', ['$scope', 'AdService', 'ShopManageService', 'MerchantService', 'FileUploader', '$uibModal', 'CONFIGS', 'toastr', AdController]);

function AdController($scope, AdService, ShopManageService, MerchantService, FileUploader, $uibModal, CONFIGS, toastr) {

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
        page: 1,
        num: 10
      }
    }
    $scope.maxSize = 10;

    AdService.list(con).then(
      function(data) {
        $scope.totalItems = data.count;
        $scope.dataList = data.data;
      },
      function(err) {
      }
    );
  };

  $scope.loadNews();

  vm.AdStatusName = function(value) {
    var status = _.find(CONFIGS.AdStatus, {value: value});
    if (status) {
      return status.text;
    }
    return '';
  };

  vm.AdTypeName = function(value) {
    var status = _.find(CONFIGS.AdType, {value: value});
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
      templateUrl: 'views/temptate/ad/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance, MerchantService, FileUploader) {
        $scope.title = "新增活动";
        $scope.vm = {};
        $scope.CONFIGS = CONFIGS;
        $scope.vm.status = CONFIGS.adStatus[0].value;
        $scope.vm.addr = CONFIGS.adStatus[0].value;
        $scope.vm.default_status = CONFIGS.adDefault_status[0].value;
        $scope.commodity_list = [];

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

        var commodity_query = {};

        ShopManageService.all(commodity_query).then(function(data) {
          $scope.commodity_list = data.data;
          }, function(err) {
            console.log(err);
        });

        var uploader = $scope.uploader = new FileUploader({
          url: 'upload',
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
          if (status === 200) {
            $scope.vm.photo = response.data;
          }
        };

        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }
          $scope.vm.strTime = $scope.vm.strTime.valueOf();
          $scope.vm.endTime = $scope.vm.endTime.valueOf();
          AdService.save($scope.vm).then(function(data) {
            if (data.err == 0) {
              toastr.success('ok', "操作成功");
            }
            $uibModalInstance.close(data);
          }, function(err) {
            if (err.err == 1) {
              toastr.error(err.msg, "操作失败");
            }
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
      templateUrl: 'views/temptate/ad/find.html',
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
      templateUrl: 'views/temptate/ad/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance,  MerchantService, FileUploader) {
        $scope.vm = {};
        $scope.commodity_list = [];
        $scope.CONFIGS = CONFIGS;

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

        var commodity_query = {};

        ShopManageService.all(commodity_query).then(function(data) {
          $scope.commodity_list = data.data;
          }, function(err) {
            console.log(err);
        });


        var uploader = $scope.uploader = new FileUploader({
          url: 'upload',
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
          $scope.vm.photo = response.data;
        };


        AdService.detail(id).then(function(data) {
          $scope.title = "修改活动";
          $scope.vm = data.data;
        }, function(err) {
          console.log(err);
        });



        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }

          $scope.vm.strTime = $scope.vm.strTime.valueOf();
          $scope.vm.endTime = $scope.vm.endTime.valueOf();
          AdService.put(id, $scope.vm).then(function(data) {
            if (data.err == 0) {
              toastr.success('ok', "操作成功");
            }
            $uibModalInstance.close(data.data);
          }, function(err) {
            if (err.err == 1) {
              toastr.error(err.msg, "操作失败");
            }
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
      templateUrl: 'views/temptate/ad/delete.html',
      controller: function($scope, $uibModalInstance) {
        $scope.sub = function() {
          AdService.del(id).then(function(data) {
            if (data.err == 0) {
              toastr.success('ok', "操作成功");
            }
            $uibModalInstance.close(index);
          }, function(err) {
            if (err.err == 1) {
              toastr.error(err.msg, "操作失败");
            }
          });
        }
      }
    }).result.then(function(index) {
      $scope.dataList.splice(index, 1);
    });
  };


}
