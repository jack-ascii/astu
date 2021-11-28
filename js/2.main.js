
/* common/main.js */
var _scrollto=null, _last_scroll_xp=null, _last_scroll_dur=null;
function scrollto(xp,dur){ 
  clearTimeout(_scrollto); _last_scroll_xp=xp; _last_scroll_dur=dur;
  _scrollto=setTimeout(function(){
    if(xp instanceof jQuery){scrollto3('html,body',_last_scroll_xp,_last_scroll_dur);}
    else{scrollto2('html,body',_last_scroll_xp,_last_scroll_dur);}
  },125);
}

function scrollto2(xp1,xp2,dur){ 
 try{
    var el=$(xp2); if(0===el.length){return;}
    scrollto3(xp1,el,dur);
  }catch(ex){}
}

function scrollto3(xp,el,dur){
  if(nul(el)||0===el.length){return;}
  $(xp).animate({ scrollTop: el.offset().top-('html,body'===xp?0:0) }, null===dur||undefined===dur?5:dur);
}

function _top(){ $('html, body').animate({ scrollTop: $('.post-title').offset().top }, 1000); }
