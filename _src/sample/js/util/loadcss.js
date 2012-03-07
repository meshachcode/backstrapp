define(['underscore'], function (_) {
    return function loadCss(cssFile, element) {
        var path = "",
            folder = "app/css",
            extension = ".css",
            href = '/' + (path ? path + '/' : '') + folder + '/' + cssFile + extension;

        if (document.createStyleSheet) {
            document.createStyleSheet(href);
        }
        else {
            var link = $('<link/>', {
                rel: 'stylesheet',
                type: 'text/css',
                href: href
            });
            link.appendTo('head');
            if (element) {
                setTimeout(function () {
                    element.css('visibility', 'visible');
                }, 100);
            }
        }
    };
});