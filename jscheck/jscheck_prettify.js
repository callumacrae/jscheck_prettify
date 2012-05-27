var testResults = {};
var result;

JSC.on_result(function (res) {
	result = res;
});

JSC.on_report(function (report) {
	var reportdiv = document.getElementById('jscheckreport');
	if (reportdiv === null) {
		reportdiv = document.createElement('div');
		reportdiv.id = 'jscheckreport';
		document.body.appendChild(reportdiv);
	}
	reportdiv.innerHTML = '<div class="jscheckinfo"></div><div class="jscheckcases"></div>';
	
	reportdiv.getElementsByClassName('jscheckinfo')[0].innerHTML = result.total + ' tests: '
		+ result.pass + ' pass, ' + result.lost + ' lost, ' + result.fail + ' fails.';

	var reports = report.split('\n');
	for (var group in testResults) {
		var groupdiv = document.createElement('div');
		groupdiv.innerHTML = '<strong>' + group + '</strong><ul></ul>';
		reportdiv.getElementsByClassName('jscheckcases')[0].appendChild(groupdiv);
		for (var testCase in testResults[group]) {
			var reportText = false;
			for (var i = 0; i < reports.length - 1; i++) {
				if (reports[i].indexOf(testCase) === 0) {
					reportText = reports[i];
					break;
				}
			}
			
			if (reportText === false) {
				throw new Error('Error, not sure why. Ask Callum.');
			}
			
			var status = /: (\d+) cases tested, (\d+) pass/.exec(reportText);
			if (status[1] === status[2]) {
				status = 'pass';
			} else if (!(status = /(\d+) fail/.exec(reportText))) {
				status = 'lost';
			} else {
				status = 'fail';
			}
			
			var casediv = document.createElement('li');
			casediv.className = status;
			casediv.innerHTML = reportText;
			groupdiv.getElementsByTagName('ul')[0].appendChild(casediv);
		}
	}
});

function testResultHandler(test) {
	if (!testResults[test.group]) {
		testResults[test.group] = {};
	}
	if (!testResults[test.group][test.name]) {
		testResults[test.group][test.name] = [];
	}
	testResults[test.group][test.name].push(test);
}
JSC.on_fail(testResultHandler);
JSC.on_lost(testResultHandler);
JSC.on_pass(testResultHandler);
