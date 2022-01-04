
ja.blog = {
	archive: [],
	labels: [],
	pages: [],
	posts: [],
	defaults: {
		feedtype: 'posts',
		wait: 4000,
		cleanposts: true,
		fixlinks: true,
		addlinks: true,
		offset: 10,
		xp: {
			class: '.blog',
			psxp: '.blog',
			archive: '.side .archive',
			labels: 'footer .labels, .side .labels',
			pages: '.pages',
		},
		links: {
			all: '<a style="display:inline-block;" href="/search/?q=.&max-results=999">all</a>',
			home: '<a style="display:inline-block;" href="javascript:ja.blog.home()">home</a>',
			more: '<a style="display:inline-block;" href="javascript:ja.ui.bottom()">more</a>',
			top: '<a style="display:inline-block;" href="javascript:ja.ui.top()">top</a>',
			bottom: '<a style="display:inline-block;" href="javascript:ja.ui.bottom()">top</a>',
		},
	},
	options: {
		label: '',
	},
	_init: false,
	_initto: null,
	_archive: false,
	_pages: false,
};

ja.blog.init = function (options) {
	if (ja.blog._init) { ja.log.warn('ja.blog.init()already initialized', options); return; }

	options = options || {};
	options.psxp = options.psxp || ja.blog.defaults.xp.psxp;
	options.captions = options.captions || true;
	ja.blog.initoptions = options;
	ja.log.dbg('ja.blog.init()', options);

	if (!ja.text.empty(options.welcome) && '/' == document.location.pathname && !ja.cache.get('home')) {
		ja.log.dbg('ja.blog.init()welcome', options.welcome);
		ja.cache.set('lastvisit', null);
		ja.cache.set('welcome', true, 60 * 1000);
		document.location.href = options.welcome;
		return;
	}

	ja.blog.feed({
		type: 'posts',
		target: ja.blog.archive,
		callback: function (data, posts) {
			ja.log.dbg('ja.blog.init()cb', data, posts, document.location.pathname);
			ja.blog._archive = true;
			ja.cache.set('blog.archive', ja.blog.archive);
			ja.blog.digest();
		},
	});

	ja.blog.feed({
		type: 'pages',
		target: ja.blog.pages,
		callback: function (data, posts) {
			ja.blog._pages = true;
			ja.blog.pages.sort((a, b) => (a.name > b.name) ? 1 : -1);
			ja.cache.set('blog.pages', ja.blog.pages);
		},
	});

	_initto = setTimeout(function () {
		if (0===ja.blog.archive.length) ja.blog.archive = ja.cache.get('blog.archive');
		if (0===ja.blog.labels.length) ja.blog.labels = ja.cache.get('blog.labels');
		if (0===ja.blog.pages.length) ja.blog.pages = ja.cache.get('blog.pages');
		ja.blog._pages = (0 < ja.blog.pages.length);
		ja.blog._archive = (0 < ja.blog.archive.length);
		if (ja.blog._archive) ja.blog.digest();
	}, 5000);

	ja.wait(
		'ja.blog',
		function () { return !ja.blog._init && ja.blog._archive && ja.blog._pages; },
		function () {
			clearTimeout(_initto);
			ja.log.dbg('ja.blog.init()done', ja.blog.initoptions);
			ja.blog._init = true;
			ja.blog.initoptions.wait = ja.blog.initoptions.wait || ja.blog.defaults.wait;
			ja.blog.initoptions.cleanposts = ja.blog.initoptions.cleanposts || ja.blog.defaults.cleanposts;
			ja.blog.initoptions.fixlinks = ja.blog.initoptions.fixlinks || ja.blog.defaults.fixlinks;
			ja.blog.initoptions.addlinks = ja.blog.initoptions.addlinks || ja.blog.defaults.addlinks;
			ja.cache.set('lastvisit', new Date(), 5 * 60 * 1000);
			ja.log.dbg('lastvisit=', ja.cache.get('lastvisit'));

			if (options.cleanposts) ja.blog.cleanposts();

			setTimeout(function () {
				ja.vue.init({
					mounted: function () {
						ja.log.dbg('ja.blog.init()vue', ja.blog.initoptions);
						if (ja.blog.initoptions.fixlinks) ja.blog.fixlinks(ja.blog.initoptions);
						ja.blog.render(ja.blog.initoptions);
						if (ja.blog.initoptions.callback) ja.blog.initoptions.callback();
					},
				});
			}, ja.blog.initoptions.wait);
		},
	);
}

