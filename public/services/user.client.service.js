/**
 * Created by youpeng on 16/8/4.
 */

angular.module('webapp')
  .service('UserService', ['$http', '$q', UserService]);

function UserService($http, $q) {
  function handleRequest(method, url, data) {
    var defered = $q.defer();
    var config = {
      method: method,
      url: url
    };

    if ("POST" === method) {
      config.data = data;
    } else if ("GET" === method) {
      config.params = data;
    }

    $http(config).success(function(data) {
      defered.resolve(data);
    }).error(function(err) {
      defered.reject(err);
    });

    return defered.promise;
  }

  return {
    list: function(params) {
      return handleRequest('GET', '/user', params);
    },
    save: function(data) {
      return handleRequest('POST', '/user', data);
    },
    detail: function(id) {
      return handleRequest('GET', '/user/'+ id);
    }
  }
}
