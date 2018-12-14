//Ковалевич А. А.
var A = [], B = [], C = [];
var p, m, q, n= 1;
var time = 0;
var compare = 1,
    multi = 1,
    addition = 1,
    difference = 1,
    div = 1,
    abs = 1,
    exp = 1;
var T1;
var Ky = 0;
const LOW_LIMIT = -1;
const HIGH_LIMIT = 1;


function f(i, j, k) {
    return (Math.abs(A[i][k]) <= Math.abs(B[k][j]) ? A[i][k] * B[k][j] : (B[i][k] === 0 ? Math.pow(A[i][k],2) + B[k][j] :  Math.pow(A[i][k],2) - Math.abs(A[i][k] * B[k][j]) ));
}

function timeCounting(n, p, m, q) {
    var t = 0;
    var N = Math.ceil(m / n);
    t += fTime() * N;
    t += Math.ceil((m - 1) / n ) * parseInt(addition);
    return t * p * q;
}

var fTime = function(){
    return parseInt(multi) * 2 + parseInt(abs) * 3 +
        parseInt(compare) * 2  + parseInt(difference) + parseInt(addition) + parseInt(exp) * 2;
};



function D(n, p, m, q) {
    return Lsum(n, p, m, q) / Lavg(n, p, m, q);
}


var Lsum = function (n, p, m, q) {
    var d = 0;
    var Nf = Math.ceil(m / n);
    d += Nf * fTime();
    d += Math.ceil((m - 1) / n ) * parseInt(addition);
    return d * p * q;
};


var Lavg = function (n, p, m, q) {
    var d = 0;
    var Nf = Math.floor(m / n);
    d += n * Nf *fTime();
    d += fTime() * (m  - Nf * n);
    var Nt = Math.floor((m - 1) / n);
    d += Nt * parseInt(addition);
    d+= parseInt(addition) * (m  - Nt * n);
    return 1/m * (d * p * q);
};

