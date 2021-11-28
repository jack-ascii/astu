
/* common/init.js */
var _log=5;
function log() {
	if('1'==qs('log')||'2'==qs('log')||'3'==qs('log')){ toast(sargs(arguments),_log); }
  console.log.apply(console, arguments);
}

function dbg() { if('1'!=qs('dbg')){return;}
	if('2'==qs('log')||'3'==qs('log')){ toast(sargs(arguments),(_log*3)); }
  console.log.apply(console, arguments);
}

function sargs() {
	var args = Array.prototype.slice.call(arguments[0]);
	for (var a in args) { args[a] = JSON.stringify(args[a]); }
	return replace(args.join(' '),new RegExp('"', 'gi'),'');
}

function warn() {
	if('3'==qs('log')){ toast(sargs(arguments),_log); }
	console.warn.apply(console, arguments); }

window._s=window._s||'?';

window.dataLayer=window.dataLayer||[];

window._u=window._u||JSON.parse(localStorage.getItem('_u'));

function qs(name,defval){
  if(null===$.urlParam||undefined===$.urlParam){ $.urlParam=function(name, defval) {
    var results=new RegExp('[\\?&]'+name+'=([^&#]*)').exec(window.location.href);
    if(!results){return defval;} return results[1]||defval;
  }; } var qsv=$.urlParam(name, defval); return 'undefined'===qsv?'':qsv;
}

qs2=function(name,defval) { var results=new RegExp('[\
\?&]'+name+'=([^&#]*)').exec(window.location.href); if(!results){return defval;} return results[1]||defval; };

function error(msg, url, line, col, err) {
  var lmsg = lower(trim(msg)), lerr = lower(trim(err ? err.toString() : '')), stk = (null !== err && undefined !== err && null !== err.stack && undefined !== err.stack ? err.stack : msg), rx0 = trim(stk).match(/at https?:\/\/(?!(www\.metastock\.com\/?)).*/gi), rx1 = trim(lmsg).match(/^(((uncaught |unhandled )?script error)|syntaxisfout)[.]?$/gi), rx2 = trim(lerr).match(/^(((uncaught |unhandled )?script error)|syntaxisfout)[.]?$/gi), lem = lower(trim(dataLayer['gtm.errorMessage'] && !empty(dataLayer['gtm.errorMessage']) ? dataLayer['gtm.errorMessage'] : '')), lpe = lower(trim(dataLayer['gtm.pageError'] && !empty(dataLayer['gtm.pageError']) ? dataLayer['gtm.pageError'] : ''));
  if ((rx0 && 0 < rx0.length) || (rx1 && 0 < rx1.length) || (rx2 && 0 < rx2.length)) { return true; }
  else if (lmsg && !empty(lmsg) && ((lem == lmsg) || (lpe == lmsg))) { return true; }
  else if (lerr && !empty(lerr) && ((lem == lerr) || (lpe == lerr))) { return true; }
	var cleaned = cleanerr(msg, '^uncaught( |:),^referenceerror( |:),^typeerror( |:),^syntaxerror( |:),not defined=undefined');
	if ('1' === qs('dbg') && !nul(toast)) { toast(cleaned); }
  warn('error()','rx0=',rx0,'rx1=',rx1,'rx2=',rx2,'msg=',lmsg,'err=',lerr,'gtm.errorMessage=',lem,'gtm.pageError=',lpe);
  webevent(
      d.we
    , d.ue+'#err='+cleaned
    , 'err='+stk
      +' url='+(!empty(url) ? url : document.location.href)
      +' ln='+((null === line || undefined === line || empty(line) ? '?' : line) + ':' + (null === col || undefined === col || empty(col) ? '?' : col))
      +' path='+document.location.pathname+document.location.search+document.location.hash
  );
  return true;
}

function cleanerr(ein, scrub) {
  var eout = ((!empty(ein) ? ein : '') + '');
  var sa = scrub.split(',');
  for (var s in sa) {
    var sc = sa[s], sp = sc.split('=');
    if (!empty(sc) && !empty(sp[0])) {
      var rx = new RegExp(sp[0], "gi");
      eout = eout.replace(rx, 1 < sp.length ? sp[1] : '');
    }
  }
  return trim(eout);
}

if('0'!==qs('err')){ window.onerror = function(msg,url,line,col,err) { return error(msg,url,line,col,err); }; }

function prevent(e) {
  if (nul(e)) { return; }
  if (!nul(e.preventDefault)) { e.preventDefault(); }
  if (!nul(e.stopImmediatePropagation)) { e.stopImmediatePropagation(); }
  if (!nul(e.stopPropagation)) { e.stopPropagation(); }
}

function lastevent(e) {
  return e || window.event;
};

function lasttarget(e) {
  e = lastevent(e);
  return (e.target || e.srcElement);
};
