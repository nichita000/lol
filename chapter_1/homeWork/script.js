function each(v , fun) {
	for (var i = 0; i < v.length; i++){
		fun(v[i]); 
	}
	return v;
}

function map(v , fun) {

	var newArr = [];

	for( var i = 0; i < v.length; i++){
		newArr.push(fun(v[i]));
	}
}

function find(v) {

	var result = 0;

	for( var i = 0; i < v.length ; i++){
		if(v[i] % 2 == 0) {
			result += v[i];
			break;
		}
	}
	return result;
}

function where(arr , prop) {
	var result = [];
	arr.forEach(function(v){
		for( var i = 0; i < v.length; i++) {
			if(v[i] === prop){
				result.push(v);
			}
		}
	});
	return result;
}

function findWhere(arr , prop){
	var result = [];
	arr.forEach(fuction(v){
		for( var i = 0; i < v.length; i++) {
			if(v[i] === prop){
				result.push(v);
				break;
			}
		}
	});
}

function contains(arr , value) {
	if(arr.indexOf(value) === -1) {
		return false;
	} else {
		return true;
	}
}

function pluck(arr , propName) {
	var result = [];
	arr.forEach(function(v){
		result.push(v[propName]);
		return res;
	});
}