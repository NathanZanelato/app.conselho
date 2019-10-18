(function() {

    'use strict';

    angular.module("app").factory("ocorrenciasAPI", ocorrenciasAPI);

    function ocorrenciasAPI($http, configAPI) {

        var _getOcorrencias = function() {
            return $http.get(configAPI.resourceOcorrencias);
        };

        var _HistoricoOcorrenciasCrianca = function(idCrianca) {
            if (!idCrianca) { return [];}
            return $http.get(configAPI.resourceOcorrencias + "/crianca/" + idCrianca);
        };
    
        var _saveOcorrencia = function(ocorrencia) {
            if (!!ocorrencia.id) {
                return $http.put(configAPI.resourceOcorrencias + "/" + ocorrencia.id, ocorrencia);
            }
            return $http.post(configAPI.resourceOcorrencias, ocorrencia);
        };
    
        var _removeOcorrencia = function(ocorrenciaParaRemover) {
            var url = configAPI.resourceOcorrencias + "/" + ocorrenciaParaRemover.id;
            return $http.delete(url);
        }

        var _getProcedenciasDenuncias = function() {
            return $http.get(configAPI.resourceOcorrencias + "/procedenciasDenuncias");
        };

        var _getAgentesVioladores = function() {
            return $http.get(configAPI.resourceOcorrencias + "/agentesVioladores");
        };

        var _getRelatorioOcorrecias = function(filtro) {
            return $http.post(configAPI.resourceOcorrencias + "/relatorio_ocorrencias", filtro, {responseType: 'arraybuffer'});
        };

        var _getIndicadorOcorreciasPorSexo = function(filtro) {
            if (!filtro) { return [];}
            return $http.get(configAPI.resourceOcorrencias + "/indicadores/sexo/" + filtro);
        };

        var _getIndicadorOcorreciasPorRecorrencias = function(filtro) {
            if (!filtro) { return [];}
            return $http.get(configAPI.resourceOcorrencias + "/indicadores/recorrencia/" + filtro);
        };

        var _getIndicadorOcorreciasPorRecorrenciasMes = function(ano, mes) {
            if (!ano || !mes) { return [];}
            return $http.get(configAPI.resourceOcorrencias + "/indicadores/recorrencia/" + ano + "/" + mes);
        };

        return {
            getOcorrencias: _getOcorrencias,
            getProcedenciasDenuncias: _getProcedenciasDenuncias,
            getAgentesVioladores : _getAgentesVioladores,
            getHistoricoOcorrenciasCrianca : _HistoricoOcorrenciasCrianca,
            saveOcorrencia: _saveOcorrencia,
            removeOcorrencia: _removeOcorrencia,
            getRelatorioOcorrecias: _getRelatorioOcorrecias,
            getIndicadorOcorreciasPorSexo: _getIndicadorOcorreciasPorSexo,
            getIndicadorOcorreciasPorRecorrencias: _getIndicadorOcorreciasPorRecorrencias,
            getIndicadorOcorreciasPorRecorrenciasMes: _getIndicadorOcorreciasPorRecorrenciasMes
        };
    }

})();
