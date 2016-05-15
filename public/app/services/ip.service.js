(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('IpService', IpService);

    IpService.$inject = ['$http', '$q'];

    var centers = [];

    /* @ngInject */
    function IpService($http, $q) {
        var service = {
            get: getUserIP
        };
        var center;

        return service;

        ////////////////

        function getUserIP() {
          var deferred = $q.defer();
          $http.get('http://ip-api.com/json')
            .then(function(object) {
              deferred.resolve( object.data );
            })
            .catch(function(){
              deferred.reject();
            })
          return deferred.promise;
        }

    }
})();
