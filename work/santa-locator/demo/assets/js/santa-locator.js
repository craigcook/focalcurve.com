(function () {
    'use strict';

    var html = document.documentElement;
    var santaLocator;
    var status = document.getElementById('status');
    var error = document.getElementById('error');
    var panda = document.getElementById('panda');
    var cta = document.getElementById('cta');
    var time = Math.floor(Math.random() * 2000) + 8000; // randomize delay between 8-10 seconds

    // Add class to reflect javascript availability for CSS
    html.className = html.className.replace(/\bno-js\b/, 'js');

    clearTimeout(santaLocator);
    error.classList.remove('show');
    status.classList.add('show');

    santaLocator = setTimeout(function () {
        status.classList.remove('show');
        error.classList.add('show');
        panda.classList.add('show');
        cta.classList.add('show');
    }, time);
})();
