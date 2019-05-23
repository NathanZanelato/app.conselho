(function() {

    'use strict';

    angular.module("app").factory("criancasAPI", criancasAPI);

    function criancasAPI($http, configAPI) {

        var _getCriancas = function() {
            return $http.get(configAPI.resourceCriancas);
        };
    
        var _saveCrianca = function(crianca) {
            if (!!crianca.id) {
                return $http.put(configAPI.resourceCriancas + "/" + crianca.id, crianca);
            }
            return $http.post(configAPI.resourceCriancas, crianca);
        };
    
        var _removeCrianca = function(criancaParaRemover) {
            var url = configAPI.resourceCriancas + "/" + criancaParaRemover.id;
            return $http.delete(url);
        }
    
        return {
            getCriancas: _getCriancas,
            saveCrianca: _saveCrianca,
            removeCrianca: _removeCrianca
        };
    }

})();
