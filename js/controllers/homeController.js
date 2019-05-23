(function() {

    'use strict';

    angular.module("app").controller("homeController", homeController);

    function homeController($scope) {
        $scope.texto = "Pagina principal";
    }

})();