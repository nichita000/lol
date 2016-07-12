"use strict";
(function () {
	// var someArr = [
	// 			{
	// 				name: "Vasya",
	// 				age: 24,
	// 				famStatus: "married",
	// 				hasChildren: true,
	// 				job: "manager"
	// 			},
	// 			{
	// 				name: "Moisei",
	// 				age: 32,
	// 				famStatus: "married",
	// 				hasChildren: false,
	// 				job: "salesman"
	// 			},
	// 			{
	// 				name: "Petya",
	// 				age: 18,
	// 				famStatus: "not married",
	// 				hasChildren: false,
	// 				job: "student"
	// 			},
	// 			{
	// 				name: "Vasya",
	// 				age: 30,
	// 				famStatus: "not married",
	// 				hasChildren: false,
	// 				job: "developer"
	// 			},
	// 			{
	// 				name: "Anton",
	// 				age: 20,
	// 				famStatus: "married",
	// 				hasChildren: true,
	// 				job: "cook"
	// 			},
	// 			{
	// 				name: "Sanya",
	// 				age: 20,
	// 				famStatus: "married",
	// 				hasChildren: false,
	// 				job: "looser"
	// 			},
	// 			{
	// 				name: "Balodya",
	// 				age: 28,
	// 				famStatus: "married",
	// 				hasChildren: false,
	// 				job: "cook"
	// 			}
	// 		];

	var a = {};

	a.each = function (arr, func) {
		for (var i = 0; i < arr.length; i++) {
			func(arr[i], i);
		}
	}

	a.map = function (arr, func) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			newArr.push(func(arr[i], i));
		}
		return newArr;
	}

	a.find = function (arr, func) {
		var someval;
		for (var i = 0; i < arr.length; i++) {
			if (func(arr[i], i) || func(arr[i], i) === 0) {
				return someval = func(arr[i],i);
				break;
			}
		}
	}

	a.filter = function (arr, func) {
		var newArr = [];

		for (var i = 0; i < arr.length; i++) {
			if (func(arr[i], i) === true) {
				newArr.push(arr[i]);
			}
		}

		return newArr;
	}

	a.where = function (arr, properties) {
		var newArr = [];

		for (var i = 0; i < arr.length; i++) {
			sort(arr[i], properties);
		}

		function sort(obj, propsToSearch) {
			var flag = false;

			for (var key in propsToSearch) {
				if(obj[key] === propsToSearch[key]) {
					flag = true;
				}
			}

			if (flag) {
					newArr.push(obj);
				}

		}
		return newArr;
	}

	a.findWhere = function (arr, properties) {
		var newArr = [];

		for (var i = 0; i < arr.length; i++) {
			if (sort(arr[i], properties)) {
				break;
			}
		}

		function sort(obj, propsToSearch) {
			var flag = false;

			for (var key in propsToSearch) {
				if(obj[key] === propsToSearch[key]) {
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

	a.contains = function (arr, searchVal) {
		var indexToSearchFor = arr.indexOf(searchVal);
		var result = false;

		for (var i = 0; i < arr.length; i++) {
			if (i === indexToSearchFor) {
				result = true;
			}
		}

		return result;
	}

	a.pluck = function (arr, propertyName) {
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

	a.values = function (obj) {
		var resArr = [];

		for (var key in obj) {
			resArr.push(obj[key]);
		}

		return resArr;
	}
	window._ = a;
})();
