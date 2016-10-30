(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('GamesController', gamesController);

    gamesController.$inject = [];

    /* @ngInject */
    function gamesController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('Games started')

        }

    }
})();
