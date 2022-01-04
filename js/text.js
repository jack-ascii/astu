
ja.text = {};

ja.text.nul = function(inp) {
  if (null === inp || undefined === inp || "undefined" === inp) { return true; }
  return false;
}

ja.text.empty = function(inp) {
  if (ja.text.nul(inp)) { return true; }
  if ("object" == typeof inp) { try { inp = inp[0].value; } catch (ex) { } }
  return 0 === ja.text.trim(inp).length;
}

ja.text.unhtml = function(html) {
  var tmp = document.createElement('DIV'); tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

ja.text.trim = function(oin) {
  var sin = (null !== oin && undefined !== oin ? oin : '');
  if (null !== sin.trim && undefined !== sin.trim) {
    try { sin = sin.trim(); } catch (ex) { }
  }
  return sin;
}

ja.text.lower = function(oin) {
  var sin = (null !== oin && undefined !== oin ? oin : '');
  if (null !== sin.toLowerCase && undefined !== sin.toLowerCase) {
    try { sin = sin.toLowerCase(); } catch (ex) { }
  }
  return sin;
}

ja.text.indexOf = function(oin, fnd) {
  var sin = (null !== oin && undefined !== oin ? oin : ''), ret = -1;
  if (null !== sin.indexOf && undefined !== sin.indexOf) {
    try { ret = sin.indexOf(fnd); } catch (ex) { }
  }
  return ret;
}
ja.text.indexof = ja.text.indexOf;

ja.text.replace = function(oin, fnd, rplc, max=9) {
  var sin = (null !== oin && undefined !== oin ? oin : '');
  try {
    if (null !== sin.replace && undefined !== sin.replace) {
      sin = sin.replace(fnd, rplc);
    }
    else {
      var n = 0;
      while (-1 < ja.text.indexOf(sin, fnd) && n++ < max)
        sin = sin.replace(fnd, rplc);
    }
  } catch (ex) { ja.log.warn('ja.text.replace()', ex); }
  return sin;
}

ja.text.hash = function(target, quiet, duration) {
  duration = duration || 15*1000;
  if (!ja.text.nul(target)) {
    if (quiet) ja.cache.set('hash', target, 15*1000);
    else document.location.hash = target;
  }
  var hsh = document.location.hash.split('&')[0];
  if (ja.text.empty(hsh)) hsh = ja.cache.get('hash');

  if (ja.text.empty(hsh)) return '';
  if (0 > ja.text.indexof(hsh, '#')) hsh = '#'+ hsh;

  return hsh;
}

ja.text.truncnumber = function(digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
      m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
}

ja.text.shuffle = function(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

ja.text.decode = function(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

ja.text.clearto = function(timeout) {
  if (!ja.text.nul(timeout)) clearTimeout(timeout);
  timeout = null;
  return null;
}

Number.prototype.trunc = function(digits) {
  return ja.text.truncnumber(digits);
};
