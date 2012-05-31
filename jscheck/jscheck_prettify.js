var testResults = {};
var result;

JSC.on_result(function (res) {
	result = res;
});

JSC.on_report(function (report) {
	var casesdiv, casesdiv, group, groupdiv, i, infodiv, reportdiv, reports, testCase;

	reportdiv = document.getElementById('jscheckreport');
	if (reportdiv === null) {
		reportdiv = document.createElement('div');
		reportdiv.id = 'jscheckreport';
		document.body.appendChild(reportdiv);
	}

	infodiv = document.createElement('div');
	infodiv.className = 'jscheckinfo';
	infodiv.innerHTML = result.total + ' tests: ' + result.pass + ' pass, '
		+ result.lost + ' lost, ' + result.fail + ' fails.';
	reportdiv.appendChild(infodiv);

	casesdiv = document.createElement('div');
	casesdiv.className = 'jscheckcases';
	reportdiv.appendChild(casesdiv);

	reports = report.split('\n');
	for (group in testResults) {
		groupdiv = document.createElement('div');
		groupdiv.innerHTML = '<strong>' + group + '</strong><ul></ul>';
		casesdiv.appendChild(groupdiv);
		for (testCase in testResults[group]) {
			casediv = document.createElement('li');
			groupdiv.getElementsByTagName('ul')[0].appendChild(casediv);

			for (i = 0; i < reports.length - 1; i++) {
				if (reports[i].indexOf(testCase) === 0) {
					casediv.innerHTML = reports[i];
					break;
				}
			}

			if (!(/(fail|lost)/.test(casediv.innerHTML))) {
				casediv.className = 'pass';
			} else if (/(\d+) lost/.test(casediv.innerHTML)) {
				casediv.className = 'lost';
			} else {
				casediv.className = 'fail';
			}
		}
	}
});

function testResultHandler(test) {
	var group = test.group || 'No Group';
	if (!testResults[group]) {
		testResults[group] = {};
	}
	if (!testResults[group][test.name]) {
		testResults[group][test.name] = [];
	}
	testResults[group][test.name].push(test);
}
JSC.on_fail(testResultHandler);
JSC.on_lost(testResultHandler);
JSC.on_pass(testResultHandler);
