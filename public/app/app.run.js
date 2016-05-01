(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['$rootScope','ipService'];

    function runBlock($rootScope, ipService) {

        activate();

        function activate() {
          // Get user's ip
          ipService.get().then(function(response) {
            $rootScope.userIP = response
          });
        }
    }
})();
