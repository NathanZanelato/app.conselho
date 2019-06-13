(function() {

    'use strict';

    angular.module("app").controller("homeController", homeController);

    homeController.$inject = ['$scope', 'atendimentosAPI'];

    function homeController($scope, atendimentosAPI) {

        var vm = $scope;

        vm.tituloApp = "Agendamentos";

        vm.atendimentosAgendados = [];
        var carregarAtendimentosAgendados = function() {
            atendimentosAPI.getAgendados()
            .then(function(response) {
                vm.atendimentosAgendados = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.atendimentosAgendadosParaHoje = [];
        var carregarAtendimentosAgendadosParaHoje = function() {
            atendimentosAPI.getAgendadosParaHoje()
            .then(function(response) {
                vm.atendimentosAgendadosParaHoje = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        carregarAtendimentosAgendadosParaHoje();
        carregarAtendimentosAgendados();
    }

})();