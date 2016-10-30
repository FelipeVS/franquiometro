(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('CityAndStateService', cityAndStateService);

    cityAndStateService.$inject = ['$http', '$q'];

    var centers = [];

    /* @ngInject */
    function cityAndStateService($http, $q) {
        var service = {
            getStates: getStates
        };
        var center;

        return service;

        ////////////////

        function getStates() {
            var deferred = $q.defer();
            $http.get('data/estados-cidades.json')
                .then(function (response) {
                    deferred.resolve(response.data.estados)
                })
                .catch(function (error) {
                    deferred.reject(error)
                });
            return deferred.promise;
        }

    }
})();