ja.blog.digest = function (options) {
	if (0===ja.blog.posts.length) document.location.href = ja.blog.initoptions.welcome;
	if (0 === ja.text.indexof(document.location.pathname, '/search')) {
		ja.blog.options.label = ''
		if (0 < ja.text.indexof(document.location.pathname, '/label')) {
			var pth = document.location.pathname.split('/');
			ja.blog.options.label = pth[pth.length-1];
		}
		ja.log.dbg('ja.blog.digest()', 'ja.blog.options.label=', ja.blog.options.label);

		if (ja.blog.posts.length < ja.blog.archive.length) {
			for (var a = 0; a < ja.blog.archive.length; a++) {
				var archive = ja.blog.archive[a];
				var include = false;
				var found = false;
				archive.labels = [];
				if (ja.text.empty(ja.blog.options.label) || !archive.data.category) include = true;

				for (var c in archive.data.category) {
					var term = archive.data.category[c].term;
					ja.log.dbg('ja.blog.digest', 'term=', term);
					if (!include && ja.blog.options.label === term) include = true;
					archive.labels.push({
						name: term,
						url: window.location.origin + '/search/label/' + term,
					});
				}
				archive.css = archive.labels.map(function (lbl) { return lbl.name; }).join(' ');

				if (!ja.text.empty(ja.blog.options.label) &&
						0 > ja.text.indexof(archive.css, ja.blog.options.label)) {
					archive.css = 'hide ' + archive.css;
					include = false;
				}

				if (include) {
					for (var p = 0; p < ja.blog.posts.length; p++) {
						var post = ja.blog.posts[p];
						if (post.id === archive.id) { found = true; break; }
					}
					if (!found) {
						ja.log.dbg('ja.blog.digest', 'archive=', archive, 'include=', include, 'found=', found);
						ja.blog.posts.push(archive);
					}
				}
			}
		}

		ja.cache.set('blog.labels', ja.blog.labels);
		ja.cache.set('blog.posts', ja.blog.posts);
	}

	for (var p = 0; p < ja.blog.posts.length; p++) {
		var pp = ja.blog.posts[p];
		ja.vue.init({
			id: 'post'+pp.id,
			xp: '#post'+pp.id,
		});
	}
}

ja.blog.feed = function (options) {
	ja.wait(
		'ja.blog.feed',
		function () { return !ja.blog.feedoptions; },
		function () {
			options = options || {};
			options.start = options.start || 1;
			options.max = options.max || 999;
			options.type = options.type || ja.blog.defaults.feedtype;

			if ('label' == options.type) {
				options.type = ja.blog.defaults.feedtype;
				if (!ja.text.empty(options.label))
					options.label = '/-/' + options.label;
			}
			options.label = options.label || '';
			options.key = options.type + '_' + options.label + '_' + Math.random().toString(36).substr(2, 9);

			if (ja.text.empty(options.url))
				options.url =
					window.location.origin + '/feeds/' + options.type + '/default' + options.label + '?alt=json&';

			ja.log.dbg('ja.blog.feed()', options);
			ja.blog.feedoptions = options;

			window['feed' + options.key] = function (data) {
				var options = ja.blog.feedoptions;
				if (!options) { ja.log.warn('ja.blog.feed()callback: missing options', options); return; }
				ja.log.dbg('ja.blog.feed()callback', options, data);

				if (!ja.blog.labels.length) {
					for (var c in data.feed.category) {
						ja.blog.labels.push({
							name: data.feed.category[c].term,
							url: window.location.origin + '/search/label/' + data.feed.category[c].term,
						});
					}
					ja.blog.labels.sort((a, b) => (a.name > b.name) ? 1 : -1);
				}
				ja.log.dbg('ja.blog.feed()callback', 'ja.blog.labels=', ja.blog.labels);

				ja.log.dbg('ja.blog.feed()callback', 'options.callback=', !ja.text.nul(options.callback), 'options.target=', !ja.text.empty(options.target));
				if (!ja.text.nul(options.callback) || !ja.text.empty(options.target)) {
					var posts = options.target || [];
					posts.data = data;
					ja.log.dbg('ja.blog.feed()callback', "posts=", posts);

					for (var e in data.feed.entry) {
						var entry = data.feed.entry[e];
						var ida = entry.id.$t.split('-');
						var id = ida[ida.length-1];
						var post = {
							id: ja.text.replace(id,'post',''),
							name: entry.title.$t,
							title: entry.title.$t,
							dateHeader: ja.text.nul(entry.published) ? '' : ja.text.replace(entry.published.$t.split('T')[0],'-','.'),
							body: ja.text.nul(entry.content) ? '' : entry.content.$t,
							data: entry,
						};
						for (var l in entry.link) {
							var link = entry.link[l];
							if ('alternate' === link.rel) { post.url = link.href.split('#')[0]; }
							if ('alternate' === link.rel) { post.url = link.href.split('#')[0]; }
						}
						posts.push(post);
					}

					ja.log.dbg('ja.blog.feed()callback', "options.callback=", options.callback);
					if (!ja.text.nul(options.callback)) options.callback(data, posts);
				}

				ja.blog.feedoptions = null;
			}

			$.getScript(
				options.url +
				'callback=feed' + options.key +
				'&start-index=' + options.start +
				'&max-results=' + options.max,
				function () {
				});
		},
	);
}

