
ja.log = {
  options: {
    loglevel: 5,
    dbg: '1'==ja.qs2('dbg'),
    log: ja.qs2('log') || '0',
  },
};

ja.log.write = function() {
  ja.log.options.args = arguments;
  if (-1 < ['1','2','3'].indexOf(ja.log.options.log))
    ja.ui.toast(ja.sargs(arguments),ja.log.options.loglevel);
  console.log.apply(console, arguments);
}

ja.log.warn = function() {
  ja.log.options.args = arguments;
  if (-1 < ['3'].indexOf(ja.log.options.log))
    ja.ui.toast(ja.sargs(arguments),ja.log.options.loglevel);
	console.warn.apply(console, arguments); }

ja.log.dbg = function() { if(!ja.log.options.dbg){return;}
  ja.log.options.args = arguments;
  if (-1 < ['2','3'].indexOf(ja.log.options.log))
    ja.ui.toast(ja.sargs(arguments),ja.log.options.loglevel);
  console.log.apply(console, arguments);
}
