(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('ProfileFactory', ProfileFactory);

    ProfileFactory.$inject = [];

    /* @ngInject */
    function ProfileFactory() {
        var service = {
            getModel: getModel,
            saveModel: saveModel
        };

        var profile = {};

        return service;

        function getModel() {
          console.log('sending profile:\ ', profile)
          return profile;
        }

        function saveModel(data) {
          profile = data;
        }
    }
})();
