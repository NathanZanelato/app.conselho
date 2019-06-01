(function() {

    'use strict';

    angular.module('app').filter('cpf', function() {
      return function(input) {
        var str = input + '';
        if(str.length <= 11){
          str = str.replace(/\D/g, '');
          str = str.replace(/(\d{3})(\d)/, "$1.$2");
          str = str.replace(/(\d{3})(\d)/, "$1.$2");
          str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }
        return str;
      };
    });

  })();