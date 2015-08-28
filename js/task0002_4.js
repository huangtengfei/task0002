'use strict'

var ipt = $('.ipt'),
	sug = $('.sug');

// 对接后台产生数据的接口，此处用假数据模拟
var data = ['abc', 'aaa', 'amy', 'block', 'bbb', 'boom', 'cpp', 'java', 'javascript', 'japan'];

ipt.focus();	// 使输入框获取焦点

var curr = -1;	// 当前候选元素的index

// keyup 是在松开按键时发生，此时字符已经输入到文本框
// keydown 在按下任意键时发生，如果是文本框的话还没有显示到文本框之前就产生的事件
// keypress 是整个按键动作完成之后，只响应字符，对ctrl,alt等等这些控制键没有响应
addEvent(ipt, 'keyup', function(){

	var evt = arguments[0] || window.event;

	switch (evt.keyCode) {
		case 40: 	// down key
			curr++;
			if(sug.style.display == 'block'){
				var lis = document.getElementsByTagName('li');
				if(curr == lis.length) {	// 如果按down键的次数达到待选择元素数组的长度了，那从头开始选择
					clearStyle(lis[--curr]);
					curr = 0;
				}else if(curr > 0){		// 先将上一个元素的选中样式清除
					clearStyle(lis[--curr]);
					curr++;
				}
				ipt.value = lis[curr].innerHTML;
				setSelectedStyle(lis[curr]);	// 设置当前选中的元素样式			
			}
			break;
		case 38: 	// up key
			curr--;
			if(sug.style.display == 'block'){
				var lis = document.getElementsByTagName('li');
				var len = lis.length;
				if(curr < 0) {	// 如果按up键的次数达到待选择元素数组的长度了，那从底部开始选择
					clearStyle(lis[0]);
					curr = len - 1;
				}else if(curr < len - 1){		// 先将下一个元素的选中样式清除
					clearStyle(lis[++curr]);
					curr--;
				}
				ipt.value = lis[curr].innerHTML;
				setSelectedStyle(lis[curr]);	// 设置当前选中的元素样式	
			}
			break;
		case 13: 	// enter key
			if(sug.style.display == 'block'){
				var lis = document.getElementsByTagName('li');
				ipt.value = lis[curr].innerHTML;
				sug.style.display = 'none';
				alert('选中了' + ipt.value);				
			}
			break;
		default:
			if(evt.keyCode >= 48 && evt.keyCode <= 90) {
				createSuggestElement();
			}
	}	
})

// 为候选元素的父元素绑定click事件，利用ul的onclick去代理它下面所有元素的onclick事件
addEvent(sug, 'click', function(){
	var e = arguments[0] || window.event,
		target = e.srcElement ? e.srcElement : e.target;
	ipt.value = target.innerHTML;
	sug.style.display = 'none';	
})

// 动态创建候选元素
function createSuggestElement() {
	var kw = trim(ipt.value);
	var sugData = getSuggestData(kw) || [];

	if($('ul')){
		sug.removeChild($('ul'));
	}

	if(sugData.length) {
		var ul = document.createElement('ul');
		sug.appendChild(ul);

		each(sugData, function(item) {
			var li = document.createElement('li');
			li.innerHTML = item;
			ul.appendChild(li);
		})

		sug.style.display = 'block';
		curr = -1;
	}
}

// 获取候选数据
function getSuggestData(keyword) {
	if(keyword){
		var sugData = [];
		each(data, function(item) {
			if(item.startWith(keyword)){
				sugData.push(item);
			}
		})
		return sugData;
	}
}

// 清除选中样式
function clearStyle(dom){
	dom.style.background = '#fff';
}

// 设置选中样式
function setSelectedStyle(dom) {
	dom.style.background = '#f0f0f0';
}
