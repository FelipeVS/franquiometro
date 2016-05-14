(function() {
    'use strict';

    angular
    .module('app.factory')
    .factory('ProfileFactory', ProfileFactory);

    ProfileFactory.$inject = [];

    var isps = [];

    /* @ngInject */
    function ispsService() {
        var service = {
            getAll: getAll,
            postIsp: postIsp,
            getIsp: getIsp
        };
        var isp;

        return factory;

        ////////////////

        
    }
})();
