(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('ProfileFactory', profileFactory);

    profileFactory.$inject = [];

    /* @ngInject */
    function profileFactory() {
        var service = {
            getProfile: getProfile,
            saveProfile: saveProfile,
            getAppModelByType: getAppModelByType,
            saveAppModelByType: saveAppModelByType
        };

        var profile = {
            "media" : {
                "enabled": false,
                "apps": {
                    "video": {
                        title: "Youtube, Vímeo, etc.",
                        enabled: false,
                        profile: {}
                    },
                    "streaming": {
                        title: "Netflix, Telecine Play, etc.",
                        enabled: false,
                        profile: {}
                    },
                    "photos" : {
                        title: "Flickr, DeviantART, Photobucket, etc.",
                        enabled: false,
                        profile: {}
                    }
                }
            },
            "games" : {
                "enabled": false,
                "apps": [

                ]
            },
            "cloud" : {
                "enabled": false,
                "apps": [

                ]
            },
            "work" : {
                "enabled": false,
                "apps": [

                ]
            }
        };

        return service;

        function getProfile(type) {
            console.log("Sending profile:", profile);
            if (type) {
                return profile[type]
            }
            return profile;
        }

        function saveProfile(type, data) {
            if (type) {
                profile[type] = data;
            } else {
                profile = data;
            }
            console.log("Profile saved:", profile);
        }

        function getAppModelByType(type, app) {
            console.log("Sending App profile:", profile[type][app]);
            return profile[type].apps[app];
        }

        function saveAppModelByType(type, app, data) {
            profile[type].apps[app] = data;
            console.log("App saved in profile:", data);
        }
    }
})();
