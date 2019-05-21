angular.module("app").factory("conselheirasAPI", function($http, configAPI) {
    var _getConselheiras = function() {
        return $http.get(configAPI.resourceConselheiras);
    };

    var _saveConselheira = function(conselheira) {
        if (!!conselheira.id) {
            return $http.put(configAPI.resourceConselheiras + "/" + conselheira.id, conselheira);
        }
        return $http.post(configAPI.resourceConselheiras, conselheira);
    };

    var _removeConselheira = function(conselheiraParaRemover) {
        var url = configAPI.resourceConselheiras + "/" + conselheiraParaRemover.id;
        return $http.delete(url);
    }

    return {
        getConselheiras: _getConselheiras,
        saveConselheira: _saveConselheira,
        removeConselheira: _removeConselheira
    };
});