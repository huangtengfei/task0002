'use strict'

// 判断arr是否为一个数组，返回一个bool值
function isArray(src) {
	return (src instanceof Array);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction (src) {
	return (typeof src === 'function');
}

// 比typeof运算符更准确的类型判断函数
function type(src) {
	var s = Object.prototype.toString.call(src);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {	
	if (type(src) === 'object') {
		var result = {};
		for(var key in src){
			if(src.hasOwnProperty(key)){
				result[key] = (type(src[key] === 'object') ? cloneObject(src[key]) : src[key]);
			}
		}
		return result;
	}else if(type(src) == 'array' && src.length) {
		return src.slice(0);
	}else if(type(src) == 'number' || type(src) == 'string' || 
		type(src) == 'boolean' || type(src) == 'date') {
		return src;
	}else {
		throw new Error('cannot clone this type!');
	}
}


(function testUtil(){
	console.log('=========test isArray========');
	console.log(isArray([1, 2]));
	console.log(isArray({a: 1}));
	console.log('=========test isFunction=======');
	console.log(isFunction(function(){}));
	console.log(isFunction({}));
	console.log('============test type===========');
	console.log(type(new Date()));
	console.log(type(/abcd/));

	var srcObj = {
		a: 1,
		b: {
			b1: ["hello", "hi"],
			b2: "JavaScript"
		}
	};
	var abObj = srcObj;
	var tarObj = cloneObject(srcObj);
	srcObj.a = 2;
	srcObj.b.b1[0] = "Hello";
	console.log('=========test cloneObject========');
	console.log(tarObj);
	console.log(tarObj.a);      
	console.log(tarObj.b.b1[0]);

})();