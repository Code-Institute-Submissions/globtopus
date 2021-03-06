/*
 *
 * AS I NEEDED TO OUTPUT DIFFERENT JS FILES TO DIFFERENT HTML PAGES*
 * FILES, I FOUND SOLUTION AT
 *
 *
 * https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
 */
const path = require ( 'path' );

var config = {

	module : {}
};

var dist ='gl_modules/assets_dist/static/js'

var country = Object.assign ( {}, config, {

	entry  : [


		'./gl_modules/posts/static/js/posts.js',
		'./gl_modules/charts/static/js/charts.js',
		'./gl_modules/country/static/src/js/country.js',
		'./gl_modules/shared/static/js/site_intro.js',




	],
	output : {
		path     : path.resolve ( __dirname, dist ),
		filename : "country.js"
	},
	watch  : true
} );

var landing = Object.assign ( {}, config, {

	entry  : [

		'./gl_modules/landing/static/src/js/landing.js',
		'./gl_modules/shared/static/js/feel_meter.js',
		'./gl_modules/shared/static/js/form_label.js',
		'./gl_modules/posts/static/js/posts.js',
		'./gl_modules/charts/static/js/charts.js',
		'./gl_modules/map/static/src/js/map_loader.js',
		'./gl_modules/shared/static/js/site_intro.js',



	],
	output : {
		path     : path.resolve ( __dirname, dist ),
		filename : "landing.js"
	},
	watch  : true
} );
var user = Object.assign ( {}, config, {

	entry  : [
		'./gl_modules/shared/static/js/feel_meter.js',
		'./gl_modules/user/static/src/js/user.js',
		'./gl_modules/posts/static/js/posts.js',
		'./gl_modules/shared/static/js/site_intro.js',
	],
	output : {
		path     : path.resolve ( __dirname, dist ),
		filename : "user.js"
	},
	watch  : true
} );
var public_user = Object.assign ( {}, config, {

	entry  : [
		'./gl_modules/posts/static/js/posts.js',

		'./gl_modules/shared/static/js/site_intro.js',

	],
	output : {
		path     : path.resolve ( __dirname, dist ),
		filename : "public_user.js"
	},
	watch  : true
} );

var admin = Object.assign ( {}, config, {

	entry  : [
		'./gl_modules/admin/static/js/admin.js',


	],
	output : {
		path     : path.resolve ( __dirname, dist ),
		filename : "admin.js"
	},
	watch  : true
} );

var sign_up = Object.assign ( {}, config, {

	entry  : [


		'./gl_modules/authorize/static/src/js/form_check.js',
		'./gl_modules/shared/static/js/feel_meter.js',
		'./gl_modules/shared/static/js/form_label.js',
'./gl_modules/shared/static/js/site_intro.js',
		'./gl_modules/map/static/src/js/map_loader.js',

	],
	output : {
		path     : path.resolve ( __dirname, dist  ),
		filename : "sign_up.js"
	},
	watch  : true
} );
var sign_in = Object.assign ( {}, config, {

	entry  : [



		'./gl_modules/shared/static/js/feel_meter.js',
		'./gl_modules/shared/static/js/form_label.js',
		'./gl_modules/shared/static/js/site_intro.js',

	],
	output : {
		path     : path.resolve ( __dirname, dist  ),
		filename : "sign_in.js"
	},
	watch  : true
} );




// Return Array of Configurations
module.exports = [

	landing, user,  sign_in, sign_up, country,public_user,admin

];