(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('CloudController', cloudController);

    cloudController.$inject = [];

    /* @ngInject */
    function cloudController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Cloud started')

        }

    }
})();
