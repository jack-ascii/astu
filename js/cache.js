
ja.cache =
{
  enabled: '0'!==ja.qs2('cache'),
};

ja.cache.set = function(key, value, ttl = 2592000000) {
if (!ja.cache.enabled) return;
  ja.log.dbg('ja.cache.set()', 'key=', key, 'value=', value, 'ttl=', ttl);

  const now = new Date();
  const item = {
    value: value,
    expiry: -1 < ttl ? (now.getTime() + ttl) : ttl,
  };

  localStorage.setItem('ja.'+key, JSON.stringify(item));
}

ja.cache.get = function(key, defaultvalue = null) {
  if (!ja.cache.enabled) return null;
  const itemStr = localStorage.getItem('ja.'+key);

  if (!itemStr) return defaultvalue;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (-1 < item.expiry && now.getTime() > item.expiry) {
    localStorage.removeItem('ja.'+key);
    return defaultvalue;
  }

  ja.log.dbg('ja.cache.get()', 'key=', key, 'defaultvalue=', defaultvalue, 'value=', item.value);

  return item.value;
}

ja.cache.clear = function() {
  for (var c in localStorage) {
    localStorage[c] = null;
    delete localStorage[c];
  }
}