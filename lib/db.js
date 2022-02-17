var mysql = require('mysql2');
var CREDENTIALS = require('../credentials/credentials.json');

var connection;	// exported connection object

// configure correct DB based on global env variable
switch (MYSQL_ENVIRONMENT)
{
		case TEST_ENVIRONMENT:

				connection = mysql.createConnection({
					host: CREDENTIALS.MYSQL_REMOTE_URL_TEST,
					user: CREDENTIALS.MYSQL_REMOTE_USER_TEST,
					password:CREDENTIALS.MYSQL_REMOTE_PASSWORD_TEST,
					database:'assassin',
					multipleStatements:true
				});

				break;

		case PRODUCTION_ENVIRONMENT:

				connection = mysql.createConnection({
					host: CREDENTIALS.MYSQL_REMOTE_URL_PROD,
					user: CREDENTIALS.MYSQL_REMOTE_USER_PROD,
					password:CREDENTIALS.MYSQL_REMOTE_PASSWORD_PROD,
					database:'assassin',
					multipleStatements:true
				});

				break;

		case LOCAL_ENVIRONMENT:

				connection = mysql.createConnection({
					host:CREDENTIALS.MYSQL_LOCALHOST_URL,
					user:CREDENTIALS.MYSQL_LOCALHOST_USER,
					password:CREDENTIALS.MYSQL_LOCALHOST_PASSWORD,
					database:'assassin',
					multipleStatements:true
				});

				break;

		default:

}

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;
