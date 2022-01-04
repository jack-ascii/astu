
ja.u = {};

ja.u.n = function () {
  var u = ja.qs('u');
  if (ja.text.empty(u)) u = ja.cache.get('u');
  else ja.cache.set('u', u, -1);
  return ja.text.empty(u) ? '?' : u;
};

ja.u.m = ja.u.n();
