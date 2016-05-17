(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$timeout', '$uibModal', 'IpService', 'IspsService', 'ProfileFactory', 'ProgressBarService', '$filter', '$http'];

    /* @ngInject */
    function MainController($rootScope, $scope, $timeout, $uibModal, IpService, IspsService, ProfileFactory, ProgressBarService, $filter, $http) {

        // private variables
        var workSteps = 3; // number of steps inside the page (api calls, calculations, etc). At startup, 2 steps are automatic triggered (can changed upon each new function)
        var currentWorkStep = 0; // starts at zero and is incremented inside the funcion on each new call

        // public
        var vm = this;
        vm.appStep = 0; // screen number starts at 0
        vm.speeds = [1,2,3,5,8,10,15,20,25,35,50,100];
        vm.speedUnits = [ 'Kbps', 'Mbps', 'Gbps'];

        //shared
        vm.prevStep = prevStep; // prev screen
        vm.nextStep = nextStep; // next screen
        // intro
        vm.startCalc = startCalc; // start button
        // fist step
        vm.selectState = selectState;
        vm.selectCity = selectCity;
        vm.newModal = newModal;
        vm.postIsp = postIsp;
        vm.firstStepCompleted = firstStepCompleted;

        // second step
        vm.cancelModal = cancelModal;
        vm.saveGroupInProfile = saveGroupInProfile;
        vm.secondStepCompleted = secondStepCompleted;

        // third step
        vm.share = share; // share the results in twitter, facebook, etc

        vm.userData = {};

        vm.profile = {
          "media" : {
            "enabled": false,
          },
          "games" : {
            "enabled": false,
          },
          "cloud" : {
            "enabled": false,
          },
          "work" : {
            "enabled": false,
          }
        }

        activate();

        ////////////////

        function activate() {
            ProgressBarService.set(0); // initiate the progress bar (back to zero %)
            console.log('Home started')

            // Get user's ip
            IpService.get().then(function(response) {
              $rootScope.userIP = response
              vm.userData = {
                "userRegion" : {
                  "city" : response.city || undefined,
                  "state" : response.regionName || undefined
                },
                "isp" : {
                  "name": response.isp || undefined,
                  "plan": {
                    "region" : {
                      "city" : response.city || undefined,
                      "state" : response.region || undefined
                    },
                    "download": {
                      "unit": vm.speedUnits[1]
                    },
                    "upload": {
                      "unit": vm.speedUnits[1]
                    }
                  }
                }
              }
              selectState(response.region);
              incrementProgressBar();
            });

            //!!! CRIAR SERVICE
            $http.get('data/estados-cidades.json')
              .then(function (response) {
                var result = response.data
                vm.states = result.estados;
                incrementProgressBar();
              })
              .catch(function (error) {
                console.log(error)
              });

            IspsService.getAll().then(function(response) {
                vm.isps = response
                console.log(vm.isps);
                incrementProgressBar();
            }); //!!! CRIAR SERVICE

        }

        ///////////////////
        // shared

        function prevStep() {
          vm.appStep -= 1;
          openTooltips();
        }
        function nextStep() {
          vm.appStep += 1;
          openTooltips();
          if (vm.firstStepCompleted()) {
            vm.postIsp(vm.userData.isp);
          }
        }

        /////////////////
        // intro

        function startCalc() {
          console.log('Calc initiated');
          vm.appStep = 1;
        }

        // first step
        function postIsp(isp) {
          var instance = {
            "name" : isp.name,
            "plans" : [isp.plan]
          }
          IspsService.postIsp(instance)
        }

        function selectState(estado) {
          vm.userData.isp.plan.region.state = estado;
          vm.userData.isp.plan.region.city = undefined;
          vm.cities = getCities(estado);
        }

        function selectCity(city) {
          vm.userData.isp.plan.region.city = city;
        }

        function firstStepCompleted() {
          if (vm.userData.isp){
            if (vm.userData.isp.plan.region.state && vm.userData.isp.plan.region.city) {
              if (vm.userData.isp.name) {
                if (vm.userData.isp.plan.download.speed && vm.userData.isp.plan.upload.speed) {
                  return true;
                }
              }
            }
          }
          return false;
        }

        //////////////////////
        // second step
        function saveGroupInProfile(group) {
          vm.profile[group].enabled=!vm.profile[group].enabled;
        }

        function saveModel() {
          ProfileFactory.saveModel(vm.profile);
        }

        function getModel() {
          vm.profile = ProfileFactory.getModel();
        }

        function newModal(name) {
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
        }

        function cancelModal(name) {
          vm.profile[name].enabled = false;
        }

        function secondStepCompleted() {
          if (vm.profile) {
            angular.forEach(vm.profile,function (group,index) {
              console.log(group, group.enabled)
              if (group.enabled) {
                return true;
              }
            })
          }
          return false;
        }

        //////////////////////
        // third step

        function share() {
          console.log('This will open a modal to post on facebook, twitter, whatever.')
        }

        function openTooltips() {
          vm.tooltipIsOpen = true;
          $timeout(function () {
            vm.tooltipIsOpen = false;
          }, 3000);
        }

        ////////////////////////
        //private functions

        function getCities(siglaEstado) {
          var found = $filter('filter')(vm.states, {sigla: siglaEstado}, true);
          if ( found && found.length) {
            return found[0].cidades;
          }
        }

        function incrementProgressBar() {
          currentWorkStep += 1;
          var progressRatio = (currentWorkStep / workSteps) * 100;
          ProgressBarService.set(progressRatio)
        }

    }
})();
