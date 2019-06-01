(function(){

    'use strict';

    angular.module("app").config(interceptorsApp);

    interceptorsApp.$inject = ['$httpProvider'];

    function interceptorsApp ($httpProvider) {
        $httpProvider.interceptors.push("authorizationInterceptor");
    }

})();
