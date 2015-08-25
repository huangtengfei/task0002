'use strict'

function submit() {
	var start = new Date(),
		end = $('#endDate').value,
		interval = 0;
	
	var b = $('b'),
		p = $('p'),
		day = $('#day'),
		hour = $('#hour'),
		minute = $('#minute'),
		second = $('#second');

	p.style.display = 'block';
	b.innerHTML = end;

	end = new Date(end + ' 00:00:00');
	interval = end - start;
	console.log(interval);

	var seconds = interval % 60;
	var minutes = Math.floor(interval / 60 % 60);
	var hours = Math.floor(interval / 60 / 60 % 24);
	var days = Math.floor(hours / 60 / 60 / 24);

	day.innerHTML = days;
	hour.innerHTML = hours;
	minute.innerHTML = minutes;
	second.innerHTML = seconds;

}