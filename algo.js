//Ковалевич А. А.
var allTime;
function matrix() {
    var p = parseInt(document.getElementById('p').value);
    var m = parseInt(document.getElementById('m').value);
    var q = parseInt(document.getElementById('q').value);
    var n = parseInt(document.getElementById('n').value);
    var comp = parseInt(document.getElementById('comp').value);
    var mod = parseInt(document.getElementById('mod').value);
    var add = parseInt(document.getElementById('add').value);
    var sub = parseInt(document.getElementById('sub').value);
    var mult = parseInt(document.getElementById('mult').value);
    var exp = parseInt(document.getElementById('exp').value);
    var table1 = document.getElementById('matrix1');
    table1.innerHTML = "";
    var table2 = document.getElementById('matrix2');
    table2.innerHTML = "";
    var table3 = document.getElementById('matrix3');
    table3.innerHTML = "";

    if (!(p) || !(m) || !(q) || !(n) || !(comp) || !(mod) || !(add) || !(mult) || !(exp) || !(sub)) {
        alert("Введите все данные!");
        form.reset();
    }
    else {
        var a = [];
        var b = [];
        var c = [];
        var d = [];
        var t = 0;
        var n2 = 0, n4 = 0, n5 = 0;
        var min = -1;
        var max = 1;
        var p, m, q;
        for (var i = 0; i < p; i++) { //заполнение матрицы А
            a[i] = [];
            for (var j = 0; j < m; j++) {
                a[i][j] = Math.round((Math.random() * (max - min) + min) * 1000) / 1000;
            }
        }
        for (var i = 0; i < m; i++) {  //заполнение матрицы В
            b[i] = [];
            for (var j = 0; j < q; j++) {
                b[i][j] = Math.round((Math.random() * (max - min) + min) * 1000) / 1000;
            }
        }
        for (var i = 0; i < p; i++) { //заполнение 0 матрицы C
            c[i] = [];
            for (var j = 0; j < q; j++) {
                c[i][j] = 0;
            }
        }
        for (var i = 0; i < p; i++) { //заполнение 0 матрицы D
            d[i] = [];
            for (var j = 0; j < q; j++) {
                d[i][j] = [];
                for (var k = 0; k < m; k++) {
                    d[i][j][k] = 0;
                }
            }
        }


        for (var i = 0; i < p; i++) {
            for (var j = 0; j < q; j++) {
                for (var k = 0; k < m; k++) {
                    if ( Math.abs(a[i][k]) <= Math.abs(b[k][j]) ) {
                       d[i][j][k] = ( a[i][k] * b[k][j] );
                        n2++;
                    }
                    else if (b[k][j] == 0) {
                        d[i][j][k] = ( Math.pow(a[i][k],2) + b[k][j] );
                        n4++;
                    }
                    else {
                        d[i][j][k] = ( Math.pow(a[i][k],2) - Math.abs(a[i][k] * b[k][j]) );
                        n5++;
                    }
                }
            }
        }

        for (var i = 0; i < p; i++) {
            for (var j = 0; j < q; j++) {
                for (var k = 0; k < m; k++) {
                    c[i][j] += d[i][j][k];
                }
            }
        }
        var Ky, e, d, tposl, tpar, rang, tsr;
        tposl = countTime(1, n2, n4, n5, p, q, m, comp, mult, add, mod, exp, sub);
        tpar = countTime(n, n2, n4, n5, p, q, m, comp, mult, add, mod, exp, sub);
        Ky = tposl / tpar;
        e = Ky / n;
        rang = p *q* m*2;
        var n3 = p*q*m-n2;
        tsr  = 1/rang*(p*q*m*2*(mod + comp)+n2*2*(mult)+n3*2*comp+n4*(exp + add)*2+n5*(exp + mult + mod + sub)*2+2*(p*q*m)/2*add); //ВРЕМЯ() которое тратит элемент в данном узле 
        d = tpar/tsr;

        for (var w = 0; w < p; w++) {
            var row = table1.insertRow(w);
            for (var l = 0; l < m; l++) {
                var cell = row.insertCell(-1);

                cell.innerHTML = a[w][l];
            }
        }
        for (var w = 0; w < m; w++) {
            var row = table2.insertRow(w);
            for (var l = 0; l < q; l++) {
                var cell = row.insertCell(-1);

                cell.innerHTML = b[w][l];
            }
        }
        for (var w = 0; w < p; w++) {
            var row = table3.insertRow(w);
            for (var l = 0; l < q; l++) {
                var cell = row.insertCell(-1);

                cell.innerHTML = Math.round(c[w][l] * 1000) / 1000;
            }
        }
        document.getElementById('result1').innerHTML = "<br>Матрица A:<br>";
        document.getElementById('result2').innerHTML = "<br>Матрица B:<br>";
        document.getElementById('result3').innerHTML = "<br>Матрица C:<br>";
        document.getElementById('t').innerHTML = "<br>Время выполнения: " + tpar;
        document.getElementById('Ky').innerHTML = "<br>Ку: " + Ky;
        document.getElementById('e').innerHTML = "<br>e: " + e;
        document.getElementById('D').innerHTML = "<br>D: " + d;
    }
}


function countTime(n, n2, n4, n5, p, q, m, comp, mult, add, mod, exp, sub) {
    var t1, t2, t3, t4, t5, t6;
    var n1 = 0, n3 = 0;
    n1 = p * q * m;
    n3 = n1 - n2;
    t1 = Math.ceil(n1 / n) * (mod + comp);
    t2 = Math.ceil(n2 / n) * (mult);
    t3 = Math.ceil(n3 / n) * (comp);
    t4 = Math.ceil(n4 / n) * (exp + add);
    t5 = Math.ceil(n5 / n) * (exp + mult + mod + sub);
    t6 = p * (q) * m * add;
    allTime = t1 + t2 + t3 + t4 + t5 + t6;
    return allTime;
}