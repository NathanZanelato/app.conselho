(function() {

    'use strict';

    angular.module("app").factory("atendimentosAPI", atendimentosAPI);

    function atendimentosAPI($http, configAPI) {

        var _getAtendimentos = function() {
            return $http.get(configAPI.resourceAtendimentos);
        };


        var _getAgendados = function() {
            return $http.get(configAPI.resourceAtendimentos + '/agendados');
        };

        var _getAgendadosParaHoje = function() {
            return $http.get(configAPI.resourceAtendimentos + '/agendados-para-hoje');
        };
    
        var _saveAtendimento = function(atendimento) {
            if (!!atendimento.id) {
                return $http.put(configAPI.resourceAtendimentos + "/" + atendimento.id, atendimento);
            }
            return $http.post(configAPI.resourceAtendimentos, atendimento);
        };
    
        var _removeAtendimento = function(atendimentoParaRemover) {
            var url = configAPI.resourceAtendimentos + "/" + atendimentoParaRemover.id;
            return $http.delete(url);
        }

        var _getMedidasAplicadas = function() {
            return $http.get(configAPI.resourceAtendimentos + "/medidasAplicadas");
        };

        var _getDireitosViolados = function() {
            return $http.get(configAPI.resourceAtendimentos + "/direitosViolados");
        };

        return {
            getAtendimentos: _getAtendimentos,
            getAgendadosParaHoje : _getAgendadosParaHoje,
            getAgendados : _getAgendados,
            getMedidasAplicadas: _getMedidasAplicadas,
            getDireitosViolados : _getDireitosViolados,
            saveAtendimento: _saveAtendimento,
            removeAtendimento: _removeAtendimento
        };
    }

})();
