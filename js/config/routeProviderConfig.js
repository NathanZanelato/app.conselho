angular.module("app").config(AppConfig);

AppConfig.$inject = ['$routeProvider'];
function AppConfig($routeProvider) {
$routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .when('/conselheiras', {
        templateUrl: 'views/conselheiras.html',
        controller: 'conselheirasController'
    })
    .when('/criancas', {
        templateUrl: 'views/criancas.html',
        controller: 'criancasController'
    })
    .otherwise({redirectTo: "/"});
}

