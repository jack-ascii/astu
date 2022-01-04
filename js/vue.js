
ja.vue = ja.vue || {};

ja.vue.init = function (options) {
	options = options || {}
	options.id = options.id || 'app';
	options.xp = options.xp || '#' + options.id;

	ja.log.dbg('ja.vue.init()', options);
	var app = window[options.id] = Vue.createApp({
		data() {
			return {
				title: options.title || '',
				description: options.title || '',
				labels: options.labels || ja.blog.labels || [],
				pages: options.pages || ja.blog.pages || [],
				archive: options.archive || ja.blog.archive || [],
				posts: options.posts || ja.blog.posts || [],
			}
		},
		mounted() {
			if (options.mounted) options.mounted();
		}
	});

	app.component('ja-app', {
		props: {
			headerImage: String,
			css: String
		},
		template: '<div class="app flex" :class=css><div id="root"></div><slot></slot></div>'
	});

	app.component('ja-header', {
		props: {
			title: String,
			description: String,
			css: String,
			images: Array,
			image: {
				type: String,
				default: function(props) {
					if (!props.images.length) return '';
					var i = new Date().getMilliseconds() % props.images.length;
					return props.images[i];
				}
			},
			width: { type: Number, default: 1200 },
			height: { type: Number, default: 419 },
		},
		template:
		'<header class="flex w100" :class=css>'+
			'<figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">'+
				'<a :data-caption="description" :href="image" :data-width="width" :data-height="height">'+
					'<img class="w100" :src=image />'+
				'</a>'+
			'</figure>'+
			'<h1 class="w100">{{title}}</h1>'+
			'<h2 class="w100">{{description}}</h2>'+
			'<slot></slot>'+
		'</header>'
	});

	app.component('ja-main', {
		props: {
			css: String
		},
		template: '<main class="flex w100" :class=css><slot></slot></main>'
	});

	app.component('ja-side', {
		props: {
			flex: String,
			css: String
		},
		template: '<div class="side flex" :class=css :style="{flexBasis: flex}"><slot></slot></div>'
	});

	app.component('ja-content', {
		props: {
			flex: String,
			css: String
		},
		template: '<div class="content flex" :class=css :style="{flexBasis: flex}"><slot></slot></div>'
	});

	app.component('ja-footer', {
		props: {
			css: String
		},
		template: '<footer class="flex w100" :class=css><slot></slot></footer>'
	});

	app.component('ja-link', {
		props: {
			item: Object,
			css: {
				type: String,
				default: function(props) { return props.item.name + ' ' + props.item.css; },
			},
		},
		template: '<li :class=css><a :key=item.name :href=item.url>{{item.name}}</a></li>'
	});

	app.component('ja-links', {
		props: {
			items: Array,
			css: String
		},
		template: '<ul :class=css>'+
								'<ja-link v-for="item in items" :key=item.url :item=item></ja-link>'+
							'</ul>'
	});

	app.component('ja-img', {
		props: {
			css: String,
			small: String,
			large: String,
			height: String,
			width: String,
			caption: String,
			author: String,
		},
		template:
			'<figure :class=css itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">'+
				'<a :href=large :data-caption=caption :data-height=height :data-width=width itemprop="contentUrl">'+
					'<img :src=small itemprop="thumbnail"/>'+
				'</a>'+
			'</figure>'+
			'<p class="caption">'+
				'<slot><span v-html=caption></span></slot>'+
				'<a class="author">{{author}}</a>'+
			'</p>'
	});

	app.component('ja-poem', {
		props: {
			items: Array,
			css: String,
		},
		template:
			'<div :class=css class="poem">'+
				'<slot></slot>'+
			'</div>'
	});

	app.component('ja-post', {
		props: {
			item: Object,
			css: String,
			labelcss: { type: String, default: 'labels' },
			postid: {
				type: String,
				default: function (props) { return 'post'+props.item.id; },
			},
			newer: {
				type: String,
				default: function (props) { return ja.blog.findpost(props.item.newer).title; },
			},
			older: {
				type: String,
				default: function (props) { return ja.blog.findpost(props.item.older).title; },
			},
		},
		template: '<div :id=postid class="post" :class=css>'+
								'<h2 class="date">{{item.dateHeader}}</h2>'+
								'<h3 class="title">{{item.title}}</h3>'+
								'<slot><div class="body" v-html="item.body"></div></slot>'+
								'<div class="nextprev"><a class="newer" :href="item.newer">{{newer}}</a> <a class="older" :href="item.older">{{older}}</a></div>'+
								'<ja-links :items="item.labels" :css="labelcss"></ja-links>'+
							'</div>'
	});

	app.component('ja-blog', {
		props: {
			items: Array,
			css: String
		},
		template: '<div class="blog" :class=css>'+
								'<ja-post v-for="item in items" :key="item.id" :item="item"></ja-post>'+
							'</div>'
	});

	app.mount(options.xp);
	ja.vue.app = app;
}
