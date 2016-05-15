(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('IspsService', ispsService);

    ispsService.$inject = ['$http', '$q', 'serverUrl'];

    var isps = [];

    /* @ngInject */
    function ispsService($http, $q, serverUrl) {
        var ispsUrl = serverUrl + '/api/isps'
        var service = {
            getAll: getAll,
            postIsp: postIsp,
            getIsp: getIsp,
            updateIsp: updateIsp,
            deleteIsp: deleteIsp
        };
        var isp;

        return service;

        ////////////////

        function getAll() {
            return $http.get(ispsUrl)
              .then(getIspsComplete)
              .catch(getIspsFailed);
        }

        function postIsp (isp) {
          $http({
              method: 'POST',
              url: ispsUrl,
              data: isp
          })
           .then(postIspComplete)
           .catch(postIspFailed);
        }

        function getIsp () {
            return isp;
        }

        function updateIsp(isp) {
          console.log('Updating ' + isp.name)

          $http.put(ispsUrl, isp, {params: {name: isp.name}})
         .then(postIspComplete)
         .catch(postIspFailed);
        }

        function deleteIsp(isp) {
          $http.delete(ispsUrl, {params: {name: isp.name}})
          .then(deleteIspComplete)
          .catch(deleteIspFailed);
        }

        //private functions

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

        function postIspComplete(response) {
           console.log("POST successful!", response)
        }
        function postIspFailed(data) {
           console.log("POST ERROR!\nData: ", data.data, "\nStatus: ", data.status, "\nHeaders: ", data.header, "\nConfig: ", data.config)
        }

        function deleteIspComplete(response) {
           console.log("DELETE successful!", response)
        }
        function deleteIspFailed(data) {
           console.log("DELETE ERROR!\nData: ", data.data, "\nStatus: ", data.status, "\nHeaders: ", data.header, "\nConfig: ", data.config)
        }
    }
})();
