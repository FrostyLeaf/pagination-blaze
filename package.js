Package.describe({
    "name": "leaf4monkey:pagination-blaze",
    "summary": "add blaze supporting to leaf4monkey:pagination.",
    "version": "0.0.2",
    "git": "https://github.com/FrostyLeaf/pagination-blaze.git",
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom("METEOR@1.2.1");
    api.use(['ecmascript', 'leaf4monkey:pagination@0.0.2']);

    api.use([
        "meteor-base",
        "underscore",
        "reactive-var",
        "reactive-dict",
        "templating",
        "blaze"
    ], "client");

    api.addFiles([
        "client/pagination.js",
        "client/template.html",
        "client/template.js"
    ], "client");

    api.export('MonkeyPagination');
});
