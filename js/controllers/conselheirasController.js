(function() {
    
    'use strict';

    angular.module("app").controller("conselheirasController", conselheirasController);

    conselheirasController.$inject = ['$scope', 'conselheirasAPI'];

    function conselheirasController($scope, conselheirasAPI) {
    
        var vm = $scope;

        vm.tituloApp = "Listagem de conselheiras";
        vm.conselheiras = [];
        var carregarConselheiras = function() {
            conselheirasAPI.getConselheiras()
            .then(function(response) {
                vm.conselheiras = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.adicionarConselheira = function(conselheira) {
            var novaConselheira = angular.copy(conselheira);
            conselheirasAPI.saveConselheira(novaConselheira)
            .then(function(response) {
                delete vm.conselheira;
                vm.conselheiraForm.$setPristine();
                carregarConselheiras();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.removerConselheira = function(conselheiraParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            conselheirasAPI.removeConselheira(conselheiraParaRemover)
            .then(function(response) {
                carregarConselheiras();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarConselheira = function(conselheiraParaEditar) {
            vm.conselheira = angular.copy(conselheiraParaEditar);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };
        carregarConselheiras();
    };
})();