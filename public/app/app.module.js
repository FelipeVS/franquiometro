(function() {
    'use strict';

    angular
    .module('app', [
        /* Shared modules */
        'app.core',

        /* Feature areas */
        'app.main',
        'app.directives',
        'app.services'
    ]);
    angular
        .module('app.services', [
            'app.core'
        ]);
    angular
        .module('app.directives', [
            'app.core'
        ]);
})();
