function Template(stra, propa) {
    this.str = stra;
    this.arr = propa;
    this.parse = function(str, arr) {
        str = JSON.stringify(str);
        var keys = [];
        var keySec = [];
        for (var key in arr) {
            keys.push('{{' + [key] + '}}');
            keySec.push(key);
        }
        for (var i = 0; i < keys.length; i++) {
            str = str.replace(keys[i], arr[keySec[i]]);
        }
        return str
    };

    this.render = function(str, arr) {
        var result = '';
        for (var e = 0; e < arr.length; e++) {
            result += this.parse(str, arr[e]);
        }
        return result;
    }
}

var wind = document.querySelector(' .window');
for(var i = 0; true; i++) {
    wind.innerHTML += getAllEntries()
}

var obj = new Template();

var all = [];

function post(url, data, func) {
    var count = 0;
    var sor = 0;
    var exm = document.querySelector(' .window');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            // alert(xhr.responseText);
            // var query = [];
            // query.push(xhr.response);
            count++;
            if (count != 0) {
                exm.innerHTML = '';
                for (var i = 0; i < 1; i++) {
                    all.push(xhr.responseText)
                }
                for (var z = 0; z < all.length; z++) {
                    get('http://localhost:3333/entry/' + all[z], function(v) {
                        v = JSON.parse(v);
                        sor++;
                        get('form/examp.html', function(form) {
                                // if (sor != 0) {
                                //     form = JSON.stringify(form);
                                //     console.log(form, v)
                                //     obj.parse(form, v);
                                // }
                                // sor = 0;
                                // // console.log(form);
                                exm.innerHTML += obj.parse(form, v);

                        });
                    });
                }
            }
        }
    }

    xhr.send(data);
}

var dataAll = {};
var addInArr = [];

// function post(url, success, error) {
//     var b = new XMLHttpRequest();
//     var obj = JSON.stringify();
//     b.open('POST', 'http://localhost:3333/entry', true);
//     b.setRequestHeader("Content-type", "application/json");
//     b.send();
//     b.onreadystatechange = function() {
//         if (this.readyState === 4) {
//             if (this.status === 200) {
//                 success(b.response);
//             } else {
//                 error();
//             }
//         }
//     }
// }

function get(url, succ) {
    var a = new XMLHttpRequest();
    a.open('GET', url, true);
    a.send();
    a.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                succ(a.responseText);
            }
        }
    }
}

var e = document.querySelector(' button:first-child');
e.addEventListener('click', function() {
    get('form/formAdd.html', function(formAdd) {
        var z = document.querySelector(' .window');
        z.innerHTML = formAdd;
        checkReady();
    })
})

function checkReady() {
    var datas = {};
    var btn_cancel = document.getElementById('cancel');
    btn_cancel.addEventListener('click', function() {
        document.querySelector(' .window').innerHTML = '';
    })
    var btn_newData = document.getElementById('addNewData');
    btn_newData.addEventListener('click', function() {
        // addInArr(document.getElementById('name-1').value);
        // addInArr(document.getElementById('name-2').value);
        // addInArr(document.getElementById('name-3').value);
        datas.Author = document.getElementById('name-1').value;
        datas.Title = document.getElementById('name-2').value;
        datas.Text = document.getElementById('name-3').value;
        // console.log(JSON.stringify(datas));
        post('http://localhost:3333/entry', JSON.stringify(datas));
        // get('http://localhost:3333/entry/' + query[e]')
    });
}
