(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('WorkController', workController);

    workController.$inject = [];

    /* @ngInject */
    function workController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Work started')

        }

    }
})();
