(function() {
    
    'use strict';

    angular.module("app").controller("criancasController", criancasController);

    criancasController.$inject = ['$scope', 'criancasAPI'];

    function criancasController($scope, criancasAPI) {
    
        var vm = $scope;

        vm.tituloApp = "Listagem de crianças e adolescentes";
        vm.criancas = [];
        var carregarCriancas = function() {
            criancasAPI.getCriancas()
            .then(function(response) {
                vm.criancas = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.adicionarCrianca = function(crianca) {
            var novaCrianca = angular.copy(crianca);
            criancasAPI.saveCrianca(novaCrianca)
            .then(function(response) {
                delete vm.crianca;
                vm.criancaForm.$setPristine();
                carregarCriancas();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.removerCrianca = function(criancaParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            criancasAPI.removeCrianca(criancaParaRemover)
            .then(function(response) {
                carregarCriancas();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarCrianca = function(criancaParaEditar) {
            vm.crianca = angular.copy(criancaParaEditar);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };
        carregarCriancas();
    };
})();