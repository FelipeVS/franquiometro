(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MediaController', MediaController);

    MediaController.$inject = ['ProfileFactory'];

    /* @ngInject */
    function MediaController(ProfileFactory) {
        var vm = this;
        vm.updateProfile = updateProfile;

        activate();

        ////////////////

        function activate() {
            console.log('Media started')
            vm.profile = ProfileFactory.getModel();
        }

        function updateProfile() {
          console.log(vm.profile);
          ProfileFactory.saveModel(vm.profile);
          vm.profile = ProfileFactory.getModel();
        }

    }
})();
