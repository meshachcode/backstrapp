require({
    paths: {
        underscore: "util/underscore",
        html:		"../html"
    }
},
['util/content-builder', 'util/module-activator'], function (builder, activator) {
    activator.execute();
    builder.execute();
});