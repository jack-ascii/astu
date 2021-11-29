
function feed(options) {
  if (nul(options)) options = {};
  if (nul(options.start)) options.start = 1;
  if (nul(options.max)) options.max = 999;
  if (nul(options.type)) options.type = 'posts';

  dbg('feed()','options=', options);

  window['feed' + options.type] = function (data) {
    dbg('feed' + options.type+'()', 'data=', data);
    if (!nul(options.callback)) {
      var posts = [];
      for(var e in data.feed.entry) {
        var entry = data.feed.entry[e];
        var post = { name: entry.title.$t };
        for(var l in entry.link) {
          var link = entry.link[l];
          if ('text/html'==link.type) { post.url = link.href.split('#')[0]; break; }
        }
        posts.push(post);
      }
      options.callback(data, posts);
    }
  }

  $.getScript(
    window.location.origin+'/feeds/'+options.type+'/default?alt=json&'+
      'callback=feed'+options.type+
      '&start-index='+options.start+
      '&max-results='+options.max,
  function(){
  });
}