/**
 * Created by youpeng on 16/8/17.
 */
angular.module('webapp')
  .service('AdminService', ['$http', '$q', AdminService]);

function AdminService($http, $q) {
  function handleRequest(method, url, data) {
    var defered = $q.defer();
    var config = {
      method: method,
      url: url
    };

    if ("POST" === method || "PUT" === method) {
      config.data = data;
    } else if ("GET" === method || "DELETE" === method) {
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
      return handleRequest('GET', '/login', params);
    },
    save: function(data) {
      return handleRequest('POST', '/login', data);
    },
    get_user_by_token: function(data) {
      return handleRequest('POST', '/get_user_by_token', data);
    },
    detail: function(id) {
      return handleRequest('GET', '/login/'+ id);
    },
    put: function(id, data) {
      return handleRequest('PUT', '/modify/'+ id, data);
    }
  }
}
