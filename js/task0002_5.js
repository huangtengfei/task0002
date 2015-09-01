'use strict';

/*
*	思路：
* 	①鼠标按下+鼠标移动 → 拖拽 onmousedown + onmousemove → startDrag()
*	②鼠标松开 → 无拖拽 onmouseup → stopDrag()
*	③鼠标偏移 → 拖拽距离
*/


var leftCon = $('.left-con'),	
	rightCon = $('.right-con');		// 左右容器

var isDrag = false;		// 是否可拖拽，只有 onmousedown 才可拖拽	

// 水平方向和垂直方向的偏移值
// 初始为 (evt.clientX - this.offsetLeft) 和 (evt.clientY - this.offsetTop)
// 在移动的过程中与 evt.client 相减，可还原出此时的 offsetLeft
var disX = 0,
	disY = 0; 	

var iLeft, iTop;	// 移动过程中计算得到的相对于父容器的left和top

// 当前拖拽元素的原始 z-index
// 鼠标按下时，给其设置一个较大的 z-index，避免鼠标划过其他元素时产生影响
// 在鼠标松开时，通过 oriZindex 给其恢复原始值
var oriZindex;		

// 鼠标按下时
function mousedown() {

	var evt = arguments[0] || window.event;
	disX = evt.clientX - this.offsetLeft;
	disY = evt.clientY - this.offsetTop;

	// // 这段log可以帮助搞清楚 clientX 与 offsetLeft 的区别
	// console.log('clientX:(' + evt.clientX + ',' + evt.clientY + ')');
	// console.log('offsetLeft:(' + this.offsetLeft + ',' + this.offsetTop + ')');

	isDrag = true;		// 设置可拖拽
	this.style.opacity = 0.5;	// 设置待拖拽元素的透明度

	oriZindex = this.style.zIndex;
	console.log(oriZindex);
	this.style.zIndex = 10000;		// 给待拖拽元素设置一个较大的 z-index

}

// 鼠标移动时
function mousemove() {

	if(!isDrag) {
		return;
	}

	var evt = arguments[0] || window.event;

	iLeft = evt.clientX - disX;
	iTop = evt.clientY - disY;

	// 实时设置拖拽元素的位置
	this.style.left = iLeft + 'px';
	this.style.top = iTop + 'px';

}

// 鼠标松开时
function mouseup() {

	this.style.opacity = 1;		// 恢复透明度
	this.style.zIndex = oriZindex;		// 恢复z-index

	var evt = arguments[0] || window.event,
		target = evt.srcElement ? evt.srcElement : evt.target;

	// 找出当前元素父节点及父节点的兄弟节点
	var parPath = evt.path[1].className,
	    sbiPath = (parPath == 'left-con') ? 'right-con' : 'left-con';

	var parNode = $('.' + parPath),
		sbiNode = $('.' + sbiPath);

	// 判断拖拽元素添加位置的逻辑
	// 如果满足放置条件，则将该元素添加到父节点的兄弟节点上（同时从原始父节点移除）
	if (Math.abs(parseInt(iLeft)) > 200) {
		sbiNode.appendChild(this);
	}

	// 更新所有拖拽元素的top
	updateNodes(parNode);
	updateNodes(sbiNode);

	this.style.left = 0;	// 更新当前拖拽元素的left

	isDrag = false;		// 设置为不可拖拽
}

// 此函数用于更新拖拽元素节点的top
function updateNodes(parent) {
	var nodes = parent.getElementsByClassName('item');
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].style.top = i * 50 + 'px';
	}
}

// 此函数用于初始化拖拽元素节点的top，并为其一一绑定鼠标事件
function init(dom) {
	var items = dom.getElementsByClassName('item');
	for (var i = 0; i < items.length; i++) {
		items[i].style.top = i * 50 + 'px';
		addEvent(items[i], 'mousedown', mousedown);
		addEvent(items[i], 'mousemove', mousemove);
		addEvent(items[i], 'mouseup', mouseup);
	}
}

init(leftCon);	// 初始化左边容器

init(rightCon);		// 初始化右边容器
