'use strict'

/*
* 配置参数，如更改轮播图片数量，需对应修改imgs下面的url和btn数量
*/
var seq = true,		//表示轮播的顺序（正序true，逆序false，默认为正序）
	loop = true,	//表示是否循环
	interval = 1000,	//间隔时长
	total = 3,	//轮播的图片数量
	width = 600;	//单张图片宽度


var curr = 1;	//表示当前展示到了哪一张图片

//手动点击某一张图片
function select(number) {
	curr = number;
	show();
}

//轮播
function lunbo() {
	if(loop) {
		if(seq) {
			curr = curr > total ? 1 : curr;		//正序循环，超出则置curr为第一张图片
		}else{
			curr = curr < 1 ? total : curr;		//逆序循环，超出则置curr为最后一张图片
		}
	}
	if(curr >= 1 && curr <= total){
		show();
		var t = setTimeout('lunbo()', interval);
		if(seq) {
			curr++;
		}else {
			curr--;
		}
	}
}

// 遍历，给前面的left递减图片宽度，后面的left递增图片宽度
function show() {
	var i = total;
	while(i > 0) {
		$('#btn' + i).style.background = 'none';
		$('#img' + i).style.left = width * (i - curr) + 'px';
		$('#img' + i).style.transition = 'width 2s';
		i--;
	}
	$('#btn' + curr).style.background = '#fff';
}

//开始轮播
lunbo();
