(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$timeout', '$uibModal', 'ipService', 'IspsService'];

    /* @ngInject */
    function MainController($rootScope, $timeout, $uibModal, ipService, IspsService) {
        var vm = this;
        vm.appStep = 2; // screen number starts at 0
        vm.speeds = [1,2,3,5,8,10,15,20,25,35,50,100];
        vm.speedUnits = [ 'Kbps', 'Mbps', 'Gbps'];

        vm.media = {
          "cancel": false,
          "hidden": false
        }

        vm.startCalc = startCalc; // start button
        vm.prevStep = prevStep; // prev screen
        vm.nextStep = nextStep; // next screen
        vm.share = share; // share the results in twitter, facebook, etc
        // create new isp in db
        vm.newModal = newModal;
        vm.postIsp = postIsp;

        vm.ispSelection = ispSelection;
        vm.firstStepCompleted = firstStepCompleted;

        vm.cancelMedia = cancelMedia;

        vm.profile = {
          "media" : {
            "enabled": false,
            "short": "Consumo médio"
          }
        }

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

        function newModal(name) {
          function capitalizeFirstLetter(string) {
              return string.charAt(0).toUpperCase() + string.slice(1);
          }
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/layout/modal/' + name + '/index.html',
            controller: capitalizeFirstLetter(name) + 'Controller',
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

        function cancelMedia() {
          vm.profile.media.enabled = false;
        }
    }
})();
