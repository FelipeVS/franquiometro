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

            function getIspsFailed(data) {
              console.log("GET ERROR!\nData: ", data.data, "\nStatus: ", data.status, "\nHeaders: ", data.header, "\nConfig: ", data.config)
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
           function postIspFailed(data) {
              console.log("POST ERROR!\nData: ", data.data, "\nStatus: ", data.status, "\nHeaders: ", data.header, "\nConfig: ", data.config)
           }

        }

        function getIsp () {
            return isp;
        }

    }
})();
