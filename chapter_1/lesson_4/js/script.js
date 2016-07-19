function get(url, succ, err) {
    var a = new XMLHttpRequest();
    a.open('GET', url, true);
    a.send();
    a.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                succ(a.responseText);
            } else {
                err;
            }
        }
    }
}

var a = document.querySelectorAll(' .exm');

for (var i = 0; i < a.length; i++) {
    a[i].addEventListener('click', function() {
        var tplName = this.dataset.tmpname;
        get('tmp/' + tplName + '.html', function(tpl) {
            var e = document.getElementById('content-tmpl');
            e.innerHTML = tpl;
        })
    })
}

var e = document.querySelector(' .clean');
e.addEventListener('click', function() {
    var e = document.getElementById('content-tmpl');
    e.innerHTML = '' ;
})
