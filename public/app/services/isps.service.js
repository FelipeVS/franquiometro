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
            saveCenter: saveCenter,
            getCenter: getCenter
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

            function getIspsFailed(error) {
                console.log('XHR Failed for getIsps.', error);
            }
        }

        function saveCenter (selected) {
            console.log('Saving isp to later:', selected);
            isp = selected;
        }

        function getCenter () {
            return isp;
        }

    }
})();
