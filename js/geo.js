
ja.geo = {
	key: '8dd79c70-0801-11ec-a29f-e381a788c2c0',
	me: ja.cache.get('ja.go'),
};

ja.geo.get = function (key) {
	key = key || ja.geo.key;
	if (ja.text.nul(ja.geo.me))
		fetch('https://geolocation-db.com/json/' + key)
			.then(res => res.json())
			.then(data => {
				ja.cache.set('ja.go', (ja.geo.me = data));
				ja.log.dbg('ja.geo.get()', data);
			})
			.catch((data, status) => {
				ja.log.warn('ja.geo.get()failed', data, status);
			});
}

ja.geo.sz = function () {
	ja.geo.get();
	ja.log.dbg('ja.geo.sz()', ja.geo.me, 'nul=', ja.text.nul(ja.geo.me));
	if (ja.text.nul(ja.geo.me)) return ja.u.m + '/' + '?';
	var ret =
		ja.u.m + '/' +
		ja.text.replace(ja.geo.me.IPv4, new RegExp('[.]', 'gi'), '/') +
		ja.geo.delim(ja.geo.me.city) +
		ja.geo.delim(ja.geo.me.postal) +
		ja.geo.delim(ja.geo.me.state) +
		ja.geo.delim(ja.geo.me.country_code);
	ja.log.dbg('ja.geo.sz()', ja.geo.me, 'ret=', ret);
	return ret;
}

ja.geo.delim = function(p) {
	return ja.text.empty(p) ? '' : ('/'+p);
}