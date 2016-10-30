(function() {
    "use strict";

    angular
    .module("app.main")
    .controller("MediaController", mediaController);

    mediaController.$inject = ["$scope", "$uibModalInstance", "ProfileFactory"];

    /* @ngInject */
    function mediaController($scope, $uibModalInstance, ProfileFactory) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.selectTab = selectTab;
        vm.removeTab = removeTab;
        vm.closeModal = closeModal;
        vm.isMediaCompleted = isMediaCompleted;

        // $scope.$watch(function() {
        //     return JSON.stringify([vm.mediaProfile.apps.video, vm.mediaProfile.apps.streaming, vm.mediaProfile.apps.photos]);
        // },
        // function(current, original) {
        //     console.log(current, original)
        // });

        activate();

        ////////////////

        function activate() {
            // WARNING: ORDER (index) IS IMPORTANT
            vm.mediaProfile = ProfileFactory.getProfile("media");
            console.log(vm.mediaProfile);
        }

        function updateProfile(type, app) {
            var groupName = type + "Profile";

            ProfileFactory.saveAppModelByType(type, app, vm[groupName].apps[app]);
            console.log(ProfileFactory.getProfile())
        }

        function selectTab(type) {
            vm.mediaProfile.apps[type].enabled = true;
        }

        function removeTab(type) {
            vm.mediaProfile.apps[type].profile = undefined;
            vm.mediaProfile.apps[type].enabled = false;
        }

        function closeModal() {
            $uibModalInstance.close();
        }

        function isMediaCompleted() {
            if (
                vm.mediaProfile.apps.video.profile && vm.mediaProfile.apps.video.profile.dailyVideos && vm.mediaProfile.apps.video.profile.resolution && vm.mediaProfile.apps.video.profile.duration ||
                vm.mediaProfile.apps.streaming.profile && vm.mediaProfile.apps.streaming.profile.dailyVideos && vm.mediaProfile.apps.streaming.profile.resolution && vm.mediaProfile.apps.streaming.profile.duration ||
                vm.mediaProfile.apps.photos.profile && vm.mediaProfile.apps.photos.profile.dailyVideos && vm.mediaProfile.apps.photos.profile.resolution && vm.mediaProfile.apps.photos.profile.duration
            ) {
                return true;
            }
            return false;
        }

    }
})();
