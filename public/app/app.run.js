(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['$rootScope', 'IspsService'];

    function runBlock($rootScope, IspsService) {

        $rootScope.appStep = 0; // screen number starts at 0

        $rootScope.nextStep = nextStep;
        $rootScope.prevStep = prevStep;

        activate();

        function activate() {

        }

        function prevStep() {
          $rootScope.appStep -= 1;
        }

        function nextStep() {
            $rootScope.appStep += 1;
        }


    }
})();
