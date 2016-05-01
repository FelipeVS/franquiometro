(function() {
    'use strict';

    angular
    .module('app')
    .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
})();
