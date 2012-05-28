# JSCheck Prettifier

This project takes JSCheck and handles reports, adding a nice interface on the reports.

## Usage

Add the following to the footer of the document:

```html
<script type="text/javascript" src="jscheck/jscheck/jscheck.js"></script>
<script type="text/javascript" src="jscheck/jscheck/js_prettify.js"></script>
```

And the following to the header:

```html
<link rel="stylesheet" type="text/css" src="jscheck/jscheck_prettify.css" />
```

Then when `on_report` is called, the results of the reports will be displayed in the div with ID "jscheckreport". If that div doesn't exist, it will be appended to the document body.
