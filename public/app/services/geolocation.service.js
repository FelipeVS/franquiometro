(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('GeolocationService', geolocationService);

    geolocationService.$inject = ['$http', '$q', 'UserFactory', 'gMaps_API_KEY'];

    var isps = [];

    /* @ngInject */
    function geolocationService($http, $q, UserFactory, gMaps_API_KEY) {
        var service = {
            get: get,
        };
        var isp;

        return service;

        ////////////////

        function get() {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(
              function (position) {
                  geocodePosition(position)
                  .then(function(result) {
                      deferred.resolve(result);
                  })
              },
              function (err) {
                  deferred.reject(err);
              });
            return deferred.promise;
        }

        function getCurrentLocation() {
            return navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
        }

        //// private functions

        function geolocationSuccess(position) {
            console.log('Geolocation success:', position.coords.latitude, position.coords.longitude);
            deferred.resolve(position);
        }

        function geolocationError(error) {
            console.log('Geolocation Error:', error);
            deferred.reject(error);
        }

        function geocodePosition(position) {
            var deferred = $q.defer();
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + gMaps_API_KEY)
            .then(function (response) {
                deferred.resolve(geocodeSuccess(response));
            })
            .catch(function (error) {
                deferred.reject(error);
            })
            return deferred.promise;
        }

        function geocodeSuccess(response) {
            // console.log('Geocode Success:', response)

            if (response.data.status=="OK") {
                var results = response.data.results
                var neighborhood, city, state, country;

                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {
                        if (results[0].address_components[i].types[b] == "sublocality_level_1") {
                            neighborhood= results[0].address_components[i].long_name;
                            break;
                        }
                        if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
                            city= results[0].address_components[i].long_name;
                            break;
                        }
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            state= results[0].address_components[i].short_name;
                            break;
                        }
                        if (results[0].address_components[i].types[b] == "country") {
                            country= results[0].address_components[i].long_name;
                            break;
                        }
                    }
                }
                var location = {
                    "neighborhood" : neighborhood,
                    "city" : city,
                    "state" : state,
                    "country" : country
                }
                return location;
            } else if (response.data.status ==="ZERO_RESULTS") {
                return 'No Geocode results';
            } else if (response.data.status ==="OVER_QUERY_LIMIT") {
                return 'Geocode requests limit reached';
            }
        }
        function geocodeError(error) {
            return 'Geocode Error:', error
        }
    }
})();
