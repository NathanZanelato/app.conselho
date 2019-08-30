(function() {
    
    'use strict';

    angular.module("app").controller("ocorrenciasController", ocorrenciasController);

    ocorrenciasController.$inject = ['$scope', '$filter', 'ocorrenciasAPI', 'conselheirasAPI', 'criancasAPI'];

    function ocorrenciasController($scope, $filter, ocorrenciasAPI, conselheirasAPI, criancasAPI) {
    
        var vm = $scope;

        vm.tituloApp = "Listagem de ocorrências";
        vm.ocorrencias = [];
        vm.hide = true; 
        var maxId = 0;
        var carregarOcorrencias = function() {
            ocorrenciasAPI.getOcorrencias()
            .then(function(response) {
                vm.ocorrencias = response.data;

                if (vm.ocorrencias.length === 0) {
                    maxId = 0;
                } else if (vm.ocorrencias.length === 1) {
                    maxId = vm.ocorrencias[0].id;
                } else {
                    var ocorrenciaMaiorId = vm.ocorrencias.reduce(function(a, b) {
                        return Math.max(a.id, b.id);
                    });
                    maxId = ocorrenciaMaiorId.id;
                }
                vm.proximoId = (maxId || 0)  + 1;
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

        vm.procedenciasDenuncias = [];
        var carregarProcedenciasDenuncias = function() {
            ocorrenciasAPI.getProcedenciasDenuncias()
            .then(function(response) {
                vm.procedenciasDenuncias = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.agentesVioladores = [];
        var carregarAgentesVioladores = function() {
            ocorrenciasAPI.getAgentesVioladores()
            .then(function(response) {
                vm.agentesVioladores = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.historicoOcorrenciasCrianca = [];
        vm.carregaHistoricoOcorrenciasCrianca = function(idCrianca) {
            vm.historicoOcorrenciasCrianca = [];
            ocorrenciasAPI.getHistoricoOcorrenciasCrianca(idCrianca)
            .then(function(response) {
                vm.historicoOcorrenciasCrianca = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        }

        vm.adicionarOcorrencia = function(ocorrencia) {
            var novaOcorrencia = angular.copy(ocorrencia);
            var dhRegistro = new Date();
            novaOcorrencia.dhRegistro = convertData(dhRegistro.getTime());
            ocorrenciasAPI.saveOcorrencia(novaOcorrencia)
            .then(function(response) {
                delete vm.ocorrencia;
                delete vm.dhRegistro;
                vm.ocorrenciaForm.$setPristine();
                carregarOcorrencias();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.removerOcorrencia = function(ocorrenciaParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            ocorrenciasAPI.removeOcorrencia(ocorrenciaParaRemover)
            .then(function(response) {
                carregarOcorrencias();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarOcorrencia = function(ocorrenciaParaEditar) {
            vm.ocorrencia = angular.copy(ocorrenciaParaEditar);
            vm.dhRegistro = $filter('date')(ocorrenciaParaEditar.dhRegistro, "dd/MM/yyyy HH:mm");
            vm.ocorrencia.dhOcorrencia = convertData(ocorrenciaParaEditar.dhOcorrencia);
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
        carregarConselheiras();
        carregarCriancas();
        carregarOcorrencias();
        carregarAgentesVioladores();
        carregarProcedenciasDenuncias();

    };
})();