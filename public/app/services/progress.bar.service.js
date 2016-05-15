(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('ProgressBarService', ProgressBarService);

    ProgressBarService.$inject = ['$rootScope', '$timeout'];


    /* @ngInject */
    function ProgressBarService($rootScope, $timeout) {
        var service = {
            set: set
        };
        $rootScope.progressBar = {
          "hide" : false
        }

        return service;

        ////////////////

        function set(value) {
          $rootScope.progressBar.value = value;

          if ($rootScope.progressBar.value === 0) {
            $rootScope.progressBar.hide = true
          } else if ($rootScope.progressBar.value === 100) {
            $timeout(function () {
              $rootScope.progressBar.hide = true
            }, 500)
          } else {
            $rootScope.progressBar.hide = false;
          }
        }

    }
})();
