'use strict';

var left = $('.left-con'),
	right = $('.right-con'),
	item1 = $('#item1');

var isDrag = false;
var disX = 0,
	disY = 0;

// item1.onmouseover = function() {
// 	var evt = arguments[0] || window.event;

// 	var target = evt.srcElement ? evt.srcElement : e.target;

// 	console.log(evt);
	
// 	// if(target.className == 'item') {
// 	// 	left.removeChild(target);
// 	// }
// }

item1.onmousedown = function() {
	var evt = arguments[0] || window.event;
	isDrag = true;
	disX = evt.clientX - item1.offsetLeft;
	disY = evt.clientY - item1.offsetTop;
	return;
}

item1.onmousemove = function() {

	if(!isDrag) {
		return;
	}

	var evt = arguments[0] || window.event;

	var iLeft = evt.clientX - disX;
	var iTop = evt.clientY - disY;

	item1.style.left = iLeft + 'px';
	item1.style.top = iTop + 'px';
	return;
}

item1.onmouseup = function() {
	isDrag = false;
}

// for (var i = 5; i > 0; i--) {
// 	// addEvent($('#item' + i), 'mouseover', drag);
// 	addEvent($('#item' + i), 'mousedown', press);
// 	addEvent($('#item' + i), 'mousemove', move);
// 	addEvent($('#item' + i), 'mouseup', up);
// };

// addEvent(right, 'mouseover', drag);


