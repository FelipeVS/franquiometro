(function() {
    'use strict';

    angular
    .module('app.services')
    .factory('ProgressBarService', ProgressBarService);

    ProgressBarService.$inject = ['$rootScope', '$timeout'];


    /* @ngInject */
    function ProgressBarService($rootScope, $timeout) {

        var overalProgressSteps;
        var currentProgressStep = 0;

        var service = {
            set: set,
            increment: increment
        };

        $rootScope.progressBar = {
          "hide" : false
        }

        return service;

        ////////////////

        function set(value, steps) {
          if (steps) {
            overalProgressSteps = steps;
            currentProgressStep = 0;
          }

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

        function increment() {
          currentProgressStep += 1;
          var progressRatio = (currentProgressStep / overalProgressSteps) * 100;
          this.set(progressRatio, null)
        }
    }
})();
