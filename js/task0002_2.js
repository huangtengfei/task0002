'use strict'

var end,
	b = $('b'),
	day = $('#day'),
	hour = $('#hour'),
	minute = $('#minute'),
	second = $('#second'),
	time = $('.time'),
	error = $('.error');

function submit() {

	var start, 
		interval,
		reg = /^\d{4}-\d{2}-\d{2}$/g;

	time.style.display = 'none';
	error.style.display = 'none';

	// 验证输入日期的格式
	end = $('#endDate').value;
	if(!reg.test(end)) {
		error.style.display = 'block';
		return;
	}

	start = new Date();
	end = new Date(end + ' 00:00:00');
	interval = end - start;
	// 验证输入日期的大小
	if(interval > 0) {
		time.style.display = 'block';
		b.innerHTML = end.getFullYear() + '年' + 
			chk((end.getMonth() + 1)) + '月' + chk(end.getDate()) + '日';
		update();
	}else {
		error.style.display = 'block';
		error.innerHTML = '请输入比当前时间大的结束时间';
	}	

}

// 更新计时
function update(){

	var start = new Date();
	var interval = Math.ceil((end - start) / 1000);

	if(interval == 0) {
		clearTimeout(t);
	}

	second.innerHTML = chk(interval % 60);
	minute.innerHTML = chk(Math.floor(interval / 60 % 60));
	hour.innerHTML = chk(Math.floor(interval / 60 / 60 % 24));
	day.innerHTML = Math.floor(interval / 60 / 60 / 24);
	var t = setTimeout('update()', 1000);

}

function chk(i) {
	return i < 10 ? '0' + i : i;
}
