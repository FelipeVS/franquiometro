(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('GamesController', GamesController);

    GamesController.$inject = [];

    /* @ngInject */
    function GamesController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Games started')

        }

    }
})();
