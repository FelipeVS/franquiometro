(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['IspsService'];

    function runBlock(IspsService) {


        activate();

        function activate() {

        }

    }
})();
