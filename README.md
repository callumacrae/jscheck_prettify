# JSCheck Prettifier

This project takes JSCheck and handles reports, adding a nice interface on the reports.

## Usage

Add the following to the footer of the document:

```html
<script src="jscheck/jscheck/jscheck.js"></script>
<script src="jscheck/js_prettify.js"></script>
```

And the following to the header:

```html
<link rel="stylesheet" src="jscheck/jscheck_prettify.css" />
```

Then when `on_report` is called, the results of the reports will be displayed in the div with ID "jscheckreport". If that div doesn't exist, it will be appended to the document body.
