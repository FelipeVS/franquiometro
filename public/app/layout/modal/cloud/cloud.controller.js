(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('CloudController', CloudController);

    CloudController.$inject = [];

    /* @ngInject */
    function CloudController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Cloud started')

        }

    }
})();
