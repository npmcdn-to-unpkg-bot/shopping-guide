/**
 * Created by youpeng on 16/8/4.
 */
angular.module('webapp')
  .controller('UserController', ['$scope', 'UserService', UserController]);

function UserController($scope, UserService) {
  $scope.dataList = [];

  $scope.loadNews = function() {
    UserService.list().then(
      function(data) {
      $scope.dataList = data;
    },
      function(err) {}
    );
  };

  $scope.loadNews();
}
