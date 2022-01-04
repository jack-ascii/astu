
ja.ui = ja.ui || {};

ja.ui.defaults = ja.ui.defaults || {};
ja.ui.defaults.scrollbase = 'html,body';
ja.ui.defaults.scrollduraction = 500;

ja.ui.options = ja.ui.options || {};
ja.ui.options.pausescroll = false;

ja.ui.top = function(duration) {
  var top = $('.post .title');
  if (!top.length) top = $('main');
  if (!top.length) top = $('body');
  ja.ui.scroll({target: top, duration: duration});
}

ja.ui.bottom = function(duration) {
  var bottom = $('footer');
  if (!bottom.length) bottom = $('body');
  ja.ui.scroll({target: bottom, duration: duration});
}

ja.ui.scroll2 = function(target, duration)
{
  ja.ui.scroll({target: target, duration: duration});
}

ja.ui.scroll = function(options) {
  if (ja.text.nul(options.target)) { ja.log.write('ja.ui.scroll2el(): missing target'); return; }

  if (!(options.target instanceof jQuery)) options.target = $(options.target);
  if (!options.target.length) { ja.log.write('ja.ui.scroll2el(): empty target'); return; }

  if (ja.text.nul(options.base)) options.base = ja.ui.defaults.scrollbase;
  if (ja.text.nul(options.duration)) options.duration = ja.ui.defaults.scrollduraction;
  if (ja.text.nul(options.offset)) options.offset = 0;

  ja.log.dbg('ja.ui.scroll()', 'options=', options);

  ja.ui.options.pausescroll = true;
  $(options.base).animate(
    { scrollTop: options.target.offset().top - options.offset },
    options.duration);
  setTimeout(function () { ja.ui.options.pausescroll = false; }, (options.duration + 1));
}
