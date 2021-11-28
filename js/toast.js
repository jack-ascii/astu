
/* common/toasts.js */
function toast(msg,exp) {
	var toasts = $('#toasts'), unq = new Date().getTime();
	if (0===toasts.length) { toasts = $('.toasts'); }
	if (0===toasts.length) { 
		var par = $('main');
		if (0===par.length) { par = $('body'); }
		toasts = $('<div id="toasts" class="toasts"></div>').prependTo(par);
	}
	var toast = $('<p id="' + unq + '" class="show toast">' + msg + '</p>').appendTo(toasts);
	$(toast).click(function () { $(this).toggleClass('show hide').remove(); });
	if (nul(exp)) { exp = 5; }
	if (0 < exp) { setTimeout("$('#" + unq + "').toggleClass('show hide').remove();", exp*1000); }	
}
