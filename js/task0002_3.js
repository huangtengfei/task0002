'use strict'

var btn1 = $('#btn1'),
	btn2 = $('#btn2'),
	btn3 = $('#btn3'),
	img1 = $('#img1'),
	img2 = $('#img2'),
	img3 = $('#img3');


// 遍历，给前面的left递减图片宽度，后面的left递增图片宽度
function select(number) {

	// 改进2
	var i = 3;
	while(i > 0) {
		$('#btn' + i).style.background = 'none';
		$('#img' + i).style.left = 600 * (i - number) + 'px';
		i--;
	}

	$('#btn' + number).style.background = '#fff';

	// // 改进1
	// img1.style.left = 600*(1-number) + 'px';
	// img2.style.left = 600*(2-number) + 'px';
	// img3.style.left = 600*(3-number) + 'px';

	// // 初始
	// if(number == 1) {
	// 	img1.style.left = '0';
	// 	img2.style.left = '600px';
	// 	img3.style.left = '1200px';
	// }else if (number==2) {
	// 	img1.style.left = '-600px';
	// 	img2.style.left = '0'
	// 	img3.style.left = '600px';
	// }else if (number==3) {
	// 	img1.style.left = '-1200px';
	// 	img2.style.left = '-600px'
	// 	img3.style.left = '0';
	// };
}