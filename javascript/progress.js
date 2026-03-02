let total = 1600000;
let remainder = 1600000;

$('.value').each(function() {
	let textNumber = $(this).text().replace(/\s+/g, '');
	let percentage = textNumber/total*100+'%';
	remainder = remainder - textNumber;
	$(this).parent().css('width', percentage);
});

const rest = document.getElementById('saknas');
rest.innerHTML = `<span class="value">${remainder}</span>`;
$(rest).css('width', remainder/total*100+'%');

//$('.block').tooltip();