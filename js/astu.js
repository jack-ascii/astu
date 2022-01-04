﻿/*init*/	window.ja=window.ja||{},window.dataLayer=window.dataLayer||[],ja.sargs=function(){var a=Array.prototype.slice.call(arguments[0]);for(var n in a)a[n]=JSON.stringify(a[n]);return ja.text.replace(a.join(" "),new RegExp('"',"gi"),"")},ja.qs2=function(a,n){var r=new RegExp("[?&]"+a+"=([^&#]*)").exec(window.location.href);return r&&r[1]||n},ja.qs=ja.qs2;
/*text*/	ja.text = {}, ja.text.nul = function (t) { return null == t || "undefined" === t }, ja.text.empty = function (t) { if (ja.text.nul(t)) return !0; if ("object" == typeof t) try { t = t[0].value } catch (t) { } return 0 === ja.text.trim(t).length }, ja.text.unhtml = function (t) { var e = document.createElement("DIV"); return e.innerHTML = t, e.textContent || e.innerText || "" }, ja.text.trim = function (t) { var e = null != t ? t : ""; if (null !== e.trim && void 0 !== e.trim) try { e = e.trim() } catch (t) { } return e }, ja.text.lower = function (t) { var e = null != t ? t : ""; if (null !== e.toLowerCase && void 0 !== e.toLowerCase) try { e = e.toLowerCase() } catch (t) { } return e }, ja.text.indexOf = function (t, e) { var n = null != t ? t : "", r = -1; if (null !== n.indexOf && void 0 !== n.indexOf) try { r = n.indexOf(e) } catch (t) { } return r }, ja.text.indexof = ja.text.indexOf, ja.text.replace = function (t, e, n, r = 9) { var a = null != t ? t : ""; try { if (null !== a.replace && void 0 !== a.replace) a = a.replace(e, n); else for (var u = 0; -1 < ja.text.indexOf(a, e) && u++ < r;)a = a.replace(e, n) } catch (t) { ja.log.warn("ja.text.replace()", t) } return a }, ja.text.hash = function (t, e, n) { n = n || 15e3, ja.text.nul(t) || (e ? ja.cache.set("hash", t, 15e3) : history.pushState ? history.pushState(null, null, "#" + t) : document.location.hash = t); var r = document.location.hash.split("&")[0]; return ja.text.empty(r) && (r = ja.cache.get("hash")), ja.text.empty(r) ? "" : (0 > ja.text.indexof(r, "#") && (r = "#" + r), r) }, ja.text.truncnumber = function (t) { var e = new RegExp("(\\d+\\.\\d{" + t + "})(\\d)"), n = this.toString().match(e); return n ? parseFloat(n[1]) : this.valueOf() }, ja.text.shuffle = function (t) { let e, n = t.length; for (; 0 != n;)e = Math.floor(Math.random() * n), n--, [t[n], t[e]] = [t[e], t[n]]; return t }, ja.text.decode = function (t) { return (new DOMParser).parseFromString(t, "text/html").documentElement.textContent }, ja.text.clearto = function (t) { return ja.text.nul(t) || clearTimeout(t), t = null, null }, Number.prototype.trunc = function (t) { return ja.text.truncnumber(t) };
/*log*/		ja.log={options:{loglevel:5,dbg:"1"==ja.qs2("dbg"),log:ja.qs2("log")||"0"}},ja.log.write=function(){ja.log.options.args=arguments,-1<["1","2","3"].indexOf(ja.log.options.log)&&ja.ui.toast(ja.sargs(arguments),ja.log.options.loglevel),console.log.apply(console,arguments)},ja.log.warn=function(){ja.log.options.args=arguments,-1<["3"].indexOf(ja.log.options.log)&&ja.ui.toast(ja.sargs(arguments),ja.log.options.loglevel),console.warn.apply(console,arguments)},ja.log.dbg=function(){ja.log.options.dbg&&(ja.log.options.args=arguments,-1<["2","3"].indexOf(ja.log.options.log)&&ja.ui.toast(ja.sargs(arguments),ja.log.options.loglevel),console.log.apply(console,arguments))};
/*wait*/	ja.waiting={},ja.wait=function(a,i,t){i()?t():ja.text.empty(a)?ja.log.write("ja.wait(): missing key"):(ja.waiting[a]=ja.waiting[a]||{},ja.text.nul(i)?i=ja.waiting[a].condition:ja.waiting[a].condition=i,ja.text.nul(i)?ja.log.write("ja.wait(): missing condition"):(ja.text.nul(t)?t=ja.waiting[a].callback:ja.waiting[a].callback=t,ja.text.nul(t)?ja.log.write("ja.wait(): missing callback"):setTimeout(function(){ja.wait(a,i,t)},250)))};
/*event*/	ja.event={},ja.event.prevent=function(t){ja.text.nul(t)||(ja.text.nul(t.preventDefault)||t.preventDefault(),ja.text.nul(t.stopImmediatePropagation)||t.stopImmediatePropagation(),ja.text.nul(t.stopPropagation)||t.stopPropagation())},ja.event.lastevent=function(t){return t||window.event},ja.event.lasttarget=function(t){return(t=ja.eventlastevent(t)).target||t.srcElement};
/*gtm*/		ja.gtm={},ja.gtm.init=function(e){!function(e,t,a,n,o){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var c=t.getElementsByTagName(a)[0],m=t.createElement(a);m.async=!0,m.src="https://www.googletagmanager.com/gtm.js?id="+o,c.parentNode.insertBefore(m,c)}(window,document,"script","dataLayer",e)},ja.gtm.webevent=function(e,t,a){return t=t||ja.text.replace(document.location.hostname,".blogspot.com","")+document.location.pathname+document.location.search,a=a||ja.geo.sz(),dataLayer.push({event:"web.event",web_event_category:e,web_event_action:t,web_event_label:a}),this};

