(function() {
    'use strict';

    angular
    .module('app')
    .run(runBlock);

    runBlock.$inject = ['IspsService'];

    function runBlock(IspsService) {

        // var isp = {
        //   "name": "GVT",
        //   "plans": [
        //     {
        //       "download": {
        //         "speed": 35,
        //         "unit": "Mbps"
        //       },
        //       "upload": {
        //         "speed": 3,
        //         "unit": "Mbps"
        //       }
        //     }
        //   ]
        // };

        activate();

        function activate() {

          // console.log(isp)
          // IspsService.postIsp(isp);

        }
    }
})();
