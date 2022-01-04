

ja.quote = {
	defaults: {
		factor: 100,
		mindelay: 7500,
		xp: '#gr_quote_body',
	},
	quotes: [],
};

ja.quote.timeout = function(q) {
	if (!q) q = $(ja.quote.defaults.myquote).html();
  var delay = q.length * ja.quote.defaults.factor;
  if (ja.quote.defaults.mindelay > delay) delay = ja.quote.defaults.mindelay;
	return delay;
}

ja.quote.get = function(opts) {
	ja.quote._to = ja.text.clearto(ja.quote._to);

	if (ja.text.nul(opts)) opts = {};
	if (ja.text.nul(opts.user)) { ja.log.write('quote(): missing user'); return; }
	ja.log.dbg('ja.quote.get()', 'opts=', opts);
	ja.quote._opts = opts;

	ja.quote._quote = ja.text.replace($(ja.quote.defaults.xp).html(), new RegExp('<br>', 'gi'), ' ');

	var tgt = $(ja.quote.defaults.xp);
	if (0 === tgt.length) {
		if (!ja.text.nul(opts.target) || !ja.text.nul(opts.callback))
			tgt = $('<div id="'+ja.text.replace(ja.quote.defaults.xp,'#','')+'" class="hide"></div>')
				.appendTo($('body'));
	}

	if (0 === tgt.length) {
		ja.log.write('ja.quote.get(): missing '+opts.xp);
		return;
	}

	$.getScript('https://www.goodreads.com/quotes/widget/'+opts.user+'?v=2', function () {
		setTimeout(function () {
			var opts = ja.quote._opts;
			if (ja.text.nul(opts.clean)) opts.clean = true;
			if (ja.text.nul(opts.retry)) opts.retry = true;
			ja.log.dbg('ja.quote.get()cb', opts);

			var tgt = $(ja.quote.defaults.xp);
			if (ja.text.nul(tgt)) {
				ja.log.write('ja.quote.get()cb: missing '+opts.xp);
				return;
			}

			var txt = ja.quote.cleanall(tgt.text());
			var key = ja.text.replace(txt, new RegExp('[ “”—,.?]', 'gi'), '');
			var html = ja.quote.cleanall(tgt.html());
					html = ja.quote.cleansz(html, false);
			var qhtml = ja.quote.cleansz(html);
			var quote = {
				key: 'q' + key.length + key.substring(0, 30),
				txt: txt,
				htm: html,
				qhtm: qhtml,
			};

			let match = ja.quote.quotes.find(q => q.key === quote.key);
			if (ja.text.nul(match)) ja.quote.quotes.push(quote);
			ja.log.dbg('ja.quote.get()cb', 'quote=', quote, 'ja.quote._quote=', ja.quote._quote);

			if ((ja.text.empty(qhtml) ||
					quote.key === ja.quote._quote) &&
					options.retry) {
				ja.log.dbg('ja.quote.get()cb: doover');
				ja.quote._to = ja.text.clearto(ja.quote._to);
				ja.quote._to =
					setTimeout(
						function () { ja.quote.get(ja.quote._opts) },
						1);
				return;
			}

			if (opts.clean) tgt.html(qhtml);
			ja.quote.cleanel(window.quoteopts);
			ja.quote._quote = quote.key;
			qhtm = tgt.html();

			if (!ja.text.nul(opts.target)) $(opts.target).html(opts.clean ? qhtml : html);

			if (!ja.text.nul(opts.callback)) opts.callback(quote);

		//	if (!ja.text.empty(qhtml))
		//		var delay = ja.quote.timeout(txt);
		//		ja.quote._to =
		//			setTimeout(
		//				function () { ja.quote.get(ja.quote._opts) },
		//				delay);
		}, 25);
	});
}

ja.quote.cleanall = function(quote) {
	var cleaned = ja.text.trim(ja.text.replace(quote, new RegExp('[\\n—]', 'gi'), ' '));
	return cleaned;
}

ja.quote.cleansz = function(quote, brs=true) {
	var div = $('<div>'+ja.quote.cleanall(quote)+'</div>');
	var link = div.find('a');
	'href,title,rel'.split(',').forEach(attr => link.removeAttr(attr));
	var html = div.html();
	if (brs) html = ja.text.replace(html, new RegExp('<br>', 'gi'), ' ');
	return ja.text.trim(html);
}

ja.quote.cleanel = function(opts) {
	if (ja.text.nul(opts)) opts = {};
	if (ja.text.nul(opts.xp)) opts.xp = ja.quote.defaults.xp;

	var tgt = $(opts.xp);
	var htm = tgt.html();
	tgt.html(ja.quote.cleansz(htm));
}

ja.quote.scanoptions = {
	count: 0,
  strikes: 0,
  out: 99,
  scandelay: 1000,
  scanto: null,
	user: null,
};

ja.quote.scan = function(opts) {
	ja.quote.quotes = ja.cache.get('quote.quotes') || [];

	var options = ja.quote.scanoptions;
	options.user = options.user || opts.user;
  ja.log.dbg('ja.quote.scan()', options);

	options.count = ja.quote.quotes.length;
	if (options.out < ja.quote.quotes.length) options.out = ja.quote.quotes.length;

	ja.quote.get({
		user: options.user,
		retry: false,
		callback: function () {
			var options = ja.quote.scanoptions;
			if (options.count >= ja.quote.quotes.length) {
				if (options.strikes >= options.out) {
					ja.log.dbg('ja.quote.scan()done', options);
					if (!ja.text.nul(options.callback)) options.callback();
					return;
				}
				options.strikes++;
			}
			else {
				ja.cache.set('quote.quotes', ja.quote.quotes);
				options.strikes = 0;
			}
			options.scanto = ja.text.clearto(options.scanto);
			options.scanto = setTimeout(function () { ja.quote.scan(ja.quote.scanoptions); }, options.scandelay);
		},
	});
}

ja.quote.wrap = function(xp, quote) {
  ja.log.dbg('ja.quote.wrap()', 'xp=', xp, 'quote=', quote, 'options=', options);
  var qid = 'q' + Math.random().toString(36).substr(2, 9);
  ja.log.dbg('ja.quote.wrap()', 'qid=', qid);
  ja.log.dbg('ja.quote.wrap()', 'quote=', quote, 'quote.htm=', quote.htm);
  var qhtml = '<p></p>';
  ja.log.dbg('ja.quote.wrap()', 'qhtml=', qhtml);
  var qt = $(qhtml).addClass('quote hide').attr('id', qid).html(quote.htm);
  ja.log.dbg('ja.quote.wrap()', 'qt[0]=', qt[0]);
  qt.appendTo($(xp));
  return qt;
};
