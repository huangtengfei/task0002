'use strict'

/*
* 配置参数，如更改轮播图片数量，需对应修改imgs下面的url和btn数量
*/
var seq = true,		//表示轮播的顺序（正序true，逆序false，默认为正序）
	loop = true,	//表示是否循环
	interval = 1000,	//间隔时长
	total = 3;	//轮播的图片数量


var curr = 1;	//表示当前展示到了哪一张图片

//手动点击某一张图片
function select(number) {
	curr = number;
	show();
}

//轮播
function lunbo() {

	if(loop) {
		curr = curr > total ? 1 : curr;
	}
	if(curr <= total){
		show();
		var t = setTimeout('lunbo()', interval);
		curr++;
	}
}

// 遍历，给前面的left递减图片宽度，后面的left递增图片宽度
function show() {
	var i = total;
	while(i > 0) {
		$('#btn' + i).style.background = 'none';
		if(seq) {
			$('#img' + i).style.left = 600 * (i - curr) + 'px';
		}else {
			$('#img' + i).style.left = 600 * (curr - i) + 'px';
		}
		i--;
	}
	$('#btn' + curr).style.background = '#fff';
}

lunbo();
