
ja.slides = {
	options: {
		index: -1,
		delay: 20 * 1000,
		pause: true,
	},
};

ja.slides.auto = function() {
	ja.log.dbg('ja.slides.auto()', ja.slides.options);
	ja.slides.clear();

	ja.wait('slides.auto',
		function () { return !ja.text.nul(ja.photoswipe.initoptions); },
		function () {
			ja.log.dbg('ja.slides.auto()cb', ja.slides.options);

			if (!$('.pswp').is(':visible')) ja.slides.options.pause = true;
			if (ja.slides.options.pause) return;

			if (ja.slides.options.index === ja.slides.options.figures.length - 1) {
				if (0 < ja.slides.options.index) ja.photoswipe.initoptions.gallery.close();
				return;
			}

			ja.wait('slides.init',
				function (){ return !ja.text.nul(ja.photoswipe.initoptions.gallery); },
				function (){
					ja.log.dbg('ja.slides.auto()init', ja.slides.options);
					ja.slides.listen();
					var current = ja.photoswipe.initoptions.gallery.getCurrentIndex();
					if (-1 === ja.slides.options.index) ja.slides.options.index = current
					else current++;
					ja.log.dbg('ja.slides.auto()init', 'current=', current, 'index=', ja.slides.options.index);
					if (current !== ja.slides.options.index) {
						ja.log.dbg('ja.slides.auto()init', 'goTo=', current);
						ja.photoswipe.initoptions.gallery.goTo(ja.slides.options.index = current);
					}
					ja.slides.timeout();
				},
			);
		});
}

ja.slides.timeout = function() {
	ja.slides.clear();
	ja.slides.options.timeout =
		setTimeout(
			function(){ ja.slides.auto(); },
			ja.slides.options.delay);
}

ja.slides.clear = function() {
	if (!ja.text.nul(ja.slides.options.timeout))
		clearTimeout(ja.slides.options.timeout);
	ja.slides.options.timeout = null;
}

ja.slides.listen = function() {
	ja.log.dbg('ja.slides.listen()');
	var gallery = ja.photoswipe.initoptions.gallery;
	gallery.listen('afterChange', function () {
		ja.log.dbg('ja.slides.listen():afterChange()', ja.photoswipe.initoptions.gallery.getCurrentIndex());
		ja.slides.options.index = ja.photoswipe.initoptions.gallery.getCurrentIndex();
		ja.slides.timeout();
	});
	gallery.listen('close', function () {
		ja.log.dbg('ja.slides.listen():close()');
		ja.slides.clear();
		ja.slides.options.index = -1;
		ja.slides.options.pause = true;
		toggle();
		return;
	});
}

ja.slides.play = function() {
	const figures = [...ja.photoswipe.initoptions.figures];
	//figures.push(figures.shift());
	ja.slides.options.figures = figures;
	ja.slides.auto();
};
