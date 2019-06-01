(function(){

    'use strict';

    angular.module("app").directive("cpfDir", CpfDir);

    function CpfDir() {
        return {
            link : function(scope, element, attrs) {
                var options = {
                    onKeyPress: function(val, e, field, options) {
                        putMask();
                    }
                }

                $(element).mask('000.000.000-00', options);

                function putMask() {
                    var mask;
                    var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara
                    if(cleanVal.length > 10) {//verifica a quantidade de digitos.
                        mask = "000.000.000-00";
                    } else {
                        mask = "000.000.000-00";
                    }
                    $(element).mask(mask, options);//aplica a mascara novamente
                }
            }
        }
    }

})();