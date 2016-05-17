(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('appGroup', appGroup);

    /* @ngInject */
    function appGroup() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directives/appGroups.html',
            scope: {
              gicon: '=',
              gtitle: '=',
              gname: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctr) {
        }

    }

    Controller.$inject = ['$uibModal', 'ProfileFactory'];

    /* @ngInject */
    function Controller($uibModal, ProfileFactory) {
        var vm = this;
        vm.newModal = newModal;
        vm.cancelModal = cancelModal;

        activate();

        function activate() {
        }

        function newModal() {
          vm.enabled = true;

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/layout/modal/' + vm.gname + '/index.html',
            controller: capitalizeFirstLetter(vm.gname) + 'Controller as vm',
            size: 'lg'
          });
        }

        function cancelModal() {
          if (vm.disabling) {
            vm.enabled = false;
          } else {
            vm.disabling = true
          }
        }

        vm.closeModal = function closeModal() {
          vm.enabled = false;
        }

        // private functions

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
})();
