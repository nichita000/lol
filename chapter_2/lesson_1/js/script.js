function updateEntry(update) {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', 'http://localhost:3333/entry', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(update);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status == 200) {
		}
	}
}

function Template(stra, propa) {
    this.str = stra;
    this.arr = propa;
    this.parse = function(str, arr) {
        // console.log(typeof arr);
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

var obj = new Template();

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

var template, datas;

var a = document.querySelector(' .btn');
a.addEventListener('click', function() {
    get('tpl/' + 'tpl' + '.html', function(tp) {
        template = tp;

        checkReadiness();
    })
    get('http://localhost:3333/entry', function(dat) {
        // console.log(typeof dat);
        datas = dat;
        datas = JSON.parse(datas);
        checkReadiness();
    })
})

var counter = 0;

function checkReadiness() {
    var result;
    counter++;

    if (counter === 2) {
        //     var keys = [];
        //     var keySec = [];
        //     var result = '';
        //     var tmpLength = datas.length;
        //     for (var key in datas[0]) {
        //         keys.push(key);
        //         keySec.push('{{' + key + '}}');
        //     }
        //     for (var i = 0; i < datas.length; i++) {
        //         for (var j = 0; j < keys.length; j++) {
        //             result = template.replace(keySec[j], datas[i][keys[j]]);
        //             do {
        //                 result = result.replace(keySec[j], datas[i][keys[j]])
        //             } while ()
        //         }
        //     }

        for(var i = 0; i < datas.length; i++ ) {
            var e = document.querySelector(' .window');
            e.innerHTML += (obj.parse(template, datas[i]));

        }
    }
}








// result = parse(template, datas);
// var zebra = document.querySelector(' .window');
// zebra.innerHTML = result;