/*error*/	ja.error=ja.error||{},ja.error.handle=function(r,t,e,a,n){var o=ja.error.clean(r,"^uncaught( |:),^referenceerror( |:),^typeerror( |:),^syntaxerror( |:),not defined=undefined"),i=null!=n&&null!==n.stack&&void 0!==n.stack?n.stack:"",j=[ja.text.lower(ja.text.trim(r)),ja.text.lower(ja.text.trim(n?n.toString():""))];for(var l in j){var u=ja.text.trim(j[l]).match(/^(((uncaught |unhandled )?script error)|syntaxisfout)[.]?$/gi);if(u&&0<u.length)return!0}return ja.log.warn("ja.error.handle()",o,i),"1"!==ja.qs2("dbg")||ja.text.nul(ja.ui.toast)||ja.ui.toast(o),!0},ja.error.clean=function(r,t){var e=(ja.text.empty(r)?"":r)+"",a=t.split(",");for(var n in a){var o=a[n],i=o.split("=");if(!ja.text.empty(o)&&!ja.text.empty(i[0])){var j=new RegExp(i[0],"gi");e=e.replace(j,1<i.length?i[1]:"")}}return ja.text.trim(e)},"0"!==ja.qs2("err")&&(window.onerror=function(r,t,e,a,n){return ja.error.handle(r,t,e,a,n)});
/*cache*/	ja.cache = { enabled: "0" !== ja.qs2("cache") }, ja.cache.set = function (e, a, t = 2592e6) { if (!ja.cache.enabled) return; ja.log.dbg("ja.cache.set()", "key=", e, "value=", a, "ttl=", t); const l = new Date, c = { value: a, expiry: -1 < t ? l.getTime() + t : t }; localStorage.setItem("ja." + e, JSON.stringify(c)) }, ja.cache.get = function (e, a = null) { if (!ja.cache.enabled) return null; const t = localStorage.getItem("ja." + e); if (!t) return a; const l = JSON.parse(t), c = new Date; return -1 < l.expiry && c.getTime() > l.expiry ? (localStorage.removeItem("ja." + e), a) : (ja.log.dbg("ja.cache.get()", "key=", e, "defaultvalue=", a, "value=", l.value), l.value) }, ja.cache.clear = function () { for (var e in localStorage) localStorage[e] = null, delete localStorage[e] };
/*u*/     ja.u = {}, ja.u.n = function () { var a = ja.qs("u"); return ja.text.empty(a) ? a = ja.cache.get("u") : ja.cache.set("u", a, -1), ja.text.empty(a) ? "?" : a }, ja.u.m = ja.u.n();
/*geo*/		ja.geo = { key: "8dd79c70-0801-11ec-a29f-e381a788c2c0", me: ja.cache.get("ja.go") }, ja.geo.get = function (e) { e = e || ja.geo.key, ja.text.nul(ja.geo.me) && fetch("https://geolocation-db.com/json/" + e).then(e => e.json()).then(e => { ja.cache.set("ja.go", ja.geo.me = e), ja.log.dbg("ja.geo.get()", e) }).catch((e, a) => { ja.log.warn("ja.geo.get()failed", e, a) }) }, ja.geo.sz = function () { if (ja.geo.get(), ja.log.dbg("ja.geo.sz()", ja.geo.me, "nul=", ja.text.nul(ja.geo.me)), ja.text.nul(ja.geo.me)) return ja.u.m + "/?"; var e = ja.u.m + "/" + ja.text.replace(ja.geo.me.IPv4, new RegExp("[.]", "gi"), "/") + ja.geo.delim(ja.geo.me.city) + ja.geo.delim(ja.geo.me.postal) + ja.geo.delim(ja.geo.me.state) + ja.geo.delim(ja.geo.me.country_code); return ja.log.dbg("ja.geo.sz()", ja.geo.me, "ret=", e), e }, ja.geo.delim = function (e) { return ja.text.empty(e) ? "" : "/" + e };

