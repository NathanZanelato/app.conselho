(function() {

    'use strict';

    angular.module("app").value("configAPI", {
        resourceLogin: "http://localhost:8080/api.conselho/logar",
        resourceConselheiras: "http://localhost:8080/api.conselho/conselheiras",
        resourceCriancas: "http://localhost:8080/api.conselho/criancas",
        resourceOcorrencias: "http://localhost:8080/api.conselho/ocorrencias"
    });

})();
