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
		'./static/src/js/index.js',

	],
	output : {
		path     : path.resolve ( __dirname, 'static/dist/js' ),
		filename : "index.js"
	},
	watch  : true
} );
var user = Object.assign ( {}, config, {
	
	entry  : [
		'./static/src/js/user.js',
	],
	output : {
		path     : path.resolve ( __dirname, 'static/dist/js' ),
		filename : "user.js"
	},
	watch  : true
} );

var admin = Object.assign ( {}, config, {
	
	entry  : [
		'./static/src/js/user.js',
	
	],
	output : {
		path     : path.resolve ( __dirname, 'static/dist/js' ),
		filename : "admin.js"
	},
	watch  : true
} );

var sign_up = Object.assign ( {}, config, {

	entry  : [
		'./static/src/js/sign_up/get_location.js',
		'./static/src/js/shared/feelometer.js',

	],
	output : {
		path     : path.resolve ( __dirname, 'static/dist/js' ),
		filename : "sign_up.js"
	},
	watch  : true
} );




// Return Array of Configurations
module.exports = [
	index, user, admin, sign_up

];