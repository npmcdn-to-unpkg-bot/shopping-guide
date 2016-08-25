/**
 * Created by youpeng on 16/8/19.
 */
angular.module('webapp')
  .controller('ShopManageController', ['$scope', 'CONFIGS', '$uibModal', 'ShopManageService', 'MerchantService', 'TypeService', 'FileUploader', ShopManageController]);

function ShopManageController($scope, CONFIGS, $uibModal, ShopManageService, MerchantService, TypeService, FileUploader) {

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
      templateUrl: 'views/temptate/shopmanage/add.html',
      controller: function($scope, CONFIGS, $uibModalInstance, MerchantService, TypeService, FileUploader) {
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
          if (status === 200) {
            console.log(response.data);
            $scope.vm.photo = response.data;
          }
        };

        $scope.title = "新增商品";

        $scope.CONFIGS = CONFIGS;
        $scope.vm.status = CONFIGS.merchantStatus[0].value;

        $scope.filterStatus = function(filters) {
          return filters.value < 3;
        };


        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }

          console.log($scope.vm);
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
      controller: function($scope, CONFIGS, $uibModalInstance, MerchantService, FileUploader) {
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


        for (var i = 1; i <= 4; i++) {
          (function(n) {
            var uploader = $scope['uploader' + n] = new FileUploader({
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
              if (status === 200) {
                if (n == 1) {
                  $scope.vm.identity_front = response.data;
                }
                if (n == 2) {
                  $scope.vm.identity_back = response.data;
                }
                if (n == 3) {
                  $scope.vm.info = response.data;
                }
                if (n == 4) {
                  $scope.vm.money_photo = response.data;
                }

              }
            };
          })(i);

        }


        ShopManageService.detail(id).then(function(data) {
          $scope.title = "修改用户";
          $scope.vm = data.data;

        }, function(err) {
          console.log(err);
        });
        $scope.save = function(form) {
          if (form.$valid === false) {
            return false;
          }

          console.log($scope.vm);
          ShopManageService.put(id, $scope.vm).then(function(data) {
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
      templateUrl: 'views/temptate/shopmanage/delete.html',
      controller: function($scope, $uibModalInstance) {
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
