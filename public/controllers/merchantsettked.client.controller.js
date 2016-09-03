/**
 * Created by youpeng on 16/8/19.
 */
angular.module('webapp')
  .controller('MerchantsettkedController', ['$scope', 'CONFIGS', '$uibModal', 'MerchantService', 'UserService', 'FileUploader', 'toastr', '$cookies', MerchantsettkedController]);

function MerchantsettkedController($scope, CONFIGS, $uibModal, MerchantService, UserService, FileUploader, toastr, $cookies) {

  var vm = $scope.vm = {};

  $scope.CONFIGS = CONFIGS;
  $scope.vm.status = CONFIGS.merchantStatus[0].value;
  $scope.vm.money_status = CONFIGS.moneyStatus[0].value;

  $scope.vm.user_id = $cookies.get('id');
  $scope.vm.user_name = $cookies.get('user_name');

  // 1:修改 2:新增
  MerchantService.getUserByMerchant().then(function(data) {
    if (data.data) {
      $scope.vm = data.data;
      $scope.account = $scope.vm.account;
      $scope.money_photo = $scope.vm.money_photo;
      $scope.mark = 1;

    } else {
      $scope.mark = 2;
    }

  }, function(err) {
    if (err.err == 1) {
      toastr.error(err.msg, "操作失败");
    }
  });




  for (var i = 1; i <= 4; i++) {
    (function(n) {
      var uploader = $scope['uploader' + n] = new FileUploader({
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

  $scope.save = function(form) {

    if (form.$valid === false) {
      return false;
    }

    if ($scope.mark === 1) {
      MerchantService.update_merchant($scope.vm).then(function(data) {
        if (data.err == 0) {
          $scope.vm = data.data;
          toastr.success('ok', "操作成功");
        }
      }, function(err) {
        if (err.err == 1) {
          toastr.error(err.msg, "操作失败");
        }
      });
    }

    if ($scope.mark === 2) {
        MerchantService.create_merchant($scope.vm).then(function(data) {
          if (data.err == 0) {
            $scope.vm = data.data;
            toastr.success('ok', "操作成功");
          }
        }, function(err) {
          if (err.err == 1) {
            toastr.error(err.msg, "操作失败");
          }
        });
    }


  };

}
