(function() {
    
    'use strict';
  
    angular.module('app').factory('loginService', loginService);
  
    function loginService($http, configAPI, $localStorage) {

      var login = {};
  
      login.logar = logar;
      login.sair = sair;
  
      return login;
  
      function logar(auth, callback) {
        $http.post(configAPI.resourceLogin, auth)
          .then(function(response) {
            if (response.data.token) {

              $localStorage.currentUser = {
                username: response.data.usuario.username,
                idUsuario: response.data.usuario.id,
                token: response.data.token
              };
  
              $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
  
              callback(true);
            } else {
              callback(false);
            }
          });
      }
  
      function sair() {
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
      }
    }

})();