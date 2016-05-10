(function() {
    'use strict';

    angular
    .module('app')
    .config(configure);

    configure.$inject = ['$locationProvider'];

    function configure ($locationProvider) {
      // remove the harsh (#/) of the url
      $locationProvider.html5Mode(true);


    }
})();
