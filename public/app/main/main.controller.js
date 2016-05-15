(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$timeout', '$uibModal', 'IpService', 'IspsService', 'ProfileFactory', 'ProgressBarService'];

    /* @ngInject */
    function MainController($rootScope, $scope, $timeout, $uibModal, IpService, IspsService, ProfileFactory, ProgressBarService) {

        // private variables
        var workSteps = 2; // number of steps inside the page (api calls, calculations, etc). At startup, 2 steps are automatic triggered (can changed upon each new function)
        var currentWorkStep = 0; // starts at zero and is incremented inside the funcion on each new call

        // public
        var vm = this;
        vm.appStep = 0; // screen number starts at 0
        vm.speeds = [1,2,3,5,8,10,15,20,25,35,50,100];
        vm.speedUnits = [ 'Kbps', 'Mbps', 'Gbps'];

        vm.startCalc = startCalc; // start button
        vm.prevStep = prevStep; // prev screen
        vm.nextStep = nextStep; // next screen
        vm.share = share; // share the results in twitter, facebook, etc
        // create new isp in db
        vm.newModal = newModal;
        vm.postIsp = postIsp;

        vm.firstStepCompleted = firstStepCompleted;
        vm.secondStepCompleted = secondStepCompleted;

        vm.cancelModal = cancelModal;

        vm.profile = {
          "media" : {
            "aswered": false,
            "enabled": false,
          },
          "games" : {
            "aswered": false,
            "enabled": false,
          },
          "cloud" : {
            "aswered": false,
            "enabled": false,
          }
        }

        activate();

        ////////////////

        function activate() {
            ProgressBarService.set(0)
            console.log('Home started')

            // Get user's ip
            IpService.get().then(function(response) {
              $rootScope.userIP = response
              vm.userIsp = {
                "name": response.isp,
                "plan": {
                  "download": {
                    "unit": vm.speedUnits[1]
                  },
                  "upload": {
                    "unit": vm.speedUnits[1]
                  }
                }
              };
              incrementProgressBar();
            });
            IspsService.getAll().then(function(response) {
                vm.isps = response
                console.log(vm.isps);
                incrementProgressBar();
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
          if (vm.firstStepCompleted()) {
            vm.postIsp(vm.userIsp);
          }
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
          console.log(vm.profile[name])
          vm.profile[name].answered = true;
          vm.profile[name].enabled = true;
          ProfileFactory.saveModel(vm.profile);

          function capitalizeFirstLetter(string) {
              return string.charAt(0).toUpperCase() + string.slice(1);
          }
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/layout/modal/' + name + '/index.html',
            controller: capitalizeFirstLetter(name) + 'Controller as vm',
            size: 'lg'
          });

          console.log(capitalizeFirstLetter(name) + 'Controller');
        }

        function cancelModal(name) {
          console.log(vm.profile[name])
          vm.profile[name].answered = true;
          vm.profile[name].enabled = false;
        }

        function saveModel(data) {
          ProfileFactory.saveModel(vm.profile);
        }

        function getModel() {
          vm.profile = ProfileFactory.getModel();
        }

        function firstStepCompleted() {
          if (vm.userIsp){
            if (vm.userIsp.name && vm.userIsp.plan ) {
              if (vm.userIsp.plan.download.speed && vm.userIsp.plan.upload.speed) {
                return true;
              }
            }
          } else {
            return false;
          }
        }

        function secondStepCompleted() {
          if (vm.profile) {
            if (vm.profile.media.answered || vm.profile.games.answered) {
              return true;
            }
          } else {
            return false;
          }
        }

        // create or update an isp on the database
        function postIsp(isp) {
          var instance = {
            "name" : isp.name,
            "plans" : [isp.plan]
          }
          IspsService.updateIsp(instance)
        }

        function addPlan(plan) {
          // TODO
          IspsService.postIsp(isp)
        }

        //private functions

        function incrementProgressBar() {
          currentWorkStep += 1;
          var progressRatio = (currentWorkStep / workSteps) * 100;
          ProgressBarService.set(progressRatio)
        }


    }
})();
