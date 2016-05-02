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
            return $http.get(serverUrl + 'api/isps/')
              .then(getIspsComplete)
              .catch(getIspsFailed);

            function getIspsComplete(response) {
                isps = response.data;
                if (isps === 0 ) {
                  console.log('No isp')
                }
                return isps;
            }

            function getIspsFailed(data, status, header, config) {
              console.log("GET ERROR!\n Data: ", data, "\n Status: ", status, "\n Headers: ", header, "\n Config: ", config)
            }
        }

        function postIsp (isp) {
          $http.post(serverUrl + 'api/isps/', isp, {
              headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            })
           .then(postIspComplete)
           .catch(postIspFailed);

           function postIspComplete(response) {
              console.log("POST successful!", response)
           }
           function postIspFailed(data, status, header, config) {
              console.log("POST ERROR!\n Data: ", data, "\n Status: ", status, "\n Headers: ", header, "\n Config: ", config)
           }

        }

        function getIsp () {
            return isp;
        }

    }
})();