$(document).ready(function(){

    google.charts.load('current', {'packages': ['line']});
    p=parseInt($('#p').val());
    m=parseInt($('#m').val());
    q=parseInt($('#q').val());
    n=parseInt($('#n').val());
    add = parseInt($('#add').val());
    sub = parseInt($('#sub').val());
    comp = parseInt($('#comp').val());
    mult = parseInt($('#mult').val());
    div = parseInt($('#div').val());
    mod = parseInt($('#mod').val());

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Количество процессорных элементов n');
        addCol('r = ', 20);
        function addCol(str, n) {
            for (var i = 1; i <= n; i++)
                data.addColumn('number', (str + i).toString());
        }

        var ROWS = [];
        addRows(20, 25);
        function addRows(n, r) {
            for (var i = 1; i <= r; i++) {
                var row = [i];
                for (var k = 1; k <= n; k++) {
                    row.push(computeKy(i, p, k, q))
                }
                ROWS.push(row);
            }
        }

        function computeKy(n, p, m, q) {
            return timeCounting(1, p, m, q) / timeCounting(n, p, m, q);
        }

        console.log(ROWS);
        data.addRows(ROWS);

        var options = {
            chart: {
                title: 'Коэффициент усорения Ky',
                subtitle: 'от количества процессорных элементов n'
            },
            legend: {
                position: 'right',
                textStyle: {
                    fontSize: 10
                }
            },
            width: 1100,
            height: 700
        };

        var chart = new google.charts.Line(document.getElementById('table-1'));
        chart.draw(data, google.charts.Line.convertOptions(options));

    }

    function drawer() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Ранг задачи r');
        function addCol(str, n) {
            for (var i = 1; i <= n; i++)
                data.addColumn('number', (str + i).toString());
        }

        addCol('n = ', 25);
        var ROWS = [];

        function addRows(n, r) {
            for (var i = 1; i <= r; i++) {
                var row = [i];
                for (var k = 1; k <= n; k++) {
                    row.push(computeKy(k, p, i, q))
                }
                ROWS.push(row);
            }
        }

        function computeKy(n, p, m, q) {
            return timeCounting(1, p, m, q) / timeCounting(n, p, m, q);
        }

        addRows(25, 120);
        data.addRows(ROWS);
        var options = {
            chart: {
                title: 'Коэффициент усорения Ky',
                subtitle: 'от ранга задачи r'
            },
            legend: {
                position: 'right',
                textStyle: {
                    fontSize: 10
                }
            },
            width: 1100,
            height: 700
        };

        var chart = new google.charts.Line(document.getElementById('table-2'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }

    function drawChartE() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Количество процессорных элементов n');
        addCol('r = ', 20);
        function addCol(str, n) {
            for (var i = 1; i <= n; i++)
                data.addColumn('number', (str + i).toString());
        }

        var ROWS = [];
        addRows(20, 120);
        function addRows(n, r) {
            for (var i = 1; i <= r; i++) {
                var row = [i];
                for (var k = 1; k <= n; k++) {
                    row.push(computeKy(i, p, k, q) / i);
                }
                ROWS.push(row);
            }
        }

        function computeKy(n, p, m, q) {
            return timeCounting(1, p, m, q) / timeCounting(n, p, m, q);
        }

        console.log(ROWS);
        data.addRows(ROWS);

        var options = {
            chart: {
                title: 'Эффективность е',
                subtitle: 'от количества процессорных элементов n'
            },
            legend: {
                position: 'right',
                textStyle: {
                    fontSize: 10
                }
            },
            width: 1100,
            height: 700
        };

        var chart = new google.charts.Line(document.getElementById('table-3'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }

    function drawerE() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Ранг задачи r');
        function addCol(str, n) {
            for (var i = 1; i <= n; i++)
                data.addColumn('number', (str + i).toString());
        }

        addCol('n = ', 25);
        var ROWS = [];

        function addRows(n, r) {
            for (var i = 1; i <= r; i++) {
                var row = [i];
                for (var k = 1; k <= n; k++) {
                    row.push(computeKy(k, p, i, q) / k)
                }
                ROWS.push(row);
            }
        }

        function computeKy(n, p, m, q) {
            return timeCounting(1, p, m, q) / timeCounting(n, p, m, q);
        }

        addRows(25, 120);
        data.addRows(ROWS);
        var options = {
            chart: {
                title: 'Эффективность е',
                subtitle: 'от ранга задачи r'
            },
            legend: {
                position: 'right',
                textStyle: {
                    fontSize: 10
                }
            },
            width: 1100,
            height: 700
        };

        var chart = new google.charts.Line(document.getElementById('table-4'));
        chart.draw(data, google.charts.Line.convertOptions(options));

    }

    function drawChartD() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Количество процессорных элементов n');
        addCol('r = ', 20);
        function addCol(str, n) {
            for (var i = 1; i <= n; i++)
                data.addColumn('number', (str + i).toString());
        }

        var ROWS = [];
        addRows(20, 25);
        function addRows(n, r) {
            for (var i = 1; i <= r; i++) {
                var row = [i];
                for (var k = 1; k <= n; k++) {
                    row.push(D(i, p, k, q));
                }
                ROWS.push(row);
            }
        }

        data.addRows(ROWS);

        var options = {
            chart: {
                title: 'Коэффициент расхождения программы D',
                subtitle: 'от количества процессорных элементов n'
            },
            legend: {
                position: 'right',
                textStyle: {
                    fontSize: 10
                }
            },
            width: 1100,
            height: 700
        };

        var chart = new google.charts.Line(document.getElementById('table-5'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }

    function drawerD() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Ранг задачи r');
        function addCol(str, n) {
            for (var i = 1; i <= n; i++)
                data.addColumn('number', (str + i).toString());
        }

        addCol('n = ', 25);
        var ROWS = [];

        function addRows(n, r) {
            for (var i = 1; i <= r; i++) {
                var row = [i];
                for (var k = 1; k <= n; k++) {
                    row.push(D(k, p, i, q))
                }
                ROWS.push(row);
            }
        }

        addRows(25, 90);
        data.addRows(ROWS);
        var options = {
            chart: {
                title: 'Коэффициент расxождения прогрммы D',
                subtitle: 'от ранга задачи r'
            },
            legend: {
                position: 'right',
                textStyle: {
                    fontSize: 10
                }
            },
            width: 1100,
            height: 700
        };

        var chart = new google.charts.Line(document.getElementById('table-6'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }

    $('#clean').click(function () {
        drawChart();
        drawer();
        drawChartE();
         drawerE();
        //document.getElementById('test').src=a[0];
        drawChartD();
        drawerD()
    });



    $("input").on('keyup', function(){
        $(this).val($(this).val().replace (/\D/, ''));
    });

    $('#start').click(function() {
        p=$('#p').val();
        m=$('#m').val();
        q=$('#q').val();
        n=parseInt($('#n').val());

        comp = parseInt($('#comp').val());
        mult = parseInt($('#mult').val());
        add = parseInt($('#add').val());
        sub = parseInt($('#sub').val());
        div = parseInt($('#div').val());
        mod = parseInt($('#mod').val());

        console.log("Время выполнения: "+time + "    Ky: " +
            Ky.toFixed(4) + "    e: " + (Ky / n).toFixed(4) +
            "   D: " + D(n, parseInt(p), parseInt(m), parseInt(q)).toFixed(4));
    });


});