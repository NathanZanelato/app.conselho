(function() {

    'use strict';

    angular.module("app").factory("ocorrenciasAPI", ocorrenciasAPI);

    function ocorrenciasAPI($http, configAPI) {

        var _getOcorrencias = function() {
            return $http.get(configAPI.resourceOcorrencias);
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

        return {
            getOcorrencias: _getOcorrencias,
            getProcedenciasDenuncias: _getProcedenciasDenuncias,
            getAgentesVioladores : _getAgentesVioladores,
            saveOcorrencia: _saveOcorrencia,
            removeOcorrencia: _removeOcorrencia,
            getRelatorioOcorrecias: _getRelatorioOcorrecias
        };
    }

})();
