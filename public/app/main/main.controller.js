(function() {
    "use strict";

    angular
    .module("app.main")
    .controller("MainController", MainController);

    MainController.$inject = ["$rootScope", "$scope", "$timeout", "$interval", "$uibModal", "UserFactory", "IpService", "IspsService", "CityAndStateService", "ProfileFactory", "ProgressBarService", "$filter", "$http", "GeolocationService"];

    /* @ngInject */
    function MainController($rootScope, $scope, $timeout, $interval, $uibModal, UserFactory, IpService, IspsService, CityAndStateService, ProfileFactory, ProgressBarService, $filter, $http, GeolocationService) {

        // public
        var vm = this;
        vm.speeds = [1,2,3,5,8,10,15,20,25,35,50,100];
        vm.speedUnits = [ "Kbps", "Mbps", "Gbps"];

        //shared
        vm.hasGeolocationEnabled = hasGeolocationEnabled;

        // intro

        // fist step
        vm.selectState = selectState;
        vm.selectCity = selectCity;
        vm.newModal = newModal;
        vm.postIsp = postIsp;
        vm.firstStepCompleted = firstStepCompleted;
        vm.getLocation = getLocation;
        vm.locationStored = locationStored;

        // second step
        vm.cancelModal = cancelModal;
        vm.saveGroupInProfile = saveGroupInProfile;
        vm.secondStepCompleted = secondStepCompleted;

        // third step
        vm.share = share; // share the results in twitter, facebook, etc

        vm.userData = {};

        activate();

        ////////////////

        function activate() {
            ProgressBarService.set(0, 3); // initiate the progress bar (back to zero %), and define the overall number of tasks to track the progress

            // initiate user profile
            vm.profile = ProfileFactory.getProfile();

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
                ProgressBarService.increment();
            });

            CityAndStateService.getStates().then(function (response) {
                vm.states = response;
                ProgressBarService.increment();
            })

            IspsService.getAll().then(function(response) {
                vm.isps = response
                console.log(vm.isps);
                ProgressBarService.increment();
            });
        }   ///////////////END OF 'ACTIVATE'

        ///////////////////
        // shared

        function hasGeolocationEnabled() {
            if ("geolocation" in navigator) {
                return true
            } else {
                return false
            }
        }

        /////////////////
        // intro

        // first step
        function postIsp(isp) {
            var instance = {
            "name" : isp.name,
            "plans" : [isp.plan]
            }
            IspsService.find(isp).then(function (found) {
                if (found && found.length>0) {
                    found[0].name = isp.name;
                    angular.forEach(found[0].plans, function(plan, key) {
                        delete plan._id
                    })
                    console.log(found[0].plans)
                    found[0].plans.push(isp.plan)
                    console.log('Updating', found[0])
                    IspsService.updateIsp(JSON.stringify(found[0]))
                } else {
                    console.log('Creating', instance)
                    IspsService.postIsp(instance)
                }
            })
        }

        function selectState(estado) {
            vm.userData.isp.plan.region.state = estado;
            vm.userData.isp.plan.region.city = undefined;
            vm.cities = getCities(estado);
        }

        function selectCity(city) {
            vm.userData.isp.plan.region.city = city;
        }

        function getLocation() {
            ProgressBarService.set(0, 3);
            UserFactory.save(vm.userData);
            ProgressBarService.increment();
            GeolocationService.get().then(function(result) {
                UserFactory.setLocation(result);
                ProgressBarService.increment();
            }).then(function() {
                ProgressBarService.increment();
            });
        }

        function locationStored() {
            if (vm.userData.userRegion && vm.userData.userRegion.neighborhood) {
                return true
            }
            return false
        }

        function firstStepCompleted() {
          if (vm.userData.isp && vm.userData.isp.plan.region && vm.userData.isp.plan.region.state && vm.userData.isp.plan.region.city){
                if (vm.userData.isp.name) {
                    if (vm.userData.isp.plan.download && vm.userData.isp.plan.download.speed && vm.userData.isp.plan.upload && vm.userData.isp.plan.upload.speed) return true;
                }
          }
          return false;
        }

        //////////////////////
        // second step
        function saveGroupInProfile(group) {
            vm.profile[group].enabled=!vm.profile[group].enabled;
        }

        function saveProfile() {
            ProfileFactory.saveProfile(vm.profile);
        }

        function getProfile() {
            vm.profile = ProfileFactory.getProfile();
        }

        function newModal(name) {
            vm.profile[name].enabled = true;
            ProfileFactory.saveProfile(vm.profile);
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
                if (vm.profile.media.enabled || vm.profile.games.enabled || vm.profile.cloud.enabled || vm.profile.work.enabled ) return true;
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

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function getCities(siglaEstado) {
            var found = $filter('filter')(vm.states, {sigla: siglaEstado}, true);
            if ( found && found.length) {
                return found[0].cidades;
            }
        }
    }
})();
