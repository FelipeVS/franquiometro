(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('UserFactory', userFactory);

    userFactory.$inject = [];

    /* @ngInject */
    function userFactory() {
        var service = {
            get: get,
            save: save,
            setLocation: setLocation,
            getLocation: getLocation
        };

        var user = {
          "userRegion" : null,
          "isp" : {
            "plan" : {
              "region" : {

              },
              "upload" : {

              },
              "download" : {

              }
            }

          }
        };

        return service;

        function get() {
          console.log('Sending User information:', user)
          return user;
        }

        function save(data) {
          user = data;
        }

        function setLocation(location) {
            user.userRegion = location
            user.isp.plan.region = location
            console.log('USER: location successfully saved:', user)
        }

        function getLocation(type) {
            if (type === "user" ) return user.userRegion
            else if (type === "plan" ) return user.isp.plan.region
        }
    }
})();
