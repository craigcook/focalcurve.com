/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.

 Portions based on http://blog.gospodarets.com/native_smooth_scrolling/
*/


Mozilla.smoothScroll = (function() {
    'use strict';

    var _smoothScroll;
    var $htmlBody;

    var _init = function(unitTest) {
        var hasSmoothScroll;

        // try to use native smooth scrolling
        if (unitTest) {
            hasSmoothScroll = (unitTest === 'native') ? true : false;
        } else {
            hasSmoothScroll = 'scrollBehavior' in document.documentElement.style;
        }

        // use native smooth scrolling
        if (hasSmoothScroll) {
            _smoothScroll = function(opts) {
                window.scrollTo(opts);
            };
        // otherwise, use jQuery if it's available
        } else if (window.jQuery) {
            $htmlBody = $('html, body');

            _smoothScroll = function(opts) {
                $htmlBody.animate({
                    scrollTop: opts.top,
                    scrollLeft: opts.left
                }, 400);
            };
        // default to regular ol' jump scrolling
        } else {
            _smoothScroll = function(opts) {
                window.scrollTo(opts.top, opts.left);
            };
        }
    };

    /*
    userOpts: object of params (required):
        behavior: type of scrolling. (default: 'smooth')
        top: number of pixels from the top to scroll. (default: 0)
        left: number of pixels from the left to scroll. (default: 0)

    At least one of the two axes (top, left) should be specified.
    */
    return function(userOpts) {
        // set up defaults
        var opts = {
            behavior: userOpts.behavior || 'smooth',
            top: userOpts.top || 0,
            left: userOpts.left || 0
        };

        // lazy load behavior detection
        if (typeof _smoothScroll !== 'function' || userOpts.unitTest) {
            _init(userOpts.unitTest);
        }

        _smoothScroll(opts);
    };
})();



(function($) {
    'use strict';

    var $document = $(document);
    var $html = $(document.documentElement);
    var $gridVideo = $('#grid-video');
    var frameSrc = $gridVideo.data('frameSrc');

    var featureQueriesSupported = typeof CSS !== 'undefined' && typeof CSS.supports !== 'undefined';

    if (window.Mozilla.Client.isFirefox) {
        if (featureQueriesSupported && CSS.supports('display', 'grid')) {
            $html.addClass('firefox-has-grid');
        } else {
            $html.addClass('old-firefox');
            $gridVideo.attr('src', frameSrc);
        }
    } else {
        $html.addClass('not-firefox');
        $gridVideo.attr('src', frameSrc);
    }

    if (window.Mozilla.Client.isMobile) {
        $html.addClass('not-desktop');
    }

    // Scroll smoothly to the linked section
    $document.on('click', '#page-nav .page-nav-menu a[href^="#"]', function(e) {
        e.preventDefault();
        // Extract the target element's ID from the link's href.
        var elem = $(this).attr('href').replace(/.*?(#.*)/g, '$1');
        var offset = $(elem).offset().top;

        Mozilla.smoothScroll({
            top: offset
        });
    });

    // Switch demo styles
    $document.on('click', '.demo-controls .example-switch', function() {
        var demoId = $(this).parents('.demo-section').attr('id');
        var demo = $('#' + demoId);
        var switches = $(this).parents('.demo-controls').find('.example-switch');
        var newClass = $(this).data('example-class');

        demo.removeClass('example-1 example-2 example-3').addClass(newClass);
        switches.removeClass('active');
        $(this).addClass('active');
    });

})(window.jQuery);
