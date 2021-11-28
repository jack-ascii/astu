
/* common/pswipe.js */
function photoswipe(options) {
  console.log('photoswipe()', 'options=', options);

  var xp = '.gallery'; var social = false; var captions = false;
  if (!nul(options)) {
    if (!empty(options.xp)) xp = options.xp;
    if (!nul(options.social)) social = options.social;
    if (!nul(options.captions)) captions = options.captions;
  }

  'use strict';

(function($){
  var container = [];

  $(xp).find('figure').each(function(){
    var $link = $(this).find('a'),
      item = {
        src: $link.attr('href'),
        w: $link.data('width'),
        h: $link.data('height'),
        title: $link.data('caption')
      };
    $(this)
      .attr('index', container.length)
      .attr('id', 'figure'+container.length);
    container.push(item);
  });

  $(xp+' figure a').click(function(event){
    event.preventDefault();
    var $pswp = $('.pswp')[0],
      options = {
        index: parseInt($(this).parent('figure').attr('index')),
        bgOpacity: 0.85,
        showHideOpacity: true,
        shareEl: social,
        captionEl: captions,
      };
    var gallery = window._gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();
    gallery.listen('close', function() {
      scroll2('#figure'+_gallery.getCurrentIndex());
    });
  });

  var qpid = qs('pid');
  if (qpid) {
    var npid = parseInt(qpid);
    if (!Number.isNaN(npid))
    {
      var gallery = $('figure img');
      if (gallery.length >= npid)
      {
        var a = $(gallery[npid-1]).parent('a');
        a.click();
        scroll2('#figure'+(npid-1));
      }
    }
  }

  }(jQuery));
}