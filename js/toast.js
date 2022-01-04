
ja.ui = ja.ui || {};

ja.ui.toast = function(msg,exp) {
  //ja.log.dbg('ja.ui.toast()', 'msg=', msg, 'exp=', exp);

	var toasts = $('#toasts'), unq = new Date().getTime();

	if (!toasts.length) toasts = $('.toasts');

	if (!toasts.length) {
		var par = $('main');
		if (0===par.length) { par = $('body'); }
		toasts = $('<div id="toasts" class="toasts"></div>').prependTo(par);
	}

	var toast =
		$('<p id="' + unq + '" class="show toast">' + msg + '</p>')
			.appendTo(toasts);

	$(toast).click(function () {
		$(this).toggleClass('show hide').remove();
	});

	if (ja.text.nul(exp))
		exp = 5;

	if (0 < exp)
		setTimeout("$('#" + unq + "').toggleClass('show hide').remove();", exp*1000);
}
