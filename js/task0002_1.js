'use strict'

function submit() {

	var tooLess = $('.too-less'),
		tooMore = $('.too-more');

	tooLess.style.display = 'none';
	tooMore.style.display = 'none';

	var hobby = $("#hobby").value;
	var hobbies = hobby.split(/[\s\,\，\;\；\、]+/);
	hobbies = uniqArray(validArray(hobbies));	// 去空去重
	console.log(hobbies);

	if(hobbies.length == 0) {
		tooLess.style.display = 'block';
		return;
	}else if(hobbies.length > 10) {
		tooMore.style.display = 'block';
		return;
	}

	var main = $(".task-fir");
	var ul = document.createElement('ul');
	main.appendChild(ul);

	each(hobbies, function(item, index){

		var li = document.createElement('li');
		ul.appendChild(li);

		var checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('id', index);
		li.appendChild(checkbox);

		var label = document.createElement('label');
		label.setAttribute('for', index);
		label.innerText = item;
		li.appendChild(label);

	})

}