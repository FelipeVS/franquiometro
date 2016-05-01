(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['IspsService'];

    /* @ngInject */
    function MainController(IspsService) {
        var vm = this;
        vm.startCalc = startCalc;

        activate();

        ////////////////

        function activate() {
            console.log('Home started')
            IspsService.getAll().then(function(response) {
                vm.isps = response
                console.log(vm.isps);
            });
        }

        function startCalc() {
          console.log('Calc initiated');
        }
    }
})();
