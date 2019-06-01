(function() {
    
    'use strict';

    angular.module("app").controller("atendimentosController", atendimentosController);

    atendimentosController.$inject = ['$scope', '$filter', 'atendimentosAPI', 'ocorrenciasAPI', 'conselheirasAPI'];

    function atendimentosController($scope, $filter, atendimentosAPI, ocorrenciasAPI, conselheirasAPI) {
    
        var vm = $scope;

        vm.tituloApp = "Listagem de atendimentos";
        vm.atendimentos = [];

        var carregarAtendimentos = function() {
            atendimentosAPI.getAtendimentos()
            .then(function(response) {
                vm.atendimentos = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
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

        vm.ocorrencias = [];
        var carregarOcorrencias = function() {
            ocorrenciasAPI.getOcorrencias()
            .then(function(response) {
                vm.ocorrencias = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.medidasAplicadas = [];
        var carregarMedidasAplicadas = function() {
            atendimentosAPI.getMedidasAplicadas()
            .then(function(response) {
                vm.medidasAplicadas = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.direitosViolados = [];
        var carregarDireitosViolados = function() {
            atendimentosAPI.getDireitosViolados()
            .then(function(response) {
                vm.direitosViolados = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.adicionarAtendimento = function(atendimento) {
            var novoAtendimento = angular.copy(atendimento);
            var dhRegistro = new Date();
            novoAtendimento.dhRegistro = convertData(dhRegistro.getTime());
            atendimentosAPI.saveAtendimento(novoAtendimento)
            .then(function(response) {
                delete vm.atendimento;
                delete vm.dhRegistro;
                vm.atendimentoForm.$setPristine();
                carregarAtendimentos();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.removerAtendimento = function(atendimentoParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            atendimentosAPI.removeAtendimento(atendimentoParaRemover)
            .then(function(response) {
                carregarAtendimentos();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarAtendimento = function(atendimentoParaEditar) {
            vm.atendimento = angular.copy(atendimentoParaEditar);
            vm.dhRegistro = $filter('date')(atendimentoParaEditar.dhRegistro, "dd/MM/yyyy HH:mm");
        };
        var convertData = function(dataLong) {
            if (!dataLong) {
                return;
            }
            return new Date(dataLong);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };

        vm.now = $filter('date')(new Date, "dd/MM/yyyy HH:mm");
        carregarAtendimentos();
        carregarOcorrencias();
        carregarConselheiras();
        carregarMedidasAplicadas();
        carregarDireitosViolados();

    };
})();