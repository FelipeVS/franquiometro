(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['IspsService'];

    /* @ngInject */
    function MainController(IspsService) {
        var vm = this;
        vm.appStep = 0;
        vm.startCalc = startCalc;
        vm.prevStep = prevStep;
        vm.nextStep = nextStep;
        vm.share = share;
        vm.newIspModal = {
          "title": "Title",
          "content": "Hello Modal<br />This is a multiline message!"
        };
        vm.postIsp = postIsp;
        activate();

        ////////////////

        function activate() {
            console.log('Home started')
            IspsService.getAll().then(function(response) {
                vm.isps = response
                console.log(vm.isps);
            });
        }

        // start button
        function startCalc() {
          console.log('Calc initiated');
          vm.appStep = 1;
        }

        function prevStep() {
          vm.appStep -= 1;
        }

        function nextStep() {
          vm.appStep += 1;
        }

        function share() {
          console.log('This will open a modal to post on facebook, twitter, whatever.')
        }

        // create or update an isp on the database
        function postIsp(isp) {
          IspsService.postIsp(isp)
        }

        function addPlan(plan) {
          // TODO
          IspsService.postIsp(isp)
        }
    }
})();
