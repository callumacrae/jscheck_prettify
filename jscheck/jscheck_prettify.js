var testResults = {};
var result;

JSC.on_result(function (res) {
	result = res;
});

JSC.on_report(function (report) {
	var i, reportdiv, reports, casediv;
	
	reportdiv = document.getElementById('jscheckreport');
	if (reportdiv === null) {
		reportdiv = document.createElement('div');
		reportdiv.id = 'jscheckreport';
		document.body.appendChild(reportdiv);
	}
	reportdiv.innerHTML = '<div class="jscheckinfo"></div><div class="jscheckcases"></div>';
	
	reportdiv.getElementsByClassName('jscheckinfo')[0].innerHTML = result.total + ' tests: '
		+ result.pass + ' pass, ' + result.lost + ' lost, ' + result.fail + ' fails.';
	
	reports = report.split('\n');
	for (result in testResults) {
		
	}
});

function getStatus(pass) {
	return (pass) ? 'pass' : (pass === null) ? 'lost' : 'fail';
}

function testResultHandler(test) {
	if (!testResults[test.name]) {
		testResults[test.name] = [];
	}
	testResults[test.name].push(test);
}
JSC.on_fail(testResultHandler);
JSC.on_lost(testResultHandler);
JSC.on_pass(testResultHandler);
