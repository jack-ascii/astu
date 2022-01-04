
ja.error = ja.error || {};

ja.error.handle = function(msg, url, line, col, err) {
	var cleaned = ja.error.clean(msg, '^uncaught( |:),^referenceerror( |:),^typeerror( |:),^syntaxerror( |:),not defined=undefined');
  var stack = (null !== err && undefined !== err && null !== err.stack && undefined !== err.stack ? err.stack : '');

  var lmsg = ja.text.lower(ja.text.trim(msg));
  var lerr = ja.text.lower(ja.text.trim(err ? err.toString() : ''));
  var strings = [lmsg, lerr];
  for (var s in strings) {
    var rx = ja.text.trim(strings[s]).match(/^(((uncaught |unhandled )?script error)|syntaxisfout)[.]?$/gi);
    if (rx && 0 < rx.length) return true;
  }

  ja.log.warn('ja.error.handle()', cleaned, stack);

	if ('1' === ja.qs2('dbg') && !ja.text.nul(ja.ui.toast)) { ja.ui.toast(cleaned); }
  return true;
}

ja.error.clean = function(ein, scrub) {
  //console.log('ja.error.clean()', 'ein=', ein, scrub);
  var eout = ((!ja.text.empty(ein) ? ein : '') + '');
  var sa = scrub.split(',');
  for (var s in sa) {
    var sc = sa[s], sp = sc.split('=');
    if (!ja.text.empty(sc) && !ja.text.empty(sp[0])) {
      var rx = new RegExp(sp[0], "gi");
      eout = eout.replace(rx, 1 < sp.length ? sp[1] : '');
    }
  }
  //console.log('ja.error.clean()', 'eout=', eout);
  return ja.text.trim(eout);
}

if ('0'!==ja.qs2('err'))
  window.onerror =
    function(msg,url,line,col,err) {
      return ja.error.handle(msg,url,line,col,err);
    };

