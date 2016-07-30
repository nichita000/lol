(function() {
    var a = {};

    a.each = function(arr, func) {
        for (var i = 0; i < arr.length; i++) {
            func(arr[i], i);
        }
    }

    a.map = function(arr, func) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(func(arr[i], i));
        }
        return newArr;
    }

    a.find = function(arr, func) {
        var someval;
        for (var i = 0; i < arr.length; i++) {
            if (func(arr[i], i) || func(arr[i], i) === 0) {
                return someval = func(arr[i], i);
                break;
            }
        }
    }

    a.filter = function(arr, func) {
        var newArr = [];

        for (var i = 0; i < arr.length; i++) {
            if (func(arr[i], i) === true) {
                newArr.push(arr[i]);
            }
        }

        return newArr;
    }

    a.where = function(arr, properties) {
        var newArr = [];

        for (var i = 0; i < arr.length; i++) {
            sort(arr[i], properties);
        }

        function sort(obj, propsToSearch) {
            var flag = false;

            for (var key in propsToSearch) {
                if (obj[key] === propsToSearch[key]) {
                    flag = true;
                }
            }

            if (flag) {
                newArr.push(obj);
            }

        }
        return newArr;
    }

    a.findWhere = function(arr, properties) {
        var newArr = [];

        for (var i = 0; i < arr.length; i++) {
            if (sort(arr[i], properties)) {
                break;
            }
        }

        function sort(obj, propsToSearch) {
            var flag = false;

            for (var key in propsToSearch) {
                if (obj[key] === propsToSearch[key]) {
                    flag = true;
                }
            }

            if (flag) {
                newArr.push(obj);
                return true;
            }
        }

        return newArr;
    }

    a.contains = function(arr, searchVal) {
        var indexToSearchFor = arr.indexOf(searchVal);
        var result = false;

        for (var i = 0; i < arr.length; i++) {
            if (i === indexToSearchFor) {
                result = true;
            }
        }

        return result;
    }

    a.pluck = function(arr, propertyName) {
        var resArr = [];

        for (var i = 0; i < arr.length; i++) {
            for (var key in arr[i]) {
                if (key == propertyName) {
                    resArr.push(arr[i][key]);
                }
            }
        }

        return resArr;
    }

    a.values = function(obj) {
        var resArr = [];

        for (var key in obj) {
            resArr.push(obj[key]);
        }

        return resArr;
    }
    window._ = a;
})();

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
            func();
        }
    }

    xhr.send(data);
}


function Template(stra, propa) {
    this.result = '';
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
        this.result += str;
    };

    this.render = function() {
        for (var e = 0; e < this.arr.length; e++) {
            this.parse(this.str, this.arr[e]);
        }
    }
    this.getTpl = function() {
        return this.result
    }
}


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

function classs() {
    this.arr = [];
    this.regEv = function(newEv, funct) {
        this.arr.push({
            ev: newEv,
            hundler: funct
        });
    };
    this.trigger = function(newEv) {
        var result = _.where(this.arr, {
            ev: newEv
        });
        result[0].hundler();
    };
    this.dele = function(newEv) {
        var exm = {
            ev: newEv
        };
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].newEv === exm.newEv) {
                this.arr.splice(i, 1);
            }
        }
    }
}

var obj = new classs();
var tmp;
var datas;

var mainWind = document.querySelector(' .window');

function init() {
    get('http://localhost:3333/entry', function(v) {
        datas = JSON.parse(v);
        obj.trigger('Datacame');

    })

    get('form/examp.html', function(tp) {
        tmp = tp;
        obj.trigger('Datacame');
    })
}
init();

obj.regEv('postt', function() {
    init();
});

var count = 0;
obj.regEv('Datacame', function() {
    count++;
    if (count === 2) {
        var tpl = new Template(tmp, datas);
        tpl.render();
        mainWind.innerHTML = tpl.getTpl();
        count = 0;
    }

    var btn_edit = document.getElementById('edit');
    btn_edit.addEventListener('click', function() {
        get('form/editor.html', function(formEditor) {
            mainWind.innerHTML = formEditor;
        })
        var par = this.parentElement;
        var id_data = par.childNodes[1].innerHTML;
        get('http://localhost:3333/entry/' + id_data, function(e) {
            var btn_add_edit = document.getElementById('add_edit');
            btn_add_edit.addEventListener('click', function() {
                var ff = document.querySelector(' input:first-child').value;
                var ef = document.querySelector(' input:nth-child(2)').value;
                var zf = document.querySelector(' input:nth-child(3)').value;
                e = JSON.parse(e);
                obj.trigger('postt');
                e.Author = ff;
                console.log(e.Author);
                post('http://localhostz:3333/entry', e);
            })

        });
    })
})


// firstBtn.addEventListener('click', function() {
//     get('form/formAdd.html', function(form) {
//         var z = document.querySelector(' .window');
//         z.innerHTML = form;
//         newButtons();
//     })
// })

function newButtons() {
    var newDat = {};
    var btn_newData = document.getElementById('addNewData');
    // console.log(btn_newData)
    btn_newData.addEventListener('click', function() {
        newDat.Author = document.getElementById('name-1').value;
        newDat.Title = document.getElementById('name-2').value;
        newDat.Text = document.getElementById('name-3').value;
        newDat = JSON.stringify(newDat);
        post('http://localhost:3333/entry', newDat, function() {
            obj.trigger('postt');
        });
        var z = document.querySelector(' .window');
    })
}
