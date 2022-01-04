
ja.photoswipe = ja.photoswipe || {};
ja.photoswipe.defaults = ja.photoswipe.defaults || {};
ja.photoswipe.defaults.xp = ja.photoswipe.defaults.xp || '.gallery';

ja.photoswipe.init = function(options) {
  options = options || {};
  options.xp = options.xp || ja.photoswipe.defaults.xp;
  options.social = options.social || false;
  options.captions = options.captions || true;
  options.togglecontrols = options.togglecontrols || false;

  ja.log.dbg('ja.photoswipe.init()', 'options=', options);
  ja.photoswipe.initoptions = options;

  'use strict';

(function($){
  ja.photoswipe.initoptions.container = [];

  ja.photoswipe.initoptions.target = $(options.xp);

  ja.photoswipe.initoptions.figures = ja.photoswipe.initoptions.target.find('figure');
  ja.log.dbg('ja.photoswipe.init()', 'figures=', ja.photoswipe.initoptions.figures);
  ja.photoswipe.initoptions.figures.each(function(){
    ja.log.dbg('ja.photoswipe.init()', 'figure=', $(this)[0]);
    var $link = $(this).find('a'),
      item = {
        src: $link.attr('href'),
        w: $link.data('width'),
        h: $link.data('height'),
        title: $link.data('caption')
      };
    $(this)
      .attr('index', ja.photoswipe.initoptions.container.length)
      .attr('id', 'figure'+ja.photoswipe.initoptions.container.length);
    ja.log.dbg('ja.photoswipe.init()', '$link=', $link, 'item=', item);
    ja.photoswipe.initoptions.container.push(item);
    ja.log.dbg('ja.photoswipe.init()', 'ja.photoswipe.initoptions.container=', ja.photoswipe.initoptions.container);
  });

  ja.photoswipe.initoptions.links = ja.photoswipe.initoptions.target.find('figure a');
  ja.log.dbg('ja.photoswipe.init()', 'links=', ja.photoswipe.initoptions.links);
  ja.photoswipe.initoptions.links.click(function(event){
    ja.event.prevent(event);
    ja.log.dbg('ja.photoswipe.link.click()', $(this)[0]);

    var $pswp = $('.pswp')[0],
      options = {
        index: parseInt($(this).parent('figure').attr('index')),
        bgOpacity: 0.85,
        showHideOpacity: true,
        shareEl: ja.photoswipe.initoptions.social,
        captionEl: ja.photoswipe.initoptions.captions,
        tapToToggleControls: ja.photoswipe.initoptions.togglecontrols,
      };

    ja.log.dbg('ja.photoswipe.link.click()', '$pswp=', $pswp, 'options=', options);

    ja.photoswipe.initoptions.gallery =
      new PhotoSwipe($pswp, PhotoSwipeUI_Default, ja.photoswipe.initoptions.container, options);

    ja.log.dbg('ja.photoswipe.link.click()', 'ja.photoswipe.initoptions.gallery=', ja.photoswipe.initoptions.gallery);

    ja.photoswipe.initoptions.gallery.init();
  });

  setTimeout(function () {
    var qpid = ja.qs2('pid');
    if (qpid) {
      var npid = parseInt(qpid);
      if (!Number.isNaN(npid))
      {
        var gallery = $('figure img');
        if (gallery.length >= npid)
        {
          var a = $(gallery[npid-1]).parent('a');
          a.click();
        }
      }
    }
  }, 1500);

  }(jQuery));
}