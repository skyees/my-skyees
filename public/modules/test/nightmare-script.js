'use strict';

var page = require('webpage').create();
page.open('https://modulus.io', function () {
    page.render('modules/text/modulus.png');
    phantom.exit();
});
