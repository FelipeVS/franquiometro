(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('WorkController', WorkController);

    WorkController.$inject = [];

    /* @ngInject */
    function WorkController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Work started')

        }

    }
})();
