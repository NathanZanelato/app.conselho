(function() {
    
    'use strict';

    angular.module("app").controller("relatorioOcorrenciasController", relatorioOcorrenciasController);

    relatorioOcorrenciasController.$inject = ['$scope', 'ocorrenciasAPI', $sce];

    function relatorioOcorrenciasController($scope, ocorrenciasAPI, $sce) {
    
        var vm = $scope;
        vm.tituloApp = "Relatório de ocorrências";
        vm.filtro = {};
        vm.enviar = enviar;
        vm.resetView = resetView;
        vm.trustSrc = trustSrc;
        vm.report = null;

        function enviar(filtro) {
            delete vm.report;
            var filtro = angular.copy(filtro);
            ocorrenciasAPI.getRelatorioOcorrecias(filtro)
            .then(function(response) {
                var file = new Blob([response.data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                vm.report = fileURL;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data && !!response.data.error ? response.data.error : mensagem;
            });
        };

        function resetView() {
            vm.filtro = {};
            delete vm.report;
        }
        
        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        };
    };

  
})();