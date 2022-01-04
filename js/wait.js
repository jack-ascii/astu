
ja.waiting = {};

ja.wait = function(key, condition, callback) {
  if (condition()) { callback(); return; }

  if (ja.text.empty(key)) { ja.log.write('ja.wait(): missing key'); return; }

  ja.waiting[key] = ja.waiting[key] || {};

  if (ja.text.nul(condition)) condition = ja.waiting[key].condition;
  else ja.waiting[key].condition = condition;
  if (ja.text.nul(condition)) { ja.log.write('ja.wait(): missing condition'); return; }

  if (ja.text.nul(callback)) callback = ja.waiting[key].callback;
  else ja.waiting[key].callback = callback;
  if (ja.text.nul(callback)) { ja.log.write('ja.wait(): missing callback'); return; }

  setTimeout(function(){ ja.wait(key, condition, callback); }, 250);
};
