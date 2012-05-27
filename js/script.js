JSC.group('test');

JSC.claim('50%', function (verdict) {
	return verdict(Math.random() < 0.5);
}, []);

JSC.claim('100%', function (verdict) {
	return verdict(true);
}, []);

JSC.check();
