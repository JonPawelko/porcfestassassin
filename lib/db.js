var mysql = require('mysql2');
var CREDENTIALS = require('../gitignore/credentials.json');

var connection = mysql.createConnection({
	host: CREDENTIALS.MYSQL_REMOTE_URL,
	user: CREDENTIALS.MYSQL_REMOTE_USER,
	password:CREDENTIALS.MYSQL_REMOTE_PASSWORD,
	database:'assassin-demo1',
	multipleStatements:true
});

// var connection = mysql.createConnection({
// 	host:'localhost',
// 	user:CREDENTIALS.MYSQL_LOCALHOST_USER,
// 	password:CREDENTIALS.MYSQL_LOCALHOST_PASSWORD,
// 	database:'assassin-demo1',
// 	multipleStatements:true
// });

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;
