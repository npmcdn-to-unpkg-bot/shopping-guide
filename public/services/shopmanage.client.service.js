/**
 * Created by youpeng on 16/8/19.
 */
/**
 * Created by youpeng on 16/8/4.
 */

angular.module('webapp')
  .service('ShopManageService', ['$http', '$q', ShopManageService]);

function ShopManageService($http, $q) {
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
      return handleRequest('GET', '/shop', params);
    },
    all: function(params) {
      return handleRequest('GET', '/shopAll', params);
    },
    save: function(data) {
      return handleRequest('POST', '/shop', data);
    },
    put: function(id, data) {
      return handleRequest('PUT', '/shop/'+ id, data);
    },
    detail: function(id) {
      return handleRequest('GET', '/shop/'+ id);
    },
    del: function(id) {
      return handleRequest('DELETE', '/shop/'+ id);
    }
  }
}
