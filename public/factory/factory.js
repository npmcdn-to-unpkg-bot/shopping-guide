/**
 * Created by youpeng on 16/8/17.
 */


angular
  .module('webapp')
  .factory('UserInterceptor', ['$q', '$rootScope', '$location', '$cookies', UserInterceptor])
  .factory('timestampMarker', [timestampMarker]);

function UserInterceptor($q, $rootScope, $location, $cookies) {
  return {
    responseError: function(response) {
      var data = response.status;
      // 判断错误码，如果是未登录
      if (data === 401) {
        $location.path('/');
        $cookies.remove('token');
        $cookies.remove('user_name');
        $cookies.remove('nick_name');
        $cookies.remove('role');
        $cookies.remove('id');
        $rootScope.$emit("userIntercepted", "notLogin", response);
      }
      // 如果是登录超时
      return $q.reject(response);
    }
  };

}

function timestampMarker($rootScope) {
  var timestampMarker =
  {
    request: function(config) {
      // $rootScope.loading = true;
      config.requestTimestamp = new Date().getTime();
      return config;
    },
    response: function(response) {
      // $rootScope.loading = false;
      response.config.responseTimestamp = new Date().getTime();
      return response;
    }
  };
  return timestampMarker;

}
