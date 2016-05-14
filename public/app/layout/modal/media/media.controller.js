(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MediaController', MediaController);

    MediaController.$inject = [];

    /* @ngInject */
    function MediaController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Media started')

        }

    }
})();
