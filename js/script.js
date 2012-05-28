JSC.group('Percentages');

JSC.claim('25%', function (verdict) {
	return verdict(Math.random() < 0.25);
}, []);

JSC.claim('99%', function (verdict) {
	return verdict(Math.random() < 0.99);
}, []);

JSC.claim('100%', function (verdict) {
	return verdict(true);
}, []);

JSC.group('JavaScript');

JSC.claim('setTimeout', function (verdict) {
	setTimeout(function () {
		verdict(true);
	}, 10);
}, []);

JSC.claim('boolean', function (verdict) {
	return verdict(true !== false);
}, []);

JSC.group('Lost');

JSC.claim('Lost', function (verdict) {
	verdict((Math.random() < 0.5) ? null : false);
}, []);

JSC.check();
