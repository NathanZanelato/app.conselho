(function() {
    
    'use strict';

    angular.module("app").controller("relatorioOcorrenciasController", relatorioOcorrenciasController);

    relatorioOcorrenciasController.$inject = ['$scope', 'ocorrenciasAPI'];

    function relatorioOcorrenciasController($scope, ocorrenciasAPI) {
    
        var vm = $scope;
        vm.tituloApp = "Relatório de ocorrências";
        vm.filtro = {};
        vm.enviar = enviar;

        function enviar(filtro) {
            var filtro = angular.copy(filtro);
            ocorrenciasAPI.getRelatorioOcorrecias(filtro)
            .then(function(response) {
                console.log(response.data);
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    };
  
})();