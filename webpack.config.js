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

var index = Object.assign ( {}, config, {
	
	entry  : [

		'./blueprint/index/static/src/js/feelist.js',
		'./blueprint/shared/static/js/feelometer.js',
		'./blueprint/shared/static/js/form.js',

	],
	output : {
		path     : path.resolve ( __dirname, 'blueprint/landing/static/dist/js' ),
		filename : "landing.js"
	},
	watch  : true
} );
var user = Object.assign ( {}, config, {
	
	entry  : [
		'./blueprint/user/static/src/js/user.js',
	],
	output : {
		path     : path.resolve ( __dirname, 'blueprint/user/static/dist/js' ),
		filename : "user.js"
	},
	watch  : true
} );

// var admin = Object.assign ( {}, config, {
//
// 	entry  : [
// 		'./static_old/src/js/user.js',
//
// 	],
// 	output : {
// 		path     : path.resolve ( __dirname, 'static_old/dist/js' ),
// 		filename : "admin.js"
// 	},
// 	watch  : true
// } );

var sign_up = Object.assign ( {}, config, {

	entry  : [


		'./blueprint/auth/static/src/js/get_location.js',
		'./blueprint/shared/static/js/feelometer.js',
		'./blueprint/shared/static/js/form.js',

	],
	output : {
		path     : path.resolve ( __dirname, 'blueprint/auth/static/dist/js'  ),
		filename : "sign_up.js"
	},
	watch  : true
} );
var sign_in = Object.assign ( {}, config, {

	entry  : [



		'./blueprint/shared/static/js/feelometer.js',
		'./blueprint/shared/static/js/form.js',

	],
	output : {
		path     : path.resolve ( __dirname, 'blueprint/auth/static/dist/js'  ),
		filename : "sign_in.js"
	},
	watch  : true
} );




// Return Array of Configurations
module.exports = [

	index, user,  sign_in, sign_up

];