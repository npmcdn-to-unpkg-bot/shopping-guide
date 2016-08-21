/**
 * Created by youpeng on 16/8/4.
 */

angular.module('webapp')
  .service('CommodityService', ['$http', '$q', CommodityService]);

function CommodityService($http, $q) {
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
      return handleRequest('GET', '/commodity', params);
    },
    save: function(data) {
      return handleRequest('POST', '/commodity', data);
    },
    put: function(id, data) {
      return handleRequest('PUT', '/commodity/'+ id, data);
    },
    detail: function(id) {
      return handleRequest('GET', '/commodity/'+ id);
    },
    del: function(id) {
      return handleRequest('DELETE', '/commodity/'+ id);
    }
  }
}
