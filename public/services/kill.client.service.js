/**
 * Created by youpeng on 16/8/4.
 */

angular.module('webapp')
  .service('KillService', ['$http', '$q', KillService]);

function KillService($http, $q) {
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
      return handleRequest('GET', '/kill', params);
    },
    save: function(data) {
      return handleRequest('POST', '/kill', data);
    },
    put: function(id, data) {
      return handleRequest('PUT', '/kill/'+ id, data);
    },
    detail: function(id) {
      return handleRequest('GET', '/kill/'+ id);
    },
    del: function(id) {
      return handleRequest('DELETE', '/kill/'+ id);
    }
  }
}
