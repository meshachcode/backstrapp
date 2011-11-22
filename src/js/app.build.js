({
    appDir: "../",
    baseUrl: "js",
    dir: "../../build",
	inlineText: true,
	paths: {
	    "loader": "libs/backbone/loader",
        "requireLib": "libs/require/require",
		"jQuery": "libs/jquery/jquery",
		"Underscore": "libs/underscore/underscore",
		"Backbone": "libs/backbone/backbone",
		"templates": "../templates"
    },
	modules: [
        {
            include: ["requireLib", "main"]
        }
    ]
})