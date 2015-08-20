'use strict'

/*
* js数据类型及语言基础
*/

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

// 判断数组是否包含某一元素
function contains(arr, obj){
	var n = arr.length;
	while(n--) {
		if (obj===arr[n]) {
			return true;
		};	
	}
	return false;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
	var tmpArr = [];
	for(var i = 0; i < arr.length; i++){
		if(!contains(tmpArr, arr[i])){
			tmpArr.push(arr[i]);
		}
	}
	return tmpArr;
}

// 简单的trim函数，用于去除一个字符串的空白字符，假定空白字符只有半角空格、Tab
function simpleTrim(str) {
    var strArr = str.split('');
    for (var i = strArr.length - 1; i >= 0; i--) {
    	if(strArr[i] == ' ' || strArr[i] == '\t'){
    		strArr.splice(i, 1); 		
    	}
    }; 
    return strArr.join('');
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    return str.replace(/\s+/g, '');
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
    	fn(arr[i], i);
    };
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var count = 0;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			count++;
		}
	}
	return count;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^\w+(\.\w+)*@\w+((\.\w+)+)$/g
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^1(3|5|7|8)[0-9]{9}$/g
    return reg.test(phone);
}

/*
* dom操作
*/
// 判断一个元素对象是否有某个class
function hasClass(ele, cls) {
	return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

// 为element增加一个样式名为newClassName的新样式
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
    	ele.className = ele.className + ' ' + cls;
    };
}

// 移除element中的样式oldClassName
function removeClass(ele, cls) {
    if(hasClass(ele, cls)) {
    	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    	ele.className = ele.className.replace(reg, ' ');
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(ele1, ele2) {
    return ele1.parentNode === ele2.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return {
    	x: element.offsetLeft,
    	y: element.offsetTop
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

	var a1 = [1, 3, 5, 7, 5, 3];
	var a2 = [1, 'hello', 'hi', 7, '1', 'hi'];
	var b1 = uniqArray(a1);
	var b2 = uniqArray(a2);
	console.log('============test uniqArray===========');
	console.log(b1);
	console.log(b2);

	var str1 = '   hi!  ';
	var str2 = simpleTrim(str1);
	console.log('============test simpleTrim===========');
	console.log(str2);

	var str3 = trim(str1);	
	console.log('============test trim===========');
	console.log(str3);

	var arr = ['java', 'c', 'php', 'html'];
	function output(item, index) {
		console.log(index + ': ' + item)
	}
	console.log('============test each===========');
	each(arr, output); 

	var obj = {
	    a: 1,
	    b: 2,
	    c: {
	        c1: 3,
	        c2: 4
	    }
	};
	console.log('============test getObjectLength===========');
	console.log(getObjectLength(obj)); 

	var em1 = 'tengfei.huang@qq.com.cn';
	var em2 = '345454@aacom';
	console.log('============test isEmail===========');
	console.log(isEmail(em1)); 
	console.log(isEmail(em2)); 

	var tel1 = 15800367787;
	var tel2 = 1580036778;
	console.log('============test isMobilePhone===========');
	console.log(isMobilePhone(tel1)); 
	console.log(isMobilePhone(tel2)); 

	var obj = document.getElementsByTagName('button')[0];
	addClass(obj, 'btn-warning');
	console.log('============test addClass===========');
	console.log('new class is ' + obj.className);

	removeClass(obj, 'btn-sm');
	console.log('============test removeClass===========');
	console.log('new class is ' + obj.className);

	var p1 = document.getElementById('p1'),
		p2 = document.getElementById('p2'),
		p3 = document.getElementById('p3');
	console.log('============test isSiblingNode===========');
	console.log('p1 and p2 are sibling node : ' + isSiblingNode(p1, p2));
	console.log('p1 and p3 are sibling node : ' + isSiblingNode(p1, p3));

	var button = document.getElementsByTagName('button')[0];
	var position = getPosition(button);
	console.log('============test getPosition===========');
	console.log('position is (' + position.x + ', ' + position.y + ')');

})();