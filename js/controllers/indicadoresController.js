(function() {
    
    'use strict';

    angular.module("app").controller("indicadoresController", indicadoresController);

    indicadoresController.$inject = ['$scope', 'ocorrenciasAPI'];

    function indicadoresController($scope, ocorrenciasAPI) {
    
        var vm = $scope;
        vm.tituloApp = "Indicadores";
        vm.anos = [];
        vm.labels = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                     'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
                    ];
        vm.series = ['Sexo feminino', 'Sexo masculino', 'Outros'];
        vm.colours = [
            {
                'fillColor': 'rgba(255, 99, 132, 0.2)',
                'strokeColor': 'rgba(255, 99, 132, 1)',
                'pointColor': 'rgba(54, 162, 235, 0.2)',
                'pointStrokeColor': '#7f7f7f',
                'pointHighlightFill': '#7f7f7f',
                'pointHighlightStroke': 'rgba(47, 132, 71, 0.8)'
            },
            {
                'fillColor': 'rgba(54, 162, 235, 0.2)',
                'strokeColor': 'rgba(54, 162, 235, 1)',
                'pointColor': 'rgba(54, 162, 235, 0.2)',
                'pointStrokeColor': '#7f7f7f',
                'pointHighlightFill': '#7f7f7f',
                'pointHighlightStroke': 'rgba(151,187,205,0.8)'
            },
            {
                'fillColor': 'rgba(255, 206, 86, 0.2)',
                'strokeColor': 'rgba(255, 206, 86, 1)',
                'pointColor': 'rgba(255, 206, 86, 0.2)',
                'pointStrokeColor': '#7f7f7f',
                'pointHighlightFill': '#7f7f7f',
                'pointHighlightStroke': 'rgba(151,187,205,0.8)'
            }
        ];
        vm.data = [[],[],[]];

        var listarAnos = function() {
            var anoAtual = new Date().getFullYear();
            vm.anoSelected = anoAtual;
            vm.anos = [anoAtual, --anoAtual, -- anoAtual, --anoAtual, --anoAtual, --anoAtual, --anoAtual, --anoAtual, --anoAtual, --anoAtual, --anoAtual];
        }

        vm.opcoes = [1, 3, 6, 12, 24, 36, 48, 60, 72, 84];
        vm.qtdMeses = 84;

        vm.carregaIndicadoresPorSexo = function(){
            ocorrenciasAPI.getIndicadorOcorreciasPorSexo(vm.anoSelected)
            .then(function(response) {
                var mes = 0;
                response.data.forEach(item => {
                    if (item.sexo === 'F') {
                        vm.data[0][mes] = item.quantidade;
                    } else if (item.sexo === 'M') {
                        vm.data[1][mes] = item.quantidade;
                    } else {
                        vm.data[2][mes] = item.quantidade;
                    }
                    if (item.sexo === 'O') {
                        mes = mes + 1;
                    }
                });
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        }

        vm.carregaIndicadoresPorRecorrencias = function(){
            ocorrenciasAPI.getIndicadorOcorreciasPorRecorrencias(vm.qtdMeses)
            .then(function(response) {
                var quantidades = [];
                var labels = [];
                response.data.forEach(item => {
                    quantidades.push(item.qtdCriancas);
                    labels.push('Criança(s) com ' + item.totalOcorrencias + (item.totalOcorrencias === 1 ? ' ocorrência' : ' ocorrências'));
                });
                vm.dataPie = quantidades;
                vm.labelsPie = labels;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        }

        listarAnos();
        vm.carregaIndicadoresPorSexo();
        vm.carregaIndicadoresPorRecorrencias();
    };

})();