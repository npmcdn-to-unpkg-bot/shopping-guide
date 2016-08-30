/**
 * Created by youpeng on 16/8/19.
 */
angular.module('webapp')
  .controller('ShopManageController', ['$rootScope', '$scope', 'CONFIGS', '$uibModal', 'ShopManageService', 'MerchantService', 'TypeService', 'FileUploader', ShopManageController]);

function ShopManageController($rootScope, $scope, CONFIGS, $uibModal, ShopManageService, MerchantService, TypeService, FileUploader) {

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
    ShopManageService.list(con).then(
      function(data) {
        $scope.totalItems = data.count;
        $scope.dataList = data.data;
      },
      function(err) {
      }
    );
  };

  $scope.loadNews();

  vm.merchantStatusName = function(value) {

    var status = _.find(CONFIGS.shopType, {value: value});
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
      templateUrl: 'views/temptate/shopmanage/add.html',
      controller: function($rootScope,$scope, CONFIGS, $uibModalInstance, ShopManageService, MerchantService, TypeService, FileUploader) {
        $scope.vm = {};
        MerchantService.all().then(
          function(data) {
            $scope.merchantList = data.data;
          },
          function(err) {
          }
        );

        TypeService.all().then(
          function(data) {
            $scope.shopTypes = data.data;
            $scope.vm.type = $scope.shopTypes[0].id;
          },
          function(err) {
          }
        );


        $scope.getUserName = function(id) {
          angular.forEach($scope.merchantList, function(value, index) {
            if (value.id === id) {
              $scope.vm.merchant_name = value.name;
            }
          });
        };


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
            console.log(response.data);
            $scope.vm.photo = response.data;
          }
        };

        $scope.title = "新增商品";

        $scope.CONFIGS = CONFIGS;

        $scope.vm.status = CONFIGS.shopType[0].value;

        $scope.filterStatus = function(filters) {
          return filters.value < 5;
        };


        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }

          console.log($scope.vm);
          ShopManageService.save($scope.vm).then(function(data) {
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
      templateUrl: 'views/temptate/shopmanage/find.html',
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
      templateUrl: 'views/temptate/shopmanage/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance, ShopManageService, MerchantService, TypeService, FileUploader) {
        $scope.vm = {};
        $scope.CONFIGS = CONFIGS;

        $scope.getUserName = function(id) {
          angular.forEach($scope.merchantList, function(value, index) {
            if (value.id === id) {
              $scope.vm.merchant_name = value.name;
            }
          });
        };

        MerchantService.all().then(
          function(data) {
            $scope.merchantList = data.data;
          },
          function(err) {
          }
        );

        TypeService.all().then(
          function(data) {
            $scope.shopTypes = data.data;
          },
          function(err) {
          }
        );


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

        $scope.filterStatus = function(filters) {
          return filters.value < 5;
        };

        ShopManageService.detail(id).then(function(data) {
          $scope.title = "修改商品";
          $scope.vm = data.data;

        }, function(err) {
          console.log(err);
        });
        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }


          ShopManageService.put(id, $scope.vm).then(function(data) {
            $uibModalInstance.close(data.data);
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

  //上架 下架

  $scope.addRemoved = function(list, index, key) {
    $uibModal.open({
      templateUrl: 'views/temptate/shopmanage/delete.html',
      controller: function($scope, $uibModalInstance) {
        if (key === '上架') {
          $scope.title = '上架';
        } else {
          $scope.title = '下架';
        }
        $scope.sub = function() {
          if (key === '上架') {
              list.status = 3;
            } else {
              list.status = 4;
            }
            delete list.type_name;
            delete list.read_num;
            delete list.preset;
            delete list.priority;
            delete list.sales_num;
          ShopManageService.put(list.id, list).then(function(data) {
            
            $uibModalInstance.close(data.data);
          }, function(err) {
            console.log(err);
          });
        }
      }
    }).result.then(function(res) {
      $scope.dataList[index] = res;
    });


  };


  // 删除

  $scope.del = function(id, index) {
    $uibModal.open({
      templateUrl: 'views/temptate/shopmanage/delete.html',
      controller: function($scope, $uibModalInstance) {
        $scope.title = '删除';
        $scope.sub = function() {
          ShopManageService.del(id).then(function(data) {
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
