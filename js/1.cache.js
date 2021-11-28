
/* common/cache.js */
function setCache(key, value, ttl = 2592000000) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  };

  localStorage.setItem(key, JSON.stringify(item));
}

function getCache(key, defaultvalue = null) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) return defaultvalue;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return defaultvalue;
  }

  return item.value;
}