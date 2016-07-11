'use strict' ;

(function() {

    var a = {

        each: function(arr, fun) { ///// !!!!
            for (var i = 0; i < arr.length; i++) {
                fun(arr[i], i);
            }
        },

        map: function(v, fun) {

            var newArr = [];

            for (var i = 0; i < v.length; i++) {
                newArr.push(fun(v[i], i));
            }
            return newArr;
        },

        findWhere: function(arr, f) {

            var e = [];

            for (var i = 0; i < arr.length; i++) {
                var counter = 0;
                var lengf = 0;
                for (var key in f) {
                    if (arr[i][key] == f[key]) {
                        counter++;
                        lengf++;
                    } else {
                        lengf++;
                    }
                }
                if (lengf === counter) {
                    e.push(arr[i]);
                    return e;
                }
            }
        },

        find: function(arr, fun) {

            var result = [];

            for (var i = 0; i < arr.length; i++) {
                if (fun(arr[i])) {
                    result.push(arr[i]);
                    return result;
                }
            }
        },

        filter: function(arr, fun) {

            var newA = [];

            for (var i = 0; i < arr.length; i++) {
                if (fun(arr[i], i) == true) {
                    newA.push(arr[i]);
                }
            }
            return newA;
        },

        Where: function(arr, f) {

            var e = [];

            for (var i = 0; i < arr.length; i++) {
                var counter = 0;
                var lengf = 0;
                for (var key in f) {
                    if (arr[i][key] == f[key]) {
                        counter++;
                        lengf++;
                    } else {
                        lengf++;
                    }
                }
                if (lengf === counter) {
                    e.push(arr[i]);
                }
            }
            return e;
        },

        contains: function(arr, value) {
            if (arr.indexOf(value) === -1) {
                return false;
            } else {
                return true;
            }
        },

        pluck: function(arr, propName) { ////// !!!

            var result = [];

            arr.forEach(function(v) {
                result.push(v[propName])
            });
            return result;
        },

        values: function(obj) {

            var result = [];

            for (var key in obj) {
                result.push(obj[key]);
            }
            return result;
        }

            window._ = a;
    }
})()
