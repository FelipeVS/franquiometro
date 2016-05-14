(function() {
    'use strict';

    angular
    .module('app', [
        /* Shared modules */
        'app.core',

        /* Feature areas */
        'app.main',

        'app.services'
    ]);
    angular
        .module('app.services', [
            'app.core'
        ]);
})();
