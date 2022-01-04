
ja.event = {};

ja.event.prevent = function(e) {
  if (ja.text.nul(e)) return;
  if (!ja.text.nul(e.preventDefault)) e.preventDefault();
  if (!ja.text.nul(e.stopImmediatePropagation)) e.stopImmediatePropagation();
  if (!ja.text.nul(e.stopPropagation)) e.stopPropagation();
}

ja.event.lastevent = function(e) {
  return e || window.event;
};

ja.event.lasttarget = function(e) {
  e = ja.eventlastevent(e);
  return (e.target || e.srcElement);
};