/*toast*/	ja.ui=ja.ui||{},ja.ui.toast=function(t,s){var e=$("#toasts"),a=(new Date).getTime();if(e.length||(e=$(".toasts")),!e.length){var o=$("main");0===o.length&&(o=$("body")),e=$('<div id="toasts" class="toasts"></div>').prependTo(o)}var i=$('<p id="'+a+'" class="show toast">'+t+"</p>").appendTo(e);$(i).click(function(){$(this).toggleClass("show hide").remove()}),ja.text.nul(s)&&(s=5),0<s&&setTimeout("$('#"+a+"').toggleClass('show hide').remove();",1e3*s)};
/*quote*/	ja.quote={defaults:{factor:100,mindelay:7500,xp:"#gr_quote_body"},quotes:[]},ja.quote.timeout=function(t){t||(t=$(ja.quote.defaults.myquote).html());var e=t.length*ja.quote.defaults.factor;return ja.quote.defaults.mindelay>e&&(e=ja.quote.defaults.mindelay),e},ja.quote.get=function(t){if(ja.quote._to=ja.text.clearto(ja.quote._to),ja.text.nul(t)&&(t={}),ja.text.nul(t.user))ja.log.write("quote(): missing user");else{ja.log.dbg("ja.quote.get()","opts=",t),ja.quote._opts=t,ja.quote._quote=ja.text.replace($(ja.quote.defaults.xp).html(),new RegExp("<br>","gi")," ");var e=$(ja.quote.defaults.xp);0===e.length&&(ja.text.nul(t.target)&&ja.text.nul(t.callback)||(e=$('<div id="'+ja.text.replace(ja.quote.defaults.xp,"#","")+'" class="hide"></div>').appendTo($("body")))),0!==e.length?$.getScript("https://www.goodreads.com/quotes/widget/"+t.user+"?v=2",function(){setTimeout(function(){var t=ja.quote._opts;ja.text.nul(t.clean)&&(t.clean=!0),ja.text.nul(t.retry)&&(t.retry=!0),ja.log.dbg("ja.quote.get()cb",t);var e=$(ja.quote.defaults.xp);if(ja.text.nul(e))return void ja.log.write("ja.quote.get()cb: missing "+t.xp);var a=ja.quote.cleanall(e.text()),o=ja.text.replace(a,new RegExp("[ “”—,.?]","gi"),""),u=ja.quote.cleanall(e.html());u=ja.quote.cleansz(u,!1);var l=ja.quote.cleansz(u),n={key:"q"+o.length+o.substring(0,30),txt:a,htm:u,qhtm:l};let j=ja.quote.quotes.find(t=>t.key===n.key);if(ja.text.nul(j)&&ja.quote.quotes.push(n),ja.log.dbg("ja.quote.get()cb","quote=",n,"ja.quote._quote=",ja.quote._quote),(ja.text.empty(l)||n.key===ja.quote._quote)&&options.retry)return ja.log.dbg("ja.quote.get()cb: doover"),ja.quote._to=ja.text.clearto(ja.quote._to),void(ja.quote._to=setTimeout(function(){ja.quote.get(ja.quote._opts)},1));t.clean&&e.html(l),ja.quote.cleanel(window.quoteopts),ja.quote._quote=n.key,qhtm=e.html(),ja.text.nul(t.target)||$(t.target).html(t.clean?l:u),ja.text.nul(t.callback)||t.callback(n)},25)}):ja.log.write("ja.quote.get(): missing "+t.xp)}},ja.quote.cleanall=function(t){return ja.text.trim(ja.text.replace(t,new RegExp("[\\n—]","gi")," "))},ja.quote.cleansz=function(t,e=!0){var a=$("<div>"+ja.quote.cleanall(t)+"</div>"),o=a.find("a");"href,title,rel".split(",").forEach(t=>o.removeAttr(t));var u=a.html();return e&&(u=ja.text.replace(u,new RegExp("<br>","gi")," ")),ja.text.trim(u)},ja.quote.cleanel=function(t){ja.text.nul(t)&&(t={}),ja.text.nul(t.xp)&&(t.xp=ja.quote.defaults.xp);var e=$(t.xp),a=e.html();e.html(ja.quote.cleansz(a))},ja.quote.scanoptions={count:0,strikes:0,out:99,scandelay:1e3,scanto:null,user:null},ja.quote.scan=function(t){ja.quote.quotes=ja.cache.get("quote.quotes")||[];var e=ja.quote.scanoptions;e.user=e.user||t.user,ja.log.dbg("ja.quote.scan()",e),e.count=ja.quote.quotes.length,e.out<ja.quote.quotes.length&&(e.out=ja.quote.quotes.length),ja.quote.get({user:e.user,retry:!1,callback:function(){var t=ja.quote.scanoptions;if(t.count>=ja.quote.quotes.length){if(t.strikes>=t.out)return ja.log.dbg("ja.quote.scan()done",t),void(ja.text.nul(t.callback)||t.callback());t.strikes++}else ja.cache.set("quote.quotes",ja.quote.quotes),t.strikes=0;t.scanto=ja.text.clearto(t.scanto),t.scanto=setTimeout(function(){ja.quote.scan(ja.quote.scanoptions)},t.scandelay)}})},ja.quote.wrap=function(t,e){ja.log.dbg("ja.quote.wrap()","xp=",t,"quote=",e,"options=",options);var a="q"+Math.random().toString(36).substr(2,9);ja.log.dbg("ja.quote.wrap()","qid=",a),ja.log.dbg("ja.quote.wrap()","quote=",e,"quote.htm=",e.htm);ja.log.dbg("ja.quote.wrap()","qhtml=","<p></p>");var o=$("<p></p>").addClass("quote hide").attr("id",a).html(e.htm);return ja.log.dbg("ja.quote.wrap()","qt[0]=",o[0]),o.appendTo($(t)),o};
/*scroll*/ja.ui = ja.ui || {}, ja.ui.defaults = ja.ui.defaults || {}, ja.ui.defaults.scrollbase = "html,body", ja.ui.defaults.scrollduraction = 500, ja.ui.options = ja.ui.options || {}, ja.ui.options.pausescroll = !1, ja.ui.top = function (t) { var a = $(".post"); a.length || (a = $("main")), a.length || (a = $("body")), ja.ui.scroll({ target: a, duration: t }) }, ja.ui.bottom = function (t) { var a = $("footer"); a.length || (a = $("body")), ja.ui.scroll({ target: a, duration: t }) }, ja.ui.scroll2 = function (t, a) { ja.ui.scroll({ target: t, duration: a }) }, ja.ui.scroll = function (t) { ja.text.nul(t.target) ? ja.log.write("ja.ui.scroll2el(): missing target") : (t.target instanceof jQuery || (t.target = $(t.target)), t.target.length ? (ja.text.nul(t.base) && (t.base = ja.ui.defaults.scrollbase), ja.text.nul(t.duration) && (t.duration = ja.ui.defaults.scrollduraction), ja.text.nul(t.offset) && (t.offset = 0), ja.log.dbg("ja.ui.scroll()", "options=", t), ja.ui.options.pausescroll = !0, $(t.base).animate({ scrollTop: t.target.offset().top - t.offset }, t.duration), setTimeout(function () { ja.ui.options.pausescroll = !1 }, t.duration + 1)) : ja.log.write("ja.ui.scroll2el(): empty target")) };
/*pswipe*/ja.photoswipe=ja.photoswipe||{},ja.photoswipe.defaults=ja.photoswipe.defaults||{},ja.photoswipe.defaults.xp=ja.photoswipe.defaults.xp||".gallery",ja.photoswipe.init=function(i){var t;(i=i||{}).xp=i.xp||ja.photoswipe.defaults.xp,i.social=i.social||!1,i.captions=i.captions||!0,i.togglecontrols=i.togglecontrols||!1,ja.log.dbg("ja.photoswipe.init()","options=",i),ja.photoswipe.initoptions=i,t=jQuery,ja.photoswipe.initoptions.container=[],ja.photoswipe.initoptions.target=t(i.xp),ja.photoswipe.initoptions.figures=ja.photoswipe.initoptions.target.find("figure"),ja.log.dbg("ja.photoswipe.init()","figures=",ja.photoswipe.initoptions.figures),ja.photoswipe.initoptions.figures.each(function(){ja.log.dbg("ja.photoswipe.init()","figure=",t(this)[0]);var i=t(this).find("a"),o={src:i.attr("href"),w:i.data("width"),h:i.data("height"),title:i.data("caption")};t(this).attr("index",ja.photoswipe.initoptions.container.length).attr("id","figure"+ja.photoswipe.initoptions.container.length),ja.log.dbg("ja.photoswipe.init()","$link=",i,"item=",o),ja.photoswipe.initoptions.container.push(o),ja.log.dbg("ja.photoswipe.init()","ja.photoswipe.initoptions.container=",ja.photoswipe.initoptions.container)}),ja.photoswipe.initoptions.links=ja.photoswipe.initoptions.target.find("figure a"),ja.log.dbg("ja.photoswipe.init()","links=",ja.photoswipe.initoptions.links),ja.photoswipe.initoptions.links.click(function(i){ja.event.prevent(i),ja.log.dbg("ja.photoswipe.link.click()",t(this)[0]);var o=t(".pswp")[0],i={index:parseInt(t(this).parent("figure").attr("index")),bgOpacity:.85,showHideOpacity:!0,shareEl:ja.photoswipe.initoptions.social,captionEl:ja.photoswipe.initoptions.captions,tapToToggleControls:ja.photoswipe.initoptions.togglecontrols};ja.log.dbg("ja.photoswipe.link.click()","$pswp=",o,"options=",i),ja.photoswipe.initoptions.gallery=new PhotoSwipe(o,PhotoSwipeUI_Default,ja.photoswipe.initoptions.container,i),ja.log.dbg("ja.photoswipe.link.click()","ja.photoswipe.initoptions.gallery=",ja.photoswipe.initoptions.gallery),ja.photoswipe.initoptions.gallery.init()}),setTimeout(function(){var i,o=ja.qs2("pid");o&&(i=parseInt(o),Number.isNaN(i)||(o=t("figure img")).length>=i&&t(o[i-1]).parent("a").click())},1500)};
/*slides*/ja.slides={options:{index:-1,delay:2e4,pause:!0}},ja.slides.auto=function(){ja.log.dbg("ja.slides.auto()",ja.slides.options),ja.slides.clear(),ja.wait("slides.auto",function(){return!ja.text.nul(ja.photoswipe.initoptions)},function(){ja.log.dbg("ja.slides.auto()cb",ja.slides.options),$(".pswp").is(":visible")||(ja.slides.options.pause=!0),ja.slides.options.pause||(ja.slides.options.index!==ja.slides.options.figures.length-1?ja.wait("slides.init",function(){return!ja.text.nul(ja.photoswipe.initoptions.gallery)},function(){ja.log.dbg("ja.slides.auto()init",ja.slides.options),ja.slides.listen();var i=ja.photoswipe.initoptions.gallery.getCurrentIndex();-1===ja.slides.options.index?ja.slides.options.index=i:i++,ja.log.dbg("ja.slides.auto()init","current=",i,"index=",ja.slides.options.index),i!==ja.slides.options.index&&(ja.log.dbg("ja.slides.auto()init","goTo=",i),ja.photoswipe.initoptions.gallery.goTo(ja.slides.options.index=i)),ja.slides.timeout()}):0<ja.slides.options.index&&ja.photoswipe.initoptions.gallery.close())})},ja.slides.timeout=function(){ja.slides.clear(),ja.slides.options.timeout=setTimeout(function(){ja.slides.auto()},ja.slides.options.delay)},ja.slides.clear=function(){ja.text.nul(ja.slides.options.timeout)||clearTimeout(ja.slides.options.timeout),ja.slides.options.timeout=null},ja.slides.listen=function(){ja.log.dbg("ja.slides.listen()");var i=ja.photoswipe.initoptions.gallery;i.listen("afterChange",function(){ja.log.dbg("ja.slides.listen():afterChange()",ja.photoswipe.initoptions.gallery.getCurrentIndex()),ja.slides.options.index=ja.photoswipe.initoptions.gallery.getCurrentIndex(),ja.slides.timeout()}),i.listen("close",function(){ja.log.dbg("ja.slides.listen():close()"),ja.slides.clear(),ja.slides.options.index=-1,ja.slides.options.pause=!0,toggle()})},ja.slides.play=function(){const i=[...ja.photoswipe.initoptions.figures];ja.slides.options.figures=i,ja.slides.auto()};
/*blog*/	ja.blog = { archive: [], labels: [], pages: [], posts: [], defaults: { feedtype: "posts", wait: 4e3, cleanposts: !0, fixlinks: !0, addlinks: !0, offset: 10, xp: { class: ".blog", psxp: ".blog", archive: ".side .archive", labels: "footer .labels, .side .labels", pages: ".pages" }, links: { all: '<a style="display:inline-block;" href="/search/?q=.&max-results=999">all</a>', home: '<a style="display:inline-block;" href="javascript:ja.blog.home()">home</a>', more: '<a style="display:inline-block;" href="javascript:ja.ui.bottom()">more</a>', top: '<a style="display:inline-block;" href="javascript:ja.ui.top()">top</a>', bottom: '<a style="display:inline-block;" href="javascript:ja.ui.bottom()">top</a>' } }, options: { label: "" }, _init: !1, _initto: null, _archive: !1, _pages: !1 }, ja.blog.init = function (a) { if (ja.blog._init) ja.log.warn("ja.blog.init()already initialized", a); else { if ((a = a || {}).psxp = a.psxp || ja.blog.defaults.xp.psxp, a.captions = a.captions || !0, ja.blog.initoptions = a, ja.log.dbg("ja.blog.init()", a), !ja.text.empty(a.welcome) && "/" == document.location.pathname && !ja.cache.get("home")) return ja.log.dbg("ja.blog.init()welcome", a.welcome), ja.cache.set("lastvisit", null), ja.cache.set("welcome", !0, 6e4), void (document.location.href = a.welcome); ja.blog.feed({ type: "posts", target: ja.blog.archive, callback: function (a, t) { ja.log.dbg("ja.blog.init()cb", a, t, document.location.pathname), ja.blog._archive = !0, ja.cache.set("blog.archive", ja.blog.archive), ja.blog.digest() } }), ja.blog.feed({ type: "pages", target: ja.blog.pages, callback: function (a, t) { ja.blog._pages = !0, ja.blog.pages.sort((a, t) => a.name > t.name ? 1 : -1), ja.cache.set("blog.pages", ja.blog.pages) } }), _initto = setTimeout(function () { 0 === ja.blog.archive.length && (ja.blog.archive = ja.cache.get("blog.archive")), 0 === ja.blog.labels.length && (ja.blog.labels = ja.cache.get("blog.labels")), 0 === ja.blog.pages.length && (ja.blog.pages = ja.cache.get("blog.pages")), ja.blog._pages = 0 < ja.blog.pages.length, ja.blog._archive = 0 < ja.blog.archive.length, ja.blog._archive && ja.blog.digest() }, 5e3), ja.wait("ja.blog", function () { return !ja.blog._init && ja.blog._archive && ja.blog._pages }, function () { clearTimeout(_initto), ja.log.dbg("ja.blog.init()done", ja.blog.initoptions), ja.blog._init = !0, ja.blog.initoptions.wait = ja.blog.initoptions.wait || ja.blog.defaults.wait, ja.blog.initoptions.cleanposts = ja.blog.initoptions.cleanposts || ja.blog.defaults.cleanposts, ja.blog.initoptions.fixlinks = ja.blog.initoptions.fixlinks || ja.blog.defaults.fixlinks, ja.blog.initoptions.addlinks = ja.blog.initoptions.addlinks || ja.blog.defaults.addlinks, ja.cache.set("lastvisit", new Date, 3e5), ja.log.dbg("lastvisit=", ja.cache.get("lastvisit")), a.cleanposts && ja.blog.cleanposts(), setTimeout(function () { ja.vue.init({ mounted: function () { ja.log.dbg("ja.blog.init()vue", ja.blog.initoptions), ja.blog.initoptions.fixlinks && ja.blog.fixlinks(ja.blog.initoptions), ja.blog.render(ja.blog.initoptions), ja.blog.initoptions.callback && ja.blog.initoptions.callback() } }) }, ja.blog.initoptions.wait) }) } }, ja.blog.digest = function (a) { if (0 === ja.blog.posts.length && (document.location.href = ja.blog.initoptions.welcome), 0 === ja.text.indexof(document.location.pathname, "/search")) { if (ja.blog.options.label = "", 0 < ja.text.indexof(document.location.pathname, "/label")) { var t = document.location.pathname.split("/"); ja.blog.options.label = t[t.length - 1] } if (ja.log.dbg("ja.blog.digest()", "ja.blog.options.label=", ja.blog.options.label), ja.blog.posts.length < ja.blog.archive.length) for (var e = 0; e < ja.blog.archive.length; e++) { var l = ja.blog.archive[e], o = !1, i = !1; for (var n in l.labels = [], !ja.text.empty(ja.blog.options.label) && l.data.category || (o = !0), l.data.category) { var s = l.data.category[n].term; ja.log.dbg("ja.blog.digest", "term=", s), o || ja.blog.options.label !== s || (o = !0), l.labels.push({ name: s, url: window.location.origin + "/search/label/" + s }) } if (l.css = l.labels.map(function (a) { return a.name }).join(" "), !ja.text.empty(ja.blog.options.label) && 0 > ja.text.indexof(l.css, ja.blog.options.label) && (l.css = "hide " + l.css, o = !1), o) { for (var g = 0; g < ja.blog.posts.length; g++) { if (ja.blog.posts[g].id === l.id) { i = !0; break } } i || (ja.log.dbg("ja.blog.digest", "archive=", l, "include=", o, "found=", i), ja.blog.posts.push(l)) } } ja.cache.set("blog.labels", ja.blog.labels), ja.cache.set("blog.posts", ja.blog.posts) } for (g = 0; g < ja.blog.posts.length; g++) { var b = ja.blog.posts[g]; ja.vue.init({ id: "post" + b.id, xp: "#post" + b.id }) } }, ja.blog.feed = function (a) { ja.wait("ja.blog.feed", function () { return !ja.blog.feedoptions }, function () { (a = a || {}).start = a.start || 1, a.max = a.max || 999, a.type = a.type || ja.blog.defaults.feedtype, "label" == a.type && (a.type = ja.blog.defaults.feedtype, ja.text.empty(a.label) || (a.label = "/-/" + a.label)), a.label = a.label || "", a.key = a.type + "_" + a.label + "_" + Math.random().toString(36).substr(2, 9), ja.text.empty(a.url) && (a.url = window.location.origin + "/feeds/" + a.type + "/default" + a.label + "?alt=json&"), ja.log.dbg("ja.blog.feed()", a), ja.blog.feedoptions = a, window["feed" + a.key] = function (a) { var t = ja.blog.feedoptions; if (t) { if (ja.log.dbg("ja.blog.feed()callback", t, a), !ja.blog.labels.length) { for (var e in a.feed.category) ja.blog.labels.push({ name: a.feed.category[e].term, url: window.location.origin + "/search/label/" + a.feed.category[e].term }); ja.blog.labels.sort((a, t) => a.name > t.name ? 1 : -1) } if (ja.log.dbg("ja.blog.feed()callback", "ja.blog.labels=", ja.blog.labels), ja.log.dbg("ja.blog.feed()callback", "options.callback=", !ja.text.nul(t.callback), "options.target=", !ja.text.empty(t.target)), !ja.text.nul(t.callback) || !ja.text.empty(t.target)) { var l = t.target || []; for (var o in l.data = a, ja.log.dbg("ja.blog.feed()callback", "posts=", l), a.feed.entry) { var i = a.feed.entry[o], n = i.id.$t.split("-"), s = n[n.length - 1], g = { id: ja.text.replace(s, "post", ""), name: i.title.$t, title: i.title.$t, dateHeader: ja.text.nul(i.published) ? "" : ja.text.replace(i.published.$t.split("T")[0], "-", "."), body: ja.text.nul(i.content) ? "" : i.content.$t, data: i }; for (var b in i.link) { var j = i.link[b]; "alternate" === j.rel && (g.url = j.href.split("#")[0]), "alternate" === j.rel && (g.url = j.href.split("#")[0]) } l.push(g) } ja.log.dbg("ja.blog.feed()callback", "options.callback=", t.callback), ja.text.nul(t.callback) || t.callback(a, l) } ja.blog.feedoptions = null } else ja.log.warn("ja.blog.feed()callback: missing options", t) }, $.getScript(a.url + "callback=feed" + a.key + "&start-index=" + a.start + "&max-results=" + a.max, function () { }) }) }, ja.blog.cleanposts = function (a) { for (var t in (a = a || {}).key = a.key || "title", a.text = a.text || function (a) { return a.body() }, a.posts = a.posts || ja.blog.posts || [], ja.log.dbg("cleanposts()", "options=", a), a.blog) { var e = a.blog[t]; ja.text.empty(e[a.key]) || (e[a.key] = $("<div>" + a.text(e) + "</div>").text().trim()) } }, ja.blog.fixlinks = function (a) { a = a || {}, ja.log.dbg("ja.blog.fixlinks()", a); var t = document.location.href.split("?")[0].split("&")[0].split("#")[0]; $("a").each(function () { var a = $(this).attr("href"); if (!ja.text.empty(a)) { var e = $(this).text(); if (!ja.text.empty(e)) { var l = $(".blog .post .title").filter(function () { return e === ja.text.decode($(this).text()) }); 0 < l.length && $(this).attr("href", "#" + l.closest(".post").attr("id")), t === a ? $(this).click(function () { ja.ui.top() }) : 0 < l.length && $(this).click(function (a) { ja.event.prevent(a); var t = $($(this).attr("href")); ja.text.hash(t.attr("id"), !1), ja.ui.scroll2(t) }) } } }), $(".labels li a").each(function () { $(this).parent().addClass($(this).text()) }) }, ja.blog.wraplink = function (a, t) { var e = a; return ja.text.empty(e) ? "" : (0 > ja.text.indexOf(e, "<li>") && (e = '<li class="' + t + '">' + e + "</li>"), e) }, ja.blog.all = function (a) { a = a || {}, ja.log.dbg("ja.blog.all()", a); var t = ""; for (var e in a) { var l = a[e]; ja.log.dbg("ja.blog.all()", e, l), ja.text.empty(l) || (t = "&" + t + e + "=" + l) } document.location.href = "/search/?q=.&max-results=999" + t }, ja.blog.home = function () { ja.cache.set("home", !0, 6e4), document.location.href = "/" }, ja.blog.post = function (a) { a = a || 0, ja.log.dbg("ja.blog.post()", a, "archives=", ja.blog.archive), ja.blog.archive.length ? 0 > a && (a = 0) : ja.blog.home(), ja.blog.archive.length <= a ? ja.log.warn("ja.blog.post(): bounds", a, ">=", ja.blog.archive.length) : document.location.href = ja.blog.archive[a].url }, ja.blog.first = function () { ja.blog.post(0) }, ja.blog.last = function () { ja.blog.post(ja.blog.archive.length - 1) }, ja.blog.render = function (a) { a = a || {}, ja.log.dbg("ja.blog.render()", a), $("header, .content, .side, footer").hide(), $(".loading").removeClass("loading"), $("header").show("slow"), setTimeout(function () { $(".side.left").show("slow"), setTimeout(function () { $(".content").show("slow"), ja.photoswipe.init({ xp: a.psxp, social: a.social, captions: a.captions, scrollto: a.scrollto }), setTimeout(function () { $(".side.right, footer").show("slow"), setTimeout(function () { if (!(0 < $(".pswp__img").filter(function () { return $(this).is(":visible") }).length)) { $(document).bind("scroll", function (a) { ja.ui.options.pausescroll || $(".post").each(function () { if ($(this).offset().top < window.pageYOffset + ja.blog.defaults.offset && $(this).offset().top + $(this).height() > window.pageYOffset + ja.blog.defaults.offset) { var a = $(this).attr("id"); ja.text.empty(ja.qs2("gid")) || (a = a + "&gid=" + ja.qs2("gid")), ja.text.empty(ja.qs2("pid")) || (a = a + "&pid=" + ja.qs2("pid")), ja.text.hash(a, !1, 9e5), $(".archive a").removeClass("selected").filter(function () { return "#" + a == $(this).attr("href") }).addClass("selected") } }) }); var a = ja.text.hash(); ja.text.empty(a) || "#" === a || 0 === $(a).length ? ja.ui.top() : "#more" === a ? ja.ui.bottom(0) : ja.ui.scroll2(a, 0), ja.cache.set("welcome", null), ja.cache.set("home", null) } }, 750) }, window.delay / 10) }, window.delay / 10) }, window.delay / 10) }, ja.blog.label = function (a) { a = a || {}, ja.log.dbg("ja.blog.label()", a), ja.text.nul(a.label) ? ja.log.warn("ja.blog.label(): missing label", a) : ja.text.nul(a.callback) && ja.text.nul(a.target) ? ja.log.warn("ja.blog.label(): missing target or callback", a) : (ja.blog.labeloptions = a, ja.blog.feed({ type: "label", target: a.target, label: a.label, callback: function (a, t) { ja.log.dbg("ja.blog.label()callback", ja.blog.labeloptions, a, t), ja.blog.labeloptions && ja.blog.labeloptions.callback && ja.blog.labeloptions.callback(a, t) } })) }, ja.blog.findpost = function (a) { var t = { url: a, name: ja.blog.guesspostname(a), title: ja.blog.guesspostname(a) }, e = ja.blog.archive.find(function (t, e) { return a === t.url }); return ja.text.nul(e) || (t = e), t }, ja.blog.guesspostname = function (a) { if (ja.text.empty(a)) return ""; if ("/" === a) return "home"; var t = a.split("/"); if (1 > t.length) return ""; var e = t[t.length - 1]; return e = e.split(".")[0].split("_")[0], -1 < ja.text.indexof(e, "?") ? "" : e = ja.text.replace(e, new RegExp("-", "gi"), " ") };
/*vue*/		ja.vue=ja.vue||{},ja.vue.init=function(t){(t=t||{}).id=t.id||"app",t.xp=t.xp||"#"+t.id,ja.log.dbg("ja.vue.init()",t);var e=window[t.id]=Vue.createApp({data:()=>({title:t.title||"",description:t.title||"",labels:t.labels||ja.blog.labels||[],pages:t.pages||ja.blog.pages||[],archive:t.archive||ja.blog.archive||[],posts:t.posts||ja.blog.posts||[]}),mounted(){t.mounted&&t.mounted()}});e.component("ja-app",{props:{headerImage:String,css:String},template:'<div class="app flex" :class=css><div id="root"></div><slot></slot></div>'}),e.component("ja-header",{props:{title:String,description:String,css:String,images:Array,image:{type:String,default:function(t){if(!t.images.length)return"";var e=(new Date).getMilliseconds()%t.images.length;return t.images[e]}},width:{type:Number,default:1200},height:{type:Number,default:419}},template:'<header class="flex w100" :class=css><figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject"><a :data-caption="description" :href="image" :data-width="width" :data-height="height"><img class="w100" :src=image /></a></figure><h1 class="w100">{{title}}</h1><h2 class="w100">{{description}}</h2><slot></slot></header>'}),e.component("ja-main",{props:{css:String},template:'<main class="flex w100" :class=css><slot></slot></main>'}),e.component("ja-side",{props:{flex:String,css:String},template:'<div class="side flex" :class=css :style="{flexBasis: flex}"><slot></slot></div>'}),e.component("ja-content",{props:{flex:String,css:String},template:'<div class="content flex" :class=css :style="{flexBasis: flex}"><slot></slot></div>'}),e.component("ja-footer",{props:{css:String},template:'<footer class="flex w100" :class=css><slot></slot></footer>'}),e.component("ja-link",{props:{item:Object,css:{type:String,default:function(t){return t.item.name+" "+t.item.css}}},template:"<li :class=css><a :key=item.name :href=item.url>{{item.name}}</a></li>"}),e.component("ja-links",{props:{items:Array,css:String},template:'<ul :class=css><ja-link v-for="item in items" :key=item.url :item=item></ja-link></ul>'}),e.component("ja-img",{props:{css:String,small:String,large:String,height:String,width:String,caption:String,author:String},template:'<figure :class=css itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject"><a :href=large :data-caption=caption :data-height=height :data-width=width itemprop="contentUrl"><img :src=small itemprop="thumbnail"/></a></figure><p class="caption"><slot><span v-html=caption></span></slot><a class="author">{{author}}</a></p>'}),e.component("ja-poem",{props:{items:Array,css:String},template:'<div :class=css class="poem"><slot></slot></div>'}),e.component("ja-post",{props:{item:Object,css:String,labelcss:{type:String,default:"labels"},postid:{type:String,default:function(t){return"post"+t.item.id}},newer:{type:String,default:function(t){return ja.blog.findpost(t.item.newer).title}},older:{type:String,default:function(t){return ja.blog.findpost(t.item.older).title}}},template:'<div :id=postid class="post" :class=css><h2 class="date">{{item.dateHeader}}</h2><h3 class="title">{{item.title}}</h3><slot><div class="body" v-html="item.body"></div></slot><div class="nextprev"><a class="newer" :href="item.newer">{{newer}}</a> <a class="older" :href="item.older">{{older}}</a></div><ja-links :items="item.labels" :css="labelcss"></ja-links></div>'}),e.component("ja-blog",{props:{items:Array,css:String},template:'<div class="blog" :class=css><ja-post v-for="item in items" :key="item.id" :item="item"></ja-post></div>'}),e.mount(t.xp),ja.vue.app=e};
