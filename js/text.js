
/* common/text.js */
function trim(oin) { 
  var sin = null !== oin && undefined !== oin ? oin : ""; 
  if (null !== sin.trim && undefined !== sin.trim) { try { sin = sin.trim(); } catch (ex) { } } 
  return sin;
}

function nul(inp) { 
  if (null === inp || undefined === inp || "undefined" === inp) { return true; } 
  return false;
}

function empty(inp) { 
  if (nul(inp)) { return true; } 
  if ("object" == typeof inp) { try { inp = inp[0].value; } catch (ex) { } } 
  return 0 === trim(inp).length;
}

function unhtml(html) { 
  var tmp = document.createElement('DIV'); tmp.innerHTML = html; 
  return tmp.textContent || tmp.innerText || ''; 
}

function trim(oin) {
  var sin = (null !== oin && undefined !== oin ? oin : '');
  if (null !== sin.trim && undefined !== sin.trim) {
    try { sin = sin.trim(); } catch (ex) { }
  }
  return sin;
}

function lower(oin) {
  var sin = (null !== oin && undefined !== oin ? oin : '');
  if (null !== sin.toLowerCase && undefined !== sin.toLowerCase) {
    try { sin = sin.toLowerCase(); } catch (ex) { }
  }
  return sin;
}

function indexOf(oin, fnd) {
  var sin = (null !== oin && undefined !== oin ? oin : ''), ret = -1;
  if (null !== sin.indexOf && undefined !== sin.indexOf) {
    try { ret = sin.indexOf(fnd); } catch (ex) { }
  }
  return ret;
}

function replace(oin, fnd, rplc) {
  var sin = (null !== oin && undefined !== oin ? oin : '');
  if (null !== sin.replace && undefined !== sin.replace) {
    try { sin = sin.replace(fnd, rplc); } catch (ex) { }
  }
  return sin;
}

Number.prototype.trunc = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
