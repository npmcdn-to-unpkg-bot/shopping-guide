/**
 * Created by youpeng on 16/8/19.
 */
/**
 * Created by youpeng on 16/8/4.
 */

angular.module('webapp')
  .service('TypeService', ['$http', '$q', TypeService]);

function TypeService($http, $q) {
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
      return handleRequest('GET', '/type', params);
    },
    all: function(params) {
      return handleRequest('GET', '/type', params);
    },
    save: function(data) {
      return handleRequest('POST', '/type', data);
    },
    put: function(id, data) {
      return handleRequest('PUT', '/type/'+ id, data);
    },
    detail: function(id) {
      return handleRequest('GET', '/type/'+ id);
    },
    del: function(id) {
      return handleRequest('DELETE', '/type/'+ id);
    }
  }
}
