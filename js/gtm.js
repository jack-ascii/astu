
ja.gtm = {};

ja.gtm.init = function (gtm) {//'GTM-PN5HK9R'
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtm);
}

ja.gtm.webevent = function(cat, act, lbl) {
  act = act ||
    ja.text.replace(document.location.hostname,'.blogspot.com','')+
    document.location.pathname+
    document.location.search;
  lbl = lbl || ja.geo.sz();
  dataLayer.push({'event': 'web.event','web_event_category': cat,'web_event_action': act,'web_event_label': lbl});
  return this;
}
