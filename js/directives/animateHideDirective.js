(function(){

    'use strict';

    angular.module("app").directive("animateHide", animateHide);

    function animateHide() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.animateHide, function(val) {
                    if(!val) {
                        element.animate({
                            "height": '100px',
                            "opacity": "1"
                        }, 300).show();
                    } else {
                        element.animate({
                            "height": '0px',
                            "opacity": "0"
                    }, 100, function() {
                        $(this).hide();
                    });
                }
              });
            }
        }
    }

})();