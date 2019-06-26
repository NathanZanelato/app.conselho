(function() {

    'use strict';

    angular.module("app").config(AppConfig).run(run);

    AppConfig.$inject = ['$routeProvider'];

    function AppConfig($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/conselheiras', {
                templateUrl: 'views/conselheiras.html',
                controller: 'conselheirasController'
            })
            .when('/criancas', {
                templateUrl: 'views/criancas.html',
                controller: 'criancasController'
            })
            .when('/ocorrencias', {
                templateUrl: 'views/ocorrencias.html',
                controller: 'ocorrenciasController'
            })
            .when('/atendimentos', {
                templateUrl: 'views/atendimentos.html',
                controller: 'atendimentosController'
            })
            .when('/rel-ocorrencias', {
                templateUrl: 'views/rel_ocorrencias.html',
                controller: 'relatorioOcorrenciasController'
            })
            .otherwise({redirectTo: "/"});
    }
    
    function run($rootScope, $http, $location, $localStorage) {
        // aqui é para manter o usuário logado mesmo se for atualizar a página:
        if ($localStorage.currentUser) {
          $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
    
        //Aqui iremos redirecionar para a página de Login, caso o usuário não esteja logado:
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
          var paginasPublicas = ['/login'];
          var paginaRestrita = paginasPublicas.indexOf($location.path()) === -1;
    
          if (paginaRestrita && !$localStorage.currentUser) {
            $location.path('/login');
          }
        });
      }

})();