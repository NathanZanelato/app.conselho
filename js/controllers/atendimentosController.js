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

        vm.sugereRelato = function(atendimento) {
            if (!!atendimento.relato) { 
                var msg = atendimento.relato.substring(atendimento.relato.indexOf('Agendado atendimento da criança: '), 
                                                    atendimento.relato.indexOf($filter('date')(atendimento.dhAtendimento, "dd/MM/yyyy") + '.')+11);
                atendimento.relato = atendimento.relato.replace(msg , '');
                var msg = atendimento.relato.substring(atendimento.relato.indexOf('Agendado atendimento da criança: '), 
                                                    atendimento.relato.indexOf('.')+1);
                atendimento.relato = atendimento.relato.replace(msg , '');
            }
            if (atendimento.possuiAgendamento === 'S' && !!atendimento.ocorrencia) {
                atendimento.relato = (!!atendimento.relato ? atendimento.relato : '')
                                     + 'Agendado atendimento da criança: ' + atendimento.ocorrencia.crianca.nome 
                                     + ', no endereço: ' + atendimento.ocorrencia.crianca.endereco
                                     + (!!atendimento.dhAtendimento ? ', às ' + $filter('date')(atendimento.dhAtendimento, "HH:mm") + ' horas do dia ' + $filter('date')(atendimento.dhAtendimento, "dd/MM/yyyy") + '.' : '.');
            }
        }
    
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
            vm.atendimento.dhAtendimento = new Date(atendimentoParaEditar.dhAtendimento);
        };
        vm.detalhar = function(ocorrenciaParaDetalhar) {
            vm.ocorrencia = angular.copy(ocorrenciaParaDetalhar);
            vm.dhRegistro = $filter('date')(ocorrenciaParaDetalhar.dhRegistro, "dd/MM/yyyy HH:mm");
            vm.ocorrencia.dhOcorrencia = convertData(ocorrenciaParaDetalhar.dhOcorrencia);
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
        carregarAgentesVioladores();
        carregarProcedenciasDenuncias();
    };
})();