(function(){
    
    'use strict';
    
    angular.module("app").controller("indexController", indexController);

    indexController.$inject = ['$scope', '$localStorage'];

    function indexController($scope, $localStorage) {

        var vm = $scope;
        vm.currentUser = currentUser;
        vm.anoAtual = new Date().getFullYear();


        function currentUser() {
            return $localStorage.currentUser;
        }

    }

})();
