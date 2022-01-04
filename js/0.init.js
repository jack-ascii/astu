
window.ja = window.ja || {};
window.dataLayer = window.dataLayer || [];

ja.sargs = function() {
	var args = Array.prototype.slice.call(arguments[0]);
	for (var a in args) { args[a] = JSON.stringify(args[a]); }
	return ja.text.replace(args.join(' '),new RegExp('"', 'gi'),'');
}

ja.qs2 = function(name,defval) { var results=new RegExp('[\
\?&]'+name+'=([^&#]*)').exec(window.location.href); if(!results){return defval;} return results[1]||defval; };

ja.qs = ja.qs2;