ja.blog.cleanposts = function (options) {
	options = options || {};
	options.key = options.key || 'title';
	options.text = options.text || function (post) { return post.body(); };
	options.posts = options.posts || ja.blog.posts || [];
	ja.log.dbg('cleanposts()', 'options=', options);

	for (var p in options.blog) {
		var post = options.blog[p];
		if (!ja.text.empty(post[options.key]))
			post[options.key] = $('<div>' + options.text(post) + '</div>').text().trim();
	}
}

ja.blog.fixlinks = function (options) {
	options = options || {};
	ja.log.dbg('ja.blog.fixlinks()', options);

	var curr =
		document.location.href
			.split('?')[0]
			.split('&')[0]
			.split('#')[0];

	$('a').each(function () {
		var hrf = $(this).attr('href');
		if (ja.text.empty(hrf)) return;

		var txt = $(this).text();
		if (ja.text.empty(txt)) return;

		var post = $('.blog .post .title')
			.filter(function () {
				return txt === ja.text.decode($(this).text()); });

		if (0 < post.length)
			$(this)
				.attr('href', '#' + post.closest('.post').attr('id'));

		if (curr === hrf)
			$(this)
				.click(function () { ja.ui.top(); });
		else {
			if (0 < post.length)
				$(this)
					.click(function (e) {
						ja.event.prevent(e);
						var post = $($(this).attr('href'));
						ja.text.hash(post.attr('id'), false);
						ja.ui.scroll2(post);
					});
		}
	});

	$('.labels li a').each(function () { $(this).parent().addClass($(this).text()); });
}

ja.blog.wraplink = function(linkhtm, css) {
	var htm = linkhtm;
	if (ja.text.empty(htm)) return '';
	if (0 > ja.text.indexOf(htm, '<li>'))
		htm = '<li class="' + css + '">' + htm + '</li>';
	return htm;
}

ja.blog.all = function (options) {
	options = options || {};
	ja.log.dbg('ja.blog.all()', options);
	var qs = '';
	for (var ky in options) {
		var vl = options[ky];
		ja.log.dbg('ja.blog.all()', ky, vl);
		if (ja.text.empty(vl)) continue;
		qs = '&' + qs + ky + '=' + vl;
	}
	document.location.href = '/search/?q=.&max-results=999' + qs;
}

ja.blog.home = function () {
	ja.cache.set('home', true, 60 * 1000);
	document.location.href = '/';
}

ja.blog.post = function (index) {
	index = index || 0;
	ja.log.dbg('ja.blog.post()', index, 'archives=', ja.blog.archive);
	if (!ja.blog.archive.length) ja.blog.home();
	else if (0 > index) index = 0;
	if (ja.blog.archive.length <= index) ja.log.warn('ja.blog.post(): bounds', index, '>=', ja.blog.archive.length);
	else document.location.href = ja.blog.archive[index].url;
}

