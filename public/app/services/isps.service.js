(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('IspsService', ispsService);

    ispsService.$inject = ['$http', '$q', 'serverUrl'];

    var isps = [];

    /* @ngInject */
    function ispsService($http, $q, serverUrl) {
        var service = {
            getAll: getAll,
            postIsp: postIsp,
            getIsp: getIsp
        };
        var isp;

        return service;

        ////////////////

        function getAll() {
            return $http.get(serverUrl + '/api/isps/')
              .then(getIspsComplete)
              .catch(getIspsFailed);

            function getIspsComplete(response) {
                isps = response.data;
                if (isps === 0 ) {
                  console.log('No isp')
                }
                return isps;
            }

            function getIspsFailed(data) {
              console.log("GET ERROR!\nData: ", data.data, "\nStatus: ", data.status, "\nHeaders: ", data.header, "\nConfig: ", data.config)
            }
        }

        function postIsp (isp) {
          $http({
              method: 'POST',
              url: serverUrl + '/api/isps/',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
              },
              data: isp
          })
           .then(postIspComplete)
           .catch(postIspFailed);

           function postIspComplete(response) {
              console.log("POST successful!", response)
           }
           function postIspFailed(data) {
              console.log("POST ERROR!\nData: ", data.data, "\nStatus: ", data.status, "\nHeaders: ", data.header, "\nConfig: ", data.config)
           }

        }

        function getIsp () {
            return isp;
        }

    }
})();
