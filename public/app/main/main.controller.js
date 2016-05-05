(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$timeout', '$uibModal', 'ipService', 'IspsService'];

    /* @ngInject */
    function MainController($rootScope, $timeout, $uibModal, ipService, IspsService) {
        var vm = this;
        vm.appStep = 0;
        vm.startCalc = startCalc;
        vm.prevStep = prevStep;
        vm.nextStep = nextStep;
        vm.share = share;
        vm.newIspModal = newIspModal;
        vm.speeds = [1,2,3,5,8,10,15,20,25,35,50,100,1000];
        vm.speedUnits = [ 'Kbps', 'Mbps', 'Gbps']
        vm.postIsp = postIsp;
        vm.ispSelection = ispSelection;
        vm.firstStepCompleted = firstStepCompleted;

        activate();

        ////////////////

        function activate() {
            console.log('Home started')
            // Get user's ip
            ipService.get().then(function(response) {
              $rootScope.userIP = response
              vm.userIsp = {
                "name": response.isp,
                "plan": {
                  "download": {
                    "unit": ""
                  },
                  "upload": {
                    "unit": ""
                  }
                }
              };
            });
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
          openTooltips();
        }
        function nextStep() {
          vm.appStep += 1;
          openTooltips();
        }

        function openTooltips() {
            vm.tooltipIsOpen = true;
            $timeout(function () {
              vm.tooltipIsOpen = false;
            }, 3000);
        }

        function share() {
          console.log('This will open a modal to post on facebook, twitter, whatever.')
        }

        function newIspModal() {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/layout/modal/newIsp.html',
            // controller: 'ModalInstanceCtrl',
            size: 'lg'
          });
        }

        function ispSelection(type) {
          switch (type) {
            case 'name':

              break;
            case 'download':
              vm.userIsp.plan.download.unit = vm.speedUnits[1];
              break;
            case 'upload':
              vm.userIsp.plan.upload.unit = vm.speedUnits[1];
              break;
            default:
          }
        }

        function firstStepCompleted() {
          if (vm.userIsp){
            if (vm.userIsp.name && vm.userIsp.plan ) {
              if (vm.userIsp.plan.download.value && vm.userIsp.plan.upload.value) {
                return true;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
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
