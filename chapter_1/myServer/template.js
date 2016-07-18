function Template(stra, propa) {
    this.str = stra;
    this.arr = propa;
    this.parse = function(str, arr) {
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
var star = `
<div>
    <span>{{name}}</span>
    <span>{{text}}</span>
</div>`;

var proper = [{
    name: 'lexa',
    text: 'tevirp',
}, {
    name: 'moha',
    text: 'privet'
}, {
    name: 'jopa',
    text: 'leo'
}];

var lol = {
    name: 'lexa',
    text: 'jora'
}

console.log(obj.parse(star, lol));