ja.blog.first = function () {
	ja.blog.post(0);
}

ja.blog.last = function () {
	ja.blog.post(ja.blog.archive.length - 1);
}

ja.blog.render = function (options) {
	options = options || {};
	ja.log.dbg('ja.blog.render()', options);

	$('header, .content, .side, footer').hide();
	$('.loading').removeClass('loading');
	$('header').show('slow');

	setTimeout(function () {
		$('.side.left').show('slow');

		setTimeout(function () {
			$('.content').show('slow');

			ja.photoswipe.init({
				xp: options.psxp,
				social: options.social,
				captions: options.captions,
				scrollto: options.scrollto,
			});

			setTimeout(function () {
				$('.side.right, footer').show('slow');

				setTimeout(function () {
					if (0 < $('.pswp__img').filter(function(){return $(this).is(':visible');}).length)
						return;

					var hsh = ja.text.hash();
					if (ja.text.empty(hsh) || '#'===hsh || 0===$(hsh).length) {
						ja.ui.top();
					}
					else if ('#more'===hsh) ja.ui.bottom(0);
					else {
						var p = $(hsh);
						var t = p.find('.title');
						if (t.length && t.is(':visible')) ja.ui.scroll2(t, 0);
						else ja.ui.scroll2(hsh, 0);
					}
					ja.blog.sync();
	
					$(document).bind('scroll',function(e){
						if (ja.ui.options.pausescroll) return;
						ja.blog.sync();
					});

					ja.cache.set('welcome', null);
					ja.cache.set('home', null);
				}, 750);
			}, window.delay / 10);
		}, window.delay / 10);
	}, window.delay / 10);
}

ja.blog.sync = function (options) {
	$('.post').each(function(){
		if (
			$(this).offset().top < window.pageYOffset + ja.blog.defaults.offset //begins before top
			&& $(this).offset().top + $(this).height() > window.pageYOffset + ja.blog.defaults.offset //but ends in visible area  //+ 10 allows you to change hash before it hits the top border
		) {
			var hsh = $(this).attr('id');
			if (!ja.text.empty(ja.qs2('gid'))) hsh = hsh + '&gid=' + ja.qs2('gid');
			if (!ja.text.empty(ja.qs2('pid'))) hsh = hsh + '&pid=' + ja.qs2('pid');
			ja.text.hash(hsh, false, 15 * 60 * 1000);
			var a = $('.archive a')
				.removeClass('selected')
				.filter(function () { return '#' + hsh == $(this).attr('href'); })
				.addClass('selected');
			var ul = $('.archive.main');
			ja.ui.scrollin('.archive.main', a, -4);
		}
	});
}

ja.blog.label = function (options) {
	options = options || {};
	ja.log.dbg('ja.blog.label()', options);

	if (ja.text.nul(options.label)) { ja.log.warn('ja.blog.label(): missing label', options); return; }

	if (ja.text.nul(options.callback) && ja.text.nul(options.target)) { ja.log.warn('ja.blog.label(): missing target or callback', options); return; }

	ja.blog.labeloptions = options;

	ja.blog.feed({
		type: 'label',
		target: options.target,
		label: options.label,
		callback: function (data, posts) {
			ja.log.dbg('ja.blog.label()callback', ja.blog.labeloptions, data, posts);
			if (ja.blog.labeloptions && ja.blog.labeloptions.callback)
				ja.blog.labeloptions.callback(data, posts);
		},
	});
}

ja.blog.findpost = function (href) {
	var ret = {
		url: href,
		name: ja.blog.guesspostname(href),
		title: ja.blog.guesspostname(href),
	};
	var ba = ja.blog.archive.find(function (post, index) { return href===post.url; });
	if (!ja.text.nul(ba)) ret = ba;
	return ret;
}

ja.blog.guesspostname = function (href) {
	if (ja.text.empty(href)) return '';
	if ('/'===href) return 'home';
	var parts = href.split('/');
	if (1 > parts.length) return '';
	var lastpart = parts[parts.length - 1];
	lastpart = lastpart.split('.')[0].split('_')[0];
	if (-1 < ja.text.indexof(lastpart,'?')) return '';
	lastpart = ja.text.replace(lastpart, new RegExp('-', 'gi'), ' ');
	return lastpart;
}