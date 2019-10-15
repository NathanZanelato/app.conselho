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

        vm.carregaOcorrencias = function(){
            //console.log('mudou: ' + vm.anoSelected);
            ocorrenciasAPI.getIndicadorOcorreciasPorSexo(vm.anoSelected)
            .then(function(response) {
               // console.log(response.data);
                var mes = 0;
                response.data.forEach(item => {
                    //console.log(mes + ')' + item.sexo + " = " + item.quantidade);
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

        /*var chartBySexo1 = new Chart(document.getElementById('chartBySexo1'), {
            type: 'bar',
            data: {
          
                datasets: [
                    {
                        label: 'Sexo feminino',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)'],
                        borderWidth: 1
                    },
                    {
                        label: 'Sexo masculino',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: ['rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)'],
                        borderColor: ['rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)','rgba(54, 162, 235, 1)'],
                        borderWidth: 1
                    },
                    {
                        label: 'Outros',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: ['rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)','rgba(255, 206, 86, 0.2)'],
                        borderColor: ['rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)','rgba(255, 206, 86, 1)'],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });*/


        listarAnos();
        vm.carregaOcorrencias(vm.anoSelected);
    };

})();