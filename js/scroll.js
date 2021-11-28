
/* common/scroll.js */
var lastScroll = 0
	, ts = {
				start:$.now()
			, scroll:$.now()
		}
	, scrolltimeout = null
	, scrolldone = false
	, scrollwait = 1500
	;

function scroll(){
	var scrollHeight = $(document).height();
	var windowHeight = $(window).height();
	dbg('scroll()','scrollHeight=',scrollHeight,'windowHeight=',windowHeight);
	if (1 != compare(scrollHeight,windowHeight)) { return; }

	var windowScroll = $(window).scrollTop();
	var scrollPosition = windowHeight + windowScroll;
	dbg('scroll()','windowScroll=',windowScroll,'scrollPosition=',scrollPosition);
	if (0 == scrollPosition) { return; }

	var percentDone = 1 - ((scrollHeight - scrollPosition) / scrollHeight);
	dbg('scroll()','percentDone=',percentDone,'lastScroll=',lastScroll);

	if (1 == percentDone){ scrolldone = true; /**/ scrollwait = 1000*30; }
	if (0 == lastScroll) { lastScroll = 1 - ((scrollHeight - windowHeight) / scrollHeight); }

	if (lastScroll != percentDone) {
		var diff = percentDone - lastScroll;
		webevent(d.we
						,d.ue
						,document.location.pathname+document.location.search 
							+ ': scroll ' + (percentDone*100).trunc(0) + '% (' + (($.now() - ts.start) / 1000 / 60).trunc(1) + 'm)'
							+ '; ' + (1==compare(diff,0)?'+':'-') + (diff*100).trunc(0) + '% (' + (($.now() - ts.scroll) / 1000).trunc(0) + 's)'
						);
		ts.scroll = $.now();
	}
	lastScroll = percentDone;
}
