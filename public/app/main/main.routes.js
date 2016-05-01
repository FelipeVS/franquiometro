(function() {
    'use strict';

    angular
    .module('app.main')
    .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController as vm'
        });
    }
})();
