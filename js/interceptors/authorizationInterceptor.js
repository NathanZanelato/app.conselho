(function(){

    'use strict';

    angular.module("app").factory("authorizationInterceptor", authorizationInterceptor);

    authorizationInterceptor.$inject = ['$q', '$location'];

    function authorizationInterceptor($q, $location) {

        return {
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        }

    }

})();