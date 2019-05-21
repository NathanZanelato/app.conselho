angular.module("app").controller("indexController", function($scope) {
    $scope.anoAtual = new Date().getFullYear();
});