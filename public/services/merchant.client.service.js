/**
 * Created by youpeng on 16/8/19.
 */
/**
 * Created by youpeng on 16/8/4.
 */

angular.module('webapp')
  .service('MerchantService', ['$http', '$q', MerchantService]);

function MerchantService($http, $q) {
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
      return handleRequest('GET', '/merchant', params);
    },
    all: function(params) {
      return handleRequest('GET', '/merchantAll', params);
    },
    save: function(data) {
      return handleRequest('POST', '/merchant', data);
    },
    put: function(id, data) {
      return handleRequest('PUT', '/merchant/'+ id, data);
    },
    detail: function(id) {
      return handleRequest('GET', '/merchant/'+ id);
    },
    del: function(id) {
      return handleRequest('DELETE', '/merchant/'+ id);
    }
  }
}